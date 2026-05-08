import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, getPrefixedDatabaseName } from '@/lib/postgresql';

interface DropDatabaseRequest {
  name: string;
  userId: string;
}

/**
 * POST /api/database/drop
 * 
 * Drop (delete) a PostgreSQL schema.
 * Called when user deletes a schema from the UI.
 * 
 * Request body:
 * {
 *   "name": "schema_name",
 *   "userId": "user_id"
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
    const body: DropDatabaseRequest = await request.json();
    const { name, userId } = body;

    // Validate schema name and userId
    if (!name || typeof name !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'Schema name is required',
      }, { status: 400 });
    }

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({
        success: false,
        error: 'User ID is required',
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
