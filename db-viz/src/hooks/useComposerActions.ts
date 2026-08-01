'use client';

/**
 * useComposerActions — Action Executor Hook
 *
 * Translates ComposerAction[] into concrete mutations on:
 *   1. PostgreSQL (via /api endpoints)
 *   2. Firebase (Firestore docs for tables/databases)
 *   3. React Flow canvas (nodes/edges are rebuilt reactively via onSnapshot)
 *
 * It re-uses the same API surface the dashboard already uses
 * (authFetch → /api/database/create, /api/table/create, /api/query/execute).
 */

import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, deleteDoc, updateDoc, Timestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { authFetch } from '@/lib/api-client';
import type { ComposerAction, ColumnDef } from '@/types/composer';
import type { Column, DataType } from '@/types/database';

// ─── Params passed from the Dashboard ──────────────────────────────────────
export interface UseComposerActionsParams {
  userId: string | undefined;
  databases: Array<{ id: string; name: string }>;
  tables: Array<{ id: string; name: string; databaseId: string; columns: Column[] }>;
  selectedDatabaseId: string | null;
  setSelectedDatabaseId: (id: string | null) => void;
  addLog: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;
}

export interface ActionResult {
  success: boolean;
  summary: string;
  actionResults: Array<{ action: string; success: boolean; detail: string }>;
}

// ─── Identifier Sanitizer ─────────────────────────────────────────────
// Normalizes database/table/column names to valid PostgreSQL identifiers (lowercase, alphanumeric + underscore)
function sanitizeIdentifier(name: string): string {
  if (!name) return 'unnamed';
  let cleaned = name.toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_').replace(/^_+|_+$/g, '');
  if (!cleaned || /^[0-9]/.test(cleaned)) {
    cleaned = 'db_' + cleaned;
  }
  return cleaned;
}

// ─── Convert ColumnDef (from AI) → Column (app type) ──────────────────────
function columnDefToColumn(colDef: ColumnDef, tables: Array<{ id: string; name: string; columns: Column[] }>): Column {
  const sanitizedColName = sanitizeIdentifier(colDef.name);

  // Resolve FK references by name → id
  let foreignKeyReference: Column['foreignKeyReference'] | undefined;
  if (colDef.isForeign && colDef.references) {
    const refTableName = sanitizeIdentifier(colDef.references.table);
    const refColName = sanitizeIdentifier(colDef.references.column);
    const refTable = tables.find(t => sanitizeIdentifier(t.name) === refTableName);
    if (refTable) {
      const refCol = refTable.columns.find(c => sanitizeIdentifier(c.name) === refColName);
      if (refCol) {
        foreignKeyReference = { tableId: refTable.id, columnId: refCol.id };
      }
    }
  }

  return {
    id: uuidv4(),
    name: sanitizedColName,
    dataType: (colDef.type?.toUpperCase().replace(/\(.*\)/, '').trim() || 'VARCHAR') as DataType,
    isPrimaryKey: !!colDef.isPrimary,
    isForeignKey: !!colDef.isForeign,
    foreignKeyReference,
    isNotNull: !!colDef.isNotNull || !!colDef.isPrimary,
    isUnique: !!colDef.isUnique,
    isAutoIncrement: !!colDef.isPrimary, // auto-increment PKs by default
    defaultValue: colDef.defaultValue,
  };
}

// ─── Build the PG column definition for the /api/table/create body ────────
function columnDefToPgColumn(
  colDef: ColumnDef,
  tables: Array<{ id: string; name: string; columns: Column[] }>
): Record<string, unknown> {
  const sanitizedColName = sanitizeIdentifier(colDef.name);
  const pgCol: Record<string, unknown> = {
    name: sanitizedColName,
    dataType: colDef.type?.toUpperCase() || 'VARCHAR',
    isPrimaryKey: !!colDef.isPrimary,
    isNotNull: !!colDef.isNotNull || !!colDef.isPrimary,
    isUnique: !!colDef.isUnique,
    isAutoIncrement: !!colDef.isPrimary,
    defaultValue: colDef.defaultValue,
    isForeignKey: !!colDef.isForeign,
  };

  if (colDef.isForeign && colDef.references) {
    pgCol.foreignKeyReference = {
      tableName: sanitizeIdentifier(colDef.references.table),
      columnName: sanitizeIdentifier(colDef.references.column),
    };
  }

  return pgCol;
}

