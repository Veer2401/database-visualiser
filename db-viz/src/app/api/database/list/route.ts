import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, getUserDatabasePrefix, getDisplayDatabaseName } from '@/lib/postgresql';
import { setNoCacheHeaders } from '@/lib/cache-headers';
import { verifyAuth } from '@/lib/auth-helper';

/**
 * GET /api/database/list
 * 
 * List PostgreSQL schemas for the authenticated user.
 * Filters schemas by user prefix for isolation.
 * 
 * Requires: Firebase ID token in Authorization header
 * 
 * Response:
 * {
 *   "success": boolean,
 *   "databases": Array<{name: string, actualName: string}>,
 *   "error"?: string
 * }
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication - get userId from Firebase token
    const authResult = await verifyAuth(request);
    if (typeof authResult !== 'string') {
      return setNoCacheHeaders(authResult); // Return error response
    }
    const userId = authResult;

    // Query PostgreSQL schemas
    const result = await executeQuery(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT LIKE 'pg_%' 
      AND schema_name != 'information_schema'
      ORDER BY schema_name
    `);

    if (result.success) {
      // Extract schema names from result
      const allDatabases = (result.results as { schema_name: string }[]).map(
        (row) => row.schema_name
      );

      // Filter schemas by user prefix
      const userPrefix = getUserDatabasePrefix(userId);
      const userDatabases = allDatabases
        .filter((db) => db.startsWith(userPrefix))
        .map((db) => ({
          name: getDisplayDatabaseName(db, userId), // Remove prefix for display
          actualName: db, // Keep actual name for PostgreSQL operations
        }));

      const response = NextResponse.json({
        success: true,
        databases: userDatabases,
      });
      return setNoCacheHeaders(response);
    } else {
      const response = NextResponse.json({
        success: false,
        error: result.error,
        code: result.code,
      }, { status: 500 });
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
