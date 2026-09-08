import { NextRequest, NextResponse } from 'next/server';
import { getConnection } from '@/lib/postgresql';

/**
 * POST /api/init-db
 * 
 * Initialize database schema and system tables for PostgreSQL
 * Only call this ONCE on first Neon deployment
 * 
 * Security: Use the INIT_TOKEN environment variable to prevent unauthorized initialization
 */
export async function POST(request: NextRequest) {
  try {
    // Verify the initialization token for security
    const token = request.headers.get('x-init-token');
    const expectedToken = process.env.INIT_TOKEN;

    if (!token || token !== expectedToken) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing initialization token' },
        { status: 401 }
      );
    }

    let connection: any = null;

    try {
      connection = await getConnection();

      // Create system schema for metadata tracking (PostgreSQL equivalent of database)
      await connection.query(
        'CREATE SCHEMA IF NOT EXISTS db_viz_system'
      );

      // Create user metadata table to track user initialization
      await connection.query(`
        CREATE TABLE IF NOT EXISTS db_viz_system.user_metadata (
          user_id VARCHAR(255) PRIMARY KEY,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          database_count INT DEFAULT 0,
          last_login TIMESTAMP NULL
        )
      `);

      // Create indexes
      await connection.query(`
        CREATE INDEX IF NOT EXISTS idx_user_metadata_created 
        ON db_viz_system.user_metadata(created_at)
      `);

      await connection.query(`
        CREATE INDEX IF NOT EXISTS idx_user_metadata_login 
        ON db_viz_system.user_metadata(last_login)
      `);

      // Create database tracking table
      await connection.query(`
        CREATE TABLE IF NOT EXISTS db_viz_system.user_databases (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(255) NOT NULL,
          database_name VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id, database_name)
        )
      `);

      // Create indexes
      await connection.query(`
        CREATE INDEX IF NOT EXISTS idx_user_databases_user 
        ON db_viz_system.user_databases(user_id)
      `);

      await connection.query(`
        CREATE INDEX IF NOT EXISTS idx_user_databases_created 
        ON db_viz_system.user_databases(created_at)
      `);

      // Create query history table for tracking user queries
      await connection.query(`
        CREATE TABLE IF NOT EXISTS db_viz_system.query_history (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(255) NOT NULL,
          database_name VARCHAR(255) NOT NULL,
          query_text TEXT NOT NULL,
          executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          execution_time_ms INT,
          status VARCHAR(20) DEFAULT 'success',
          error_message TEXT
        )
      `);

      // Create indexes
      await connection.query(`
        CREATE INDEX IF NOT EXISTS idx_query_history_user 
        ON db_viz_system.query_history(user_id)
      `);

      await connection.query(`
        CREATE INDEX IF NOT EXISTS idx_query_history_database 
        ON db_viz_system.query_history(database_name)
      `);

      await connection.query(`
        CREATE INDEX IF NOT EXISTS idx_query_history_executed 
        ON db_viz_system.query_history(executed_at)
      `);

      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully',
        tables: [
          'db_viz_system.user_metadata',
          'db_viz_system.user_databases',
          'db_viz_system.query_history',
        ],
      });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initialize database',
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/init-db
 * Check if database is initialized
 */
export async function GET(request: NextRequest) {
  try {
    let connection: any = null;

    try {
      connection = await getConnection();

      // Try to query the system schema
      const result = await connection.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'db_viz_system'
      `);

      const tables = result.rows || [];
      const isInitialized = Array.isArray(tables) && tables.length > 0;

      return NextResponse.json({
        success: true,
        initialized: isInitialized,
        tables: isInitialized ? tables.map((t: any) => t.table_name) : [],
      });
    } finally {
      if (connection) {
        connection.release();
      }
    }
  } catch (error) {
    console.error('Database check error:', error);

    return NextResponse.json({
      success: true,
      initialized: false,
      tables: [],
      message: 'Database not yet initialized',
    });
  }
}
