import { NextRequest, NextResponse } from 'next/server';
import {
  executeQuery,
  executeQueryInDatabase,
  formatResultsForTerminal,
  formatErrorForTerminal,
  getPrefixedDatabaseName,
} from '@/lib/postgresql';
import { setNoCacheHeaders } from '@/lib/cache-headers';
import { verifyAuth } from '@/lib/auth-helper';

// System schemas that must never be user-prefixed
const SYSTEM_SCHEMAS = new Set(['information_schema', 'pg_catalog', 'public', 'db_viz_system']);

interface ExecuteQueryRequest {
  database?: string;
  query: string;
}

/**
 * POST /api/query/execute
 * 
 * Execute SQL queries from the frontend terminal.
 * Supports all SQL operations: CREATE, SELECT, INSERT, UPDATE, DELETE, etc.
 * 
 * Request body:
 * {
 *   "database": "optional_schema_name",
 *   "query": "SQL QUERY STRING"
 * }
 * 
 * Response:
 * {
 *   "success": boolean,
 *   "results": any,
 *   "formattedOutput": string[],
 *   "error"?: string
 * }
 */
export async function POST(request: NextRequest) {
  // Verify Firebase auth token – returns userId string or a 401 NextResponse
  const authResult = await verifyAuth(request);
  if (authResult instanceof NextResponse) return authResult;
  const userId = authResult;

  try {
    const body: ExecuteQueryRequest = await request.json();
    let { database, query } = body;

    // Validate request
    if (!query || typeof query !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Query is required',
        formattedOutput: ['ERROR: Query is required'],
      }, { status: 400 });
    }

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return NextResponse.json({
        success: false,
        error: 'Query cannot be empty',
        formattedOutput: ['ERROR: Query cannot be empty'],
      }, { status: 400 });
    }

    // Auto-prefix database name with user's namespace (skip system schemas)
    if (database && !SYSTEM_SCHEMAS.has(database.toLowerCase())) {
      database = getPrefixedDatabaseName(database, userId);
    }
    console.log('[Query Execute] Resolved database:', database);

    // Handle special commands for PostgreSQL compatibility
    let processedQuery = trimmedQuery;
    let isSpecialCommand = false;
    
    // Convert SHOW DATABASES to information_schema query for PostgreSQL
    if (trimmedQuery.toUpperCase() === 'SHOW DATABASES') {
      processedQuery = `
        SELECT schema_name as "Database"
        FROM information_schema.schemata 
        WHERE schema_name NOT LIKE 'pg_%' 
        AND schema_name != 'information_schema'
        ORDER BY schema_name
      `;
      isSpecialCommand = true;
    }
    
    // Convert SHOW TABLES to PostgreSQL information_schema query
    if (trimmedQuery.toUpperCase() === 'SHOW TABLES' || trimmedQuery.toUpperCase().startsWith('SHOW TABLES')) {
      if (database) {
        processedQuery = `
          SELECT table_name as "Tables_in_${database}"
          FROM information_schema.tables
          WHERE table_schema = current_schema()
          AND table_type = 'BASE TABLE'
          ORDER BY table_name
        `;
      }
      isSpecialCommand = false; // SHOW TABLES needs schema context
    }

    // Determine if we need a schema context
    const upperQuery = processedQuery.toUpperCase();
    const skipSchemaContext = 
      upperQuery.includes('CREATE SCHEMA') ||
      upperQuery.includes('DROP SCHEMA') ||
      isSpecialCommand;

    let result;
    
    if (database && !skipSchemaContext) {
      // Execute query within the specified schema
      console.log(`[Query Execute] Running query in schema "${database}":`, processedQuery.substring(0, 100));
      result = await executeQueryInDatabase(database, processedQuery);
    } else if (!database && !skipSchemaContext && !upperQuery.includes('INFORMATION_SCHEMA')) {
      // Query needs a schema but none specified
      return NextResponse.json({
        success: false,
        error: 'No schema selected',
        formattedOutput: ['ERROR: No schema selected'],
      }, { status: 400 });
    } else {
      // Execute query without schema context
      console.log(`[Query Execute] Running query without schema context:`, processedQuery.substring(0, 100));
      result = await executeQuery(processedQuery);
    }

    if (result.success) {
      const formattedOutput = formatResultsForTerminal(result.results, trimmedQuery);
      
      const response = NextResponse.json({
        success: true,
        results: result.results,
        formattedOutput,
      });
      return setNoCacheHeaders(response);
    } else {
      const formattedError = formatErrorForTerminal(
        result.error || 'Unknown error',
        result.code
      );
      
      const response = NextResponse.json({
        success: false,
        error: result.error,
        code: result.code,
        sqlState: result.sqlState,
        formattedOutput: [formattedError],
      });
      return setNoCacheHeaders(response);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const response = NextResponse.json({
      success: false,
      error: errorMessage,
      formattedOutput: [`ERROR: ${errorMessage}`],
    }, { status: 500 });
    return setNoCacheHeaders(response);
  }
}
