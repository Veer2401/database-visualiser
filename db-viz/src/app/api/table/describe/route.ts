import { NextRequest, NextResponse } from 'next/server';
import { executeQueryInDatabase, getPrefixedDatabaseName } from '@/lib/postgresql';
import { setNoCacheHeaders } from '@/lib/cache-headers';
import { verifyAuth } from '@/lib/auth-helper';

interface DescribeTableRequest {
  database: string;
  table: string;
}

/**
 * POST /api/table/describe
 * 
 * Get the structure of a table from PostgreSQL.
 * Returns column information including name, type, nullable, and default values.
 * 
 * Request body:
 * {
 *   "database": "schema_name",
 *   "table": "table_name"
 * }
 * 
 * Response:
 * {
 *   "success": boolean,
 *   "columns": [...],
 *   "error"?: string
 * }
 */
export async function POST(request: NextRequest) {
  const authResult = await verifyAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const userId = authResult;

  try {
    const body: DescribeTableRequest = await request.json();
    let { database, table } = body;

    // Validate request
    if (!database || typeof database !== 'string') {
      const response = NextResponse.json({
        success: false,
        error: 'Schema name is required',
      }, { status: 400 });
      return setNoCacheHeaders(response);
    }

    if (!table || typeof table !== 'string') {
      const response = NextResponse.json({
        success: false,
        error: 'Table name is required',
      }, { status: 400 });
      return setNoCacheHeaders(response);
    }

    // Always prefix the database with the user's namespace
    database = getPrefixedDatabaseName(database, userId);

    // SQL Injection prevention: validate table name is a safe identifier
    // (only letters, numbers, underscores — no quotes, dashes, semicolons, etc.)
    const tableLower = table.trim().toLowerCase();
    if (!/^[a-zA-Z0-9_]+$/.test(tableLower)) {
      const response = NextResponse.json({
        success: false,
        error: 'Invalid table name',
      }, { status: 400 });
      return setNoCacheHeaders(response);
    }

    console.log(`[Table Describe] Database: "${database}", Table: "${tableLower}"`);

    // Query PostgreSQL information_schema to get table structure from the specified schema
    // tableLower has been validated to contain only safe identifier characters above
    const result = await executeQueryInDatabase(database, `
      SELECT 
        c.column_name as "Field",
        c.data_type as "Type",
        CASE WHEN c.is_nullable = 'YES' THEN 'YES' ELSE 'NO' END as "Null",
        c.column_default as "Default",
        CASE 
          WHEN pk.column_name IS NOT NULL THEN 'PRI'
          ELSE ''
        END as "Key",
        CASE WHEN c.is_identity = 'YES' THEN 'auto_increment' ELSE '' END as "Extra"
      FROM information_schema.columns c
      LEFT JOIN (
        SELECT kcu.column_name
        FROM information_schema.key_column_usage kcu
        JOIN information_schema.table_constraints tc 
          ON kcu.constraint_name = tc.constraint_name
          AND kcu.table_schema = tc.table_schema
          AND kcu.table_name = tc.table_name
        WHERE tc.constraint_type = 'PRIMARY KEY'
          AND kcu.table_schema = current_schema()
          AND kcu.table_name = '${tableLower}'
      ) pk ON c.column_name = pk.column_name
      WHERE c.table_schema = current_schema()
        AND c.table_name = '${tableLower}'
      ORDER BY c.ordinal_position
    `);

    if (result.success) {
      const response = NextResponse.json({
        success: true,
        columns: result.results,
      });
      return setNoCacheHeaders(response);
    } else {
      console.error(`[Table Describe] Error: ${result.error} (Schema: ${database}, Table: ${table})`);
      const response = NextResponse.json({
        success: false,
        error: result.error,
        code: result.code,
      }, { status: 400 });
      return setNoCacheHeaders(response);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const response = NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status: 500 });
    return setNoCacheHeaders(response);
  }
}
