import { NextRequest, NextResponse } from 'next/server';
import { executeQueryInDatabase, getPrefixedDatabaseName } from '@/lib/postgresql';
import { verifyAuth } from '@/lib/auth-helper';

interface Column {
  name: string;
  dataType: string;
  isPrimaryKey?: boolean;
  isNotNull?: boolean;
  isUnique?: boolean;
  isAutoIncrement?: boolean;
  defaultValue?: string;
  isForeignKey?: boolean;
  foreignKeyReference?: {
    tableId: string;
    columnId: string;
    // Resolved names for SQL generation (from frontend lookup)
    tableName: string;
    columnName: string;
  };
}

interface CreateTableRequest {
  database: string;
  tableName: string;
  columns: Column[];
}

/**
 * POST /api/table/create
 * 
 * Create a new table in a PostgreSQL schema.
 * Called when user creates a table from the UI.
 * 
 * Request body:
 * {
 *   "database": "schema_name",
 *   "tableName": "table_name",
 *   "columns": [
 *     {
 *       "name": "column_name",
 *       "dataType": "INT",
 *       "isPrimaryKey": true,
 *       "isNotNull": true,
 *       ...
 *     }
 *   ]
 * }
 * 
 * Response:
 * {
 *   "success": boolean,
 *   "message": string,
 *   "error"?: string
 * }
 */
export async function POST(request: NextRequest) {
  const authResult = await verifyAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const userId = authResult;

  try {
    const body: CreateTableRequest = await request.json();
    let { database, tableName, columns } = body;

    // Validate request
    if (!database || typeof database !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Schema name is required',
      }, { status: 400 });
    }

    // Always prefix the database name with the user's namespace
    database = getPrefixedDatabaseName(database.trim(), userId);

    if (!tableName || typeof tableName !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Table name is required',
      }, { status: 400 });
    }

    if (!columns || !Array.isArray(columns) || columns.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'At least one column is required',
      }, { status: 400 });
    }

function normalizePostgresDataType(rawType: string, isAutoIncrement?: boolean): string {
  let type = (rawType || 'VARCHAR').toUpperCase().replace(/\(.*\)/, '').trim();

  if (isAutoIncrement && (type === 'INT' || type === 'INTEGER' || type === 'BIGINT' || type === 'SMALLINT')) {
    if (type === 'BIGINT') return 'BIGSERIAL';
    if (type === 'SMALLINT') return 'SMALLSERIAL';
    return 'SERIAL';
  }

  if (type === 'DATETIME') return 'TIMESTAMP';
  if (type === 'TINYINT') return 'SMALLINT';
  if (type === 'DOUBLE') return 'DOUBLE PRECISION';
  if (type === 'FLOAT') return 'REAL';
  if (type === 'LONGTEXT' || type === 'MEDIUMTEXT' || type === 'TINYTEXT') return 'TEXT';
  if (type === 'BLOB' || type === 'LONGBLOB' || type === 'MEDIUMBLOB') return 'BYTEA';
  if (type === 'ENUM' || type === 'SET') return 'VARCHAR(255)';
  if (type === 'YEAR') return 'INT';
  if (type === 'INT' || type === 'INTEGER') return 'INT';
  if (type === 'DECIMAL' || type === 'NUMERIC') return 'DECIMAL(10,2)';
  if (type === 'VARCHAR') return 'VARCHAR(255)';
  if (type === 'CHAR') return 'CHAR(1)';

  return type;
}

    // Build CREATE TABLE query
    const columnDefinitions: string[] = [];
    const columnDefinitionsNoFK: string[] = [];
    const foreignKeys: string[] = [];
    const primaryKeys: string[] = [];
    
    // Normalize table name to lowercase for PostgreSQL consistency
    const tableNameLower = tableName.trim().toLowerCase();

    for (const column of columns) {
      const pgType = normalizePostgresDataType(column.dataType, column.isAutoIncrement);
      let definition = `"${column.name}" ${pgType}`;

      // Add constraints (skip NOT NULL for SERIAL columns as they're implicitly NOT NULL)
      if (column.isNotNull && !pgType.includes('SERIAL')) {
        definition += ' NOT NULL';
      }

      if (column.isUnique && !column.isPrimaryKey) {
        definition += ' UNIQUE';
      }

      if (column.defaultValue !== undefined && column.defaultValue !== '') {
        // Handle special default values
        if (column.defaultValue.toUpperCase() === 'NULL') {
          definition += ' DEFAULT NULL';
        } else if (column.defaultValue.toUpperCase() === 'CURRENT_TIMESTAMP') {
          definition += ' DEFAULT CURRENT_TIMESTAMP';
        } else if (
          pgType.includes('INT') ||
          pgType.includes('FLOAT') ||
          pgType.includes('DOUBLE') ||
          pgType.includes('DECIMAL') ||
          pgType.includes('REAL') ||
          pgType.includes('SERIAL')
        ) {
          definition += ` DEFAULT ${column.defaultValue}`;
        } else {
          definition += ` DEFAULT '${column.defaultValue}'`;
        }
      }

      columnDefinitions.push(definition);
      columnDefinitionsNoFK.push(definition);

      // Track primary keys
      if (column.isPrimaryKey) {
        primaryKeys.push(`"${column.name}"`);
      }

      // Track foreign keys - normalize table name to lowercase
      if (column.isForeignKey && column.foreignKeyReference) {
        const refTableName = (column.foreignKeyReference.tableName || '').toLowerCase();
        const refColName = (column.foreignKeyReference.columnName || 'id').toLowerCase();
        if (refTableName && refColName) {
          foreignKeys.push(
            `FOREIGN KEY ("${column.name}") REFERENCES "${refTableName}"("${refColName}")`
          );
        }
      }
    }

    // Add primary key constraint
    if (primaryKeys.length > 0) {
      columnDefinitions.push(`PRIMARY KEY (${primaryKeys.join(', ')})`);
      columnDefinitionsNoFK.push(`PRIMARY KEY (${primaryKeys.join(', ')})`);
    }

    // Add foreign key constraints
    foreignKeys.forEach((fk) => {
      columnDefinitions.push(fk);
    });

    // Table is created in the specified schema (search_path is set by executeQueryInDatabase)
    // Use lowercase table name for consistency
    const query = `CREATE TABLE "${tableNameLower}" (\n  ${columnDefinitions.join(',\n  ')}\n)`;

    let result = await executeQueryInDatabase(database.trim(), query);

    // If query failed due to FK dependency ordering or missing referenced table, attempt without FKs
    if (!result.success && foreignKeys.length > 0) {
      const fallbackQuery = `CREATE TABLE "${tableNameLower}" (\n  ${columnDefinitionsNoFK.join(',\n  ')}\n)`;
      result = await executeQueryInDatabase(database.trim(), fallbackQuery);
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Table '${tableNameLower}' created successfully in schema '${database}'`,
        table: tableNameLower,
      });
    } else {
      // Handle specific PostgreSQL errors
      let errorMessage = result.error || 'Failed to create table';

      if (result.code === 'DUPLICATE_TABLE') {
        errorMessage = `Table '${tableName}' already exists`;
      } else if (result.code === 'INVALID_SCHEMA_NAME') {
        errorMessage = `Schema '${database}' does not exist`;
      }

      return NextResponse.json({
        success: false,
        error: errorMessage,
        code: result.code,
      }, { status: 400 });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 });
  }
}