// ─── Grid position calculator ─────────────────────────────────────────────
function calcPosition(existingCount: number, index: number): { x: number; y: number } {
  const COLS = 4;
  const TABLE_W = 300;
  const SPACING = 50;
  const ROW_H = 350;
  const i = existingCount + index;
  return {
    x: 100 + (i % COLS) * (TABLE_W + SPACING),
    y: 100 + Math.floor(i / COLS) * ROW_H,
  };
}

// ─── Hook ──────────────────────────────────────────────────────────────────
export function useComposerActions(params: UseComposerActionsParams) {
  const { userId, databases, tables, selectedDatabaseId, setSelectedDatabaseId, addLog } = params;

  const executeActions = useCallback(
    async (actions: ComposerAction[]): Promise<ActionResult> => {
      if (!userId) return { success: false, summary: 'Not authenticated.', actionResults: [] };

      const results: ActionResult['actionResults'] = [];
      let anyFailure = false;

      for (const action of actions) {
        try {
          switch (action.type) {
            // ────────── CREATE_DATABASE ──────────────────────────────
            case 'CREATE_DATABASE': {
              const sanitizedDbName = sanitizeIdentifier(action.databaseName);
              let dbId: string;

              // Check if database already exists in Firebase
              const existingDb = databases.find(d => sanitizeIdentifier(d.name) === sanitizedDbName);
              if (existingDb) {
                dbId = existingDb.id;
                setSelectedDatabaseId(dbId);
                addLog('info', `Using existing database '${sanitizedDbName}'`);
              } else {
                // 1. Create PG schema
                const pgRes = await authFetch('/api/database/create', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name: sanitizedDbName }),
                });
                const pgResult = await pgRes.json();

                if (!pgResult.success && !pgResult.error?.toLowerCase().includes('already exists')) {
                  results.push({ action: `CREATE_DATABASE ${sanitizedDbName}`, success: false, detail: pgResult.error });
                  anyFailure = true;
                  addLog('error', `DB creation failed: ${pgResult.error}`);
                  break;
                }

                // 2. Save to Firebase
                dbId = uuidv4();
                await setDoc(doc(db, 'databases', dbId), {
                  name: sanitizedDbName,
                  userId,
                  db_password_hash: '',
                  createdAt: Timestamp.now(),
                  updatedAt: Timestamp.now(),
                });

                addLog('success', `Database '${sanitizedDbName}' created`);
                setSelectedDatabaseId(dbId);
              }

              // 3. Create each table in this database
              const createdTables: Array<{ id: string; name: string; databaseId: string; columns: Column[] }> = [];

              // Sort tables: non-FK tables first, FK tables later
              const sortedTables = [...(action.tables || [])].sort((a, b) => {
                const aHasFK = a.columns.some(c => c.isForeign);
                const bHasFK = b.columns.some(c => c.isForeign);
                if (aHasFK && !bHasFK) return 1;
                if (!aHasFK && bHasFK) return -1;
                return 0;
              });

              for (let i = 0; i < sortedTables.length; i++) {
                const tableDef = sortedTables[i];
                const sanitizedTableName = sanitizeIdentifier(tableDef.name);

                try {
                  const allTables = [...tables, ...createdTables];
                  const pgCols = tableDef.columns.map(c => columnDefToPgColumn(c, allTables));

                  const tblRes = await authFetch('/api/table/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      database: sanitizedDbName,
                      tableName: sanitizedTableName,
                      columns: pgCols,
                    }),
                  });
                  const tblResult = await tblRes.json();

                  if (!tblResult.success && !tblResult.error?.toLowerCase().includes('already exists')) {
                    results.push({ action: `ADD_TABLE ${sanitizedTableName}`, success: false, detail: tblResult.error });
                    anyFailure = true;
                    addLog('warning', `Table '${sanitizedTableName}': ${tblResult.error}`);
                    continue;
                  }

                  // Save to Firebase
                  const tableId = uuidv4();
                  const columns = tableDef.columns.map(c => columnDefToColumn(c, [...tables, ...createdTables]));
                  const position = calcPosition(tables.length + createdTables.length, 0);

                  await setDoc(doc(db, 'tables', tableId), {
                    name: sanitizedTableName,
                    databaseId: dbId,
                    columns,
                    position,
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now(),
                  });

                  createdTables.push({ id: tableId, name: sanitizedTableName, databaseId: dbId, columns });
                  results.push({ action: `ADD_TABLE ${sanitizedTableName}`, success: true, detail: `${columns.length} columns` });
                  addLog('success', `Table '${sanitizedTableName}' created (${columns.length} cols)`);
                } catch (err: any) {
                  results.push({ action: `ADD_TABLE ${sanitizedTableName}`, success: false, detail: err.message });
                  anyFailure = true;
                }
              }

              results.push({ action: `CREATE_DATABASE ${sanitizedDbName}`, success: true, detail: `${sortedTables.length} tables` });
              break;
            }

            // ────────── ADD_TABLE ────────────────────────────────────
            case 'ADD_TABLE': {
              const sanitizedTableName = sanitizeIdentifier(action.tableName);
              let targetDbId = selectedDatabaseId;
              let targetDb = databases.find(d => d.id === targetDbId);

              // Auto-fallback: if no database selected, pick first or create default
              if (!targetDbId || !targetDb) {
                if (databases.length > 0) {
                  targetDb = databases[0];
                  targetDbId = targetDb.id;
                  setSelectedDatabaseId(targetDbId);
                } else {
                  const defaultDbName = 'my_database';
                  const pgRes = await authFetch('/api/database/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: defaultDbName }),
                  });
                  const newDbId = uuidv4();
                  await setDoc(doc(db, 'databases', newDbId), {
                    name: defaultDbName,
                    userId,
                    db_password_hash: '',
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now(),
                  });
                  targetDbId = newDbId;
                  targetDb = { id: newDbId, name: defaultDbName };
                  setSelectedDatabaseId(targetDbId);
                  addLog('info', `Created database '${defaultDbName}'`);
                }
              }

              const pgCols = action.columns.map(c => columnDefToPgColumn(c, tables));

              const tblRes = await authFetch('/api/table/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  database: sanitizeIdentifier(targetDb.name),
                  tableName: sanitizedTableName,
                  columns: pgCols,
                }),
              });
              const tblResult = await tblRes.json();

              if (!tblResult.success && !tblResult.error?.toLowerCase().includes('already exists')) {
                results.push({ action: `ADD_TABLE ${sanitizedTableName}`, success: false, detail: tblResult.error });
                anyFailure = true;
                addLog('error', `Table creation failed: ${tblResult.error}`);
                break;
              }

              const tableId = uuidv4();
              const columns = action.columns.map(c => columnDefToColumn(c, tables));
              const existingInDb = tables.filter(t => t.databaseId === targetDbId).length;
              const position = calcPosition(existingInDb, 0);

              await setDoc(doc(db, 'tables', tableId), {
                name: sanitizedTableName,
                databaseId: targetDbId,
                columns,
                position,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
              });

              results.push({ action: `ADD_TABLE ${sanitizedTableName}`, success: true, detail: `${columns.length} columns` });
              addLog('success', `Table '${sanitizedTableName}' created (${columns.length} cols)`);
              break;
            }

            // ────────── ADD_COLUMN ──────────────────────────────────
            case 'ADD_COLUMN': {
              const table = tables.find(t => t.name.toLowerCase() === action.tableName.toLowerCase());
              if (!table) {
                results.push({ action: `ADD_COLUMN to ${action.tableName}`, success: false, detail: 'Table not found on canvas' });
                anyFailure = true;
                break;
              }

              const dbForTable = databases.find(d => d.id === table.databaseId);
              if (!dbForTable) {
                results.push({ action: `ADD_COLUMN to ${action.tableName}`, success: false, detail: 'Database not found' });
                anyFailure = true;
                break;
              }

              // ALTER TABLE in PG
              let colType = action.column.type?.toUpperCase() || 'VARCHAR';
              if (colType === 'VARCHAR' && action.column.length) {
                colType = `VARCHAR(${action.column.length})`;
              }

              const alterSQL = `ALTER TABLE "${action.tableName.toLowerCase()}" ADD COLUMN "${action.column.name}" ${colType}${action.column.isNotNull ? ' NOT NULL' : ''}${action.column.defaultValue ? ` DEFAULT '${action.column.defaultValue}'` : ''}`;

              const alterRes = await authFetch('/api/query/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ database: dbForTable.name, query: alterSQL }),
              });
              const alterResult = await alterRes.json();

              if (!alterResult.success) {
                results.push({ action: `ADD_COLUMN ${action.column.name}`, success: false, detail: alterResult.error });
                anyFailure = true;
                break;
              }

              // Update Firebase table doc
              const newCol = columnDefToColumn(action.column, tables);
              const updatedColumns = [...table.columns, newCol];
              await updateDoc(doc(db, 'tables', table.id), {
                columns: updatedColumns,
                updatedAt: Timestamp.now(),
              });

              results.push({ action: `ADD_COLUMN ${action.column.name} to ${action.tableName}`, success: true, detail: colType });
              addLog('success', `Column '${action.column.name}' added to '${action.tableName}'`);
              break;
            }

            // ────────── ADD_RELATIONSHIP ────────────────────────────
            case 'ADD_RELATIONSHIP': {
              // This is handled implicitly by FK columns — edges are rebuilt from column data.
              // If the FK column doesn't exist yet, we add it.
              const fromTable = tables.find(t => t.name.toLowerCase() === action.fromTable.toLowerCase());
              const toTable = tables.find(t => t.name.toLowerCase() === action.toTable.toLowerCase());

              if (!fromTable || !toTable) {
                results.push({ action: `ADD_RELATIONSHIP`, success: false, detail: `Table not found: ${!fromTable ? action.fromTable : action.toTable}` });
                anyFailure = true;
                break;
              }

              // Check if fromColumn already exists
              const existingCol = fromTable.columns.find(c => c.name.toLowerCase() === action.fromColumn.toLowerCase());
              if (existingCol) {
                // Update to mark as FK
                const updatedCols = fromTable.columns.map(c => {
                  if (c.id === existingCol.id) {
                    const targetCol = toTable.columns.find(tc => tc.name.toLowerCase() === action.toColumn.toLowerCase());
                    return {
                      ...c,
                      isForeignKey: true,
                      foreignKeyReference: targetCol ? { tableId: toTable.id, columnId: targetCol.id } : undefined,
                    };
                  }
                  return c;
                });
                await updateDoc(doc(db, 'tables', fromTable.id), { columns: updatedCols, updatedAt: Timestamp.now() });
              }

              results.push({ action: `ADD_RELATIONSHIP ${action.fromTable}.${action.fromColumn} → ${action.toTable}.${action.toColumn}`, success: true, detail: 'FK link created' });
              addLog('info', `FK: ${action.fromTable}.${action.fromColumn} → ${action.toTable}.${action.toColumn}`);
              break;
            }

            // ────────── DELETE_TABLE ─────────────────────────────────
            case 'DELETE_TABLE': {
              const table = tables.find(t => t.name.toLowerCase() === action.tableName.toLowerCase());
              if (!table) {
                results.push({ action: `DELETE_TABLE ${action.tableName}`, success: false, detail: 'Table not found' });
                anyFailure = true;
                break;
              }

              const dbForTable = databases.find(d => d.id === table.databaseId);
              if (dbForTable) {
                await authFetch('/api/query/execute', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ database: dbForTable.name, query: `DROP TABLE IF EXISTS "${action.tableName.toLowerCase()}"` }),
                });
              }

              await deleteDoc(doc(db, 'tables', table.id));
              results.push({ action: `DELETE_TABLE ${action.tableName}`, success: true, detail: 'Dropped' });
              addLog('success', `Table '${action.tableName}' dropped`);
              break;
            }

            // ────────── RENAME_TABLE ─────────────────────────────────
            case 'RENAME_TABLE': {
              const table = tables.find(t => t.name.toLowerCase() === action.oldName.toLowerCase());
              if (!table) {
                results.push({ action: `RENAME_TABLE`, success: false, detail: `Table '${action.oldName}' not found` });
                anyFailure = true;
                break;
              }

              const dbForTable = databases.find(d => d.id === table.databaseId);
              if (dbForTable) {
                await authFetch('/api/query/execute', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ database: dbForTable.name, query: `ALTER TABLE "${action.oldName.toLowerCase()}" RENAME TO "${action.newName.toLowerCase()}"` }),
                });
              }

              await updateDoc(doc(db, 'tables', table.id), { name: action.newName.toLowerCase(), updatedAt: Timestamp.now() });
              results.push({ action: `RENAME_TABLE ${action.oldName} → ${action.newName}`, success: true, detail: 'Renamed' });
              addLog('success', `Table renamed: '${action.oldName}' → '${action.newName}'`);
              break;
            }

            // ────────── EXPLAIN ──────────────────────────────────────
            case 'EXPLAIN': {
              results.push({ action: 'EXPLAIN', success: true, detail: action.message });
              break;
            }
          }
        } catch (err: any) {
          results.push({ action: action.type, success: false, detail: err.message || 'Unknown error' });
          anyFailure = true;
          addLog('error', `Action ${action.type} failed: ${err.message}`);
        }
      }

      const successCount = results.filter(r => r.success).length;
      return {
        success: !anyFailure,
        summary: `${successCount}/${results.length} actions completed successfully.`,
        actionResults: results,
      };
    },
    [userId, databases, tables, selectedDatabaseId, setSelectedDatabaseId, addLog]
  );

  return { executeActions };
}
