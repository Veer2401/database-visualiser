import { NextRequest, NextResponse } from 'next/server';
import { executeQueryInDatabase, getPrefixedDatabaseName } from '@/lib/postgresql';

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
  userId?: string;
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
  try {
    const body: CreateTableRequest = await request.json();
    let { database, tableName, columns, userId } = body;

    // Validate request
    if (!database || typeof database !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Schema name is required',
      }, { status: 400 });
    }

    // Auto-prefix database name if userId is provided
    if (userId && typeof userId === 'string') {
      database = getPrefixedDatabaseName(database.trim(), userId);
    } else {
      database = database.trim();
    }

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

    // Build CREATE TABLE query
    const columnDefinitions: string[] = [];
    const foreignKeys: string[] = [];
    const primaryKeys: string[] = [];
    
    // Normalize table name to lowercase for PostgreSQL consistency
    const tableNameLower = tableName.trim().toLowerCase();

    for (const column of columns) {
      let dataType = column.dataType.toUpperCase();
      
      // Convert column definitions to PostgreSQL types
      if (dataType === 'INT' && column.isAutoIncrement) {
        dataType = 'SERIAL';
      }
      
      let definition = `"${column.name}" ${dataType}`;

      // Add length for VARCHAR only (PostgreSQL supports VARCHAR without length)
      if (dataType.includes('VARCHAR') && !dataType.includes('(')) {
        definition += '(255)';
      }

      // Add constraints (skip NOT NULL for SERIAL columns as they're implicitly NOT NULL)
      if (column.isNotNull && dataType !== 'SERIAL') {
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
          dataType.includes('INT') ||
          dataType.includes('FLOAT') ||
          dataType.includes('DOUBLE') ||
          dataType.includes('DECIMAL') ||
          dataType.includes('NUMERIC')
        ) {
          definition += ` DEFAULT ${column.defaultValue}`;
        } else {
          definition += ` DEFAULT '${column.defaultValue}'`;
        }
      }

      columnDefinitions.push(definition);

      // Track primary keys
      if (column.isPrimaryKey) {
        primaryKeys.push(`"${column.name}"`);
      }

      // Track foreign keys - normalize table name to lowercase
      if (column.isForeignKey && column.foreignKeyReference) {
        const refTableName = column.foreignKeyReference.tableName.toLowerCase();
        foreignKeys.push(
          `FOREIGN KEY ("${column.name}") REFERENCES "${refTableName}"("${column.foreignKeyReference.columnName}")`
        );
      }
    }

    // Add primary key constraint
    if (primaryKeys.length > 0) {
      columnDefinitions.push(`PRIMARY KEY (${primaryKeys.join(', ')})`);
    }

    // Add foreign key constraints
    foreignKeys.forEach((fk) => {
      columnDefinitions.push(fk);
    });

    // Table is created in the specified schema (search_path is set by executeQueryInDatabase)
    // Use lowercase table name for consistency
    const query = `CREATE TABLE "${tableNameLower}" (\n  ${columnDefinitions.join(',\n  ')}\n)`;

    const result = await executeQueryInDatabase(database.trim(), query);

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
