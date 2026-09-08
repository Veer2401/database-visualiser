import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/postgresql';

/**
 * GET /api/test-mysql
 * 
 * Test endpoint to verify PostgreSQL connectivity.
 * Executes a simple query to confirm the connection is working.
 * This endpoint is for development testing only.
 */
export async function GET() {
  try {
    const result = await executeQuery('SELECT version()');
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'PostgreSQL connection successful',
        version: result.results,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'PostgreSQL connection failed',
        error: result.error,
        code: result.code,
      }, { status: 500 });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({
      success: false,
      message: 'Failed to connect to PostgreSQL',
      error: errorMessage,
    }, { status: 500 });
  }
}
