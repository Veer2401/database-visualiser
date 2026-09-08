import { Table, Column } from '@/types/database';

/**
 * Resolve foreign key reference names from tables array (3NF compliant)
 * Instead of storing tableName and columnName, derive them from IDs
 */
export function resolveFKNames(
  fkRef: { tableId: string; columnId: string } | undefined,
  tables: Table[]
) {
  if (!fkRef) return null;

  const table = tables.find((t) => t.id === fkRef.tableId);
  const column = table?.columns.find((c) => c.id === fkRef.columnId);

  if (!table || !column) return null;

  return {
    tableName: table.name,
    columnName: column.name,
    table,
    column,
  };
}

/**
 * Get display text for a foreign key reference (e.g., "users.user_id")
 */
export function formatFKDisplay(
  fkRef: { tableId: string; columnId: string } | undefined,
  tables: Table[]
): string {
  const resolved = resolveFKNames(fkRef, tables);
  if (!resolved) return 'Unknown';
  return `${resolved.tableName}.${resolved.columnName}`;
}

/**
 * Get table name from FK reference
 */
export function getFKTableName(
  fkRef: { tableId: string; columnId: string } | undefined,
  tables: Table[]
): string | null {
  const resolved = resolveFKNames(fkRef, tables);
  return resolved?.tableName || null;
}

/**
 * Get column name from FK reference
 */
export function getFKColumnName(
  fkRef: { tableId: string; columnId: string } | undefined,
  tables: Table[]
): string | null {
  const resolved = resolveFKNames(fkRef, tables);
  return resolved?.columnName || null;
}
