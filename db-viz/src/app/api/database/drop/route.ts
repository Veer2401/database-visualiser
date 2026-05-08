import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, getPrefixedDatabaseName } from '@/lib/postgresql';
import { verifyAuth } from '@/lib/auth-helper';

interface DropDatabaseRequest {
  name: string;
}

/**
 * POST /api/database/drop
 * 
 * Drop (delete) a PostgreSQL schema.
 * Called when user deletes a schema from the UI.
 * 
 * Requires: Firebase ID token in Authorization header
 * 
 * Request body:
 * {
 *   "name": "schema_name"
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
    // Verify authentication - get userId from Firebase token
    const authResult = await verifyAuth(request);
    if (typeof authResult !== 'string') {
      return authResult; // Return error response
    }
    const userId = authResult;

    const body: DropDatabaseRequest = await request.json();
    const { name } = body;

    // Validate schema name
    if (!name || typeof name !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Schema name is required',
      }, { status: 400 });
    }

    const trimmedName = name.trim();
    
    // Create prefixed schema name for user isolation
    const prefixedName = getPrefixedDatabaseName(trimmedName, userId);

    // Execute DROP SCHEMA query with prefixed name
    // Using CASCADE to drop all objects in the schema
    // Using quotes to safely escape the schema name
    const query = `DROP SCHEMA IF EXISTS "${prefixedName}" CASCADE`;
    const result = await executeQuery(query);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Schema '${trimmedName}' dropped successfully`,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to drop schema',
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
