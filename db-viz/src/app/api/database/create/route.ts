import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, getPrefixedDatabaseName } from '@/lib/postgresql';
import { setNoCacheHeaders } from '@/lib/cache-headers';

interface CreateDatabaseRequest {
  name: string;
  userId: string;
}

/**
 * POST /api/database/create
 * 
 * Create a new PostgreSQL schema with user isolation.
 * Schema names are prefixed with userId to ensure user isolation.
 * 
 * Request body:
 * {
 *   "name": "schema_name",
 *   "userId": "user_firebase_uid"
 * }
 * 
 * Response:
 * {
 *   "success": boolean,
 *   "message": string,
 *   "database": string,
 *   "actualDatabaseName": string,
 *   "error"?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateDatabaseRequest = await request.json();
    const { name, userId } = body;

    // Validate database name and userId
    if (!name || typeof name !== 'string') {
      const response = NextResponse.json({
        success: false,
        error: 'Schema name is required',
      }, { status: 400 });
      return setNoCacheHeaders(response);
    }

    if (!userId || typeof userId !== 'string') {
      const response = NextResponse.json({
        success: false,
        error: 'User ID is required',
      }, { status: 400 });
      return setNoCacheHeaders(response);
    }

    const trimmedName = name.trim();
    
    // Create prefixed schema name for user isolation
    // Format: user_{userId}_{schemaName}
    const prefixedName = getPrefixedDatabaseName(trimmedName, userId);

    // Validate schema name format (PostgreSQL naming rules)
    // Must start with letter or underscore, contain only alphanumeric and underscores
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(trimmedName)) {
      const response = NextResponse.json({
        success: false,
        error: 'Invalid schema name. Name must start with a letter or underscore and contain only letters, numbers, and underscores.',
      }, { status: 400 });
      return setNoCacheHeaders(response);
    }

    // Check length (PostgreSQL limit is 63 characters)
    if (prefixedName.length > 63) {
      const response = NextResponse.json({
        success: false,
        error: 'Schema name is too long (max 63 characters including prefix)',
      }, { status: 400 });
      return setNoCacheHeaders(response);
    }

    // Execute CREATE SCHEMA query with prefixed name
    // Using quotes to safely escape the schema name
    const query = `CREATE SCHEMA IF NOT EXISTS "${prefixedName}"`;
    const result = await executeQuery(query);

    if (result.success) {
      const response = NextResponse.json({
        success: true,
        message: `Schema '${trimmedName}' created successfully`,
        database: trimmedName, // Return user-friendly name
        actualDatabaseName: prefixedName, // Return actual PostgreSQL schema name
      });
      return setNoCacheHeaders(response);
    } else {
      // Handle specific PostgreSQL errors
      let errorMessage = result.error || 'Failed to create schema';
      
      if (result.code === 'DUPLICATE_SCHEMA') {
        errorMessage = `Schema '${trimmedName}' already exists`;
      }

      const response = NextResponse.json({
        success: false,
        error: errorMessage,
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
