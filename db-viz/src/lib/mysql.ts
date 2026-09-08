import { Pool, PoolClient, QueryResult } from 'pg';

// PostgreSQL connection configuration using DATABASE_URL
// Supports Neon, Railway, and other PostgreSQL hosting
const DATABASE_URL = process.env.DATABASE_URL;

// Connection pool for better performance
let pool: Pool | null = null;

function getPool() {
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  if (!pool) {
    pool = new Pool({
      connectionString: DATABASE_URL,
      // Keep pool small for serverless environments (Neon, Railway, Vercel)
      max: 10,
      idleTimeoutMillis: 30000,
      // Allow enough time for cold starts on Neon/serverless Postgres
      connectionTimeoutMillis: 15000,
      // Allow SSL for hosted Postgres providers
      ssl: DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
    });

    pool.on('error', (err) => {
      console.error('[DB] Unexpected error on idle client:', err.message);
    });
  }
  return pool;
}

/**
 * Generate the user-specific database prefix
 * Format: user_{first8charsOfUserId}_
 */
export function getUserDatabasePrefix(userId: string): string {
  return `user_${userId.substring(0, 8)}_`;
}

/**
 * Check if a database name belongs to a specific user
 */
export function isDatabaseOwnedByUser(databaseName: string, userId: string): boolean {
  const prefix = getUserDatabasePrefix(userId);
  return databaseName.startsWith(prefix);
}

/**
 * Get the actual MySQL database name with user prefix
 */
export function getPrefixedDatabaseName(databaseName: string, userId: string): string {
  const prefix = getUserDatabasePrefix(userId);
  // If already prefixed, return as is
  if (databaseName.startsWith(prefix)) {
    return databaseName;
  }
  return `${prefix}${databaseName}`;
}

/**
 * Remove user prefix from database name for display
 */
export function getDisplayDatabaseName(mysqlName: string, userId: string): string {
  const prefix = getUserDatabasePrefix(userId);
  if (mysqlName.startsWith(prefix)) {
    return mysqlName.replace(prefix, '');
  }
  return mysqlName;
}

/**
 * Create a PostgreSQL connection without specifying a database
 * Used for operations like CREATE DATABASE, SHOW DATABASES
 */
export async function getConnection() {
  return getPool().connect();
}

/**
 * Create a PostgreSQL connection to a specific database
 * Used for operations within a database like CREATE TABLE, INSERT, SELECT, etc.
 */
export async function getConnectionWithDatabase(database: string) {
  const connection = await getPool().connect();
  // For PostgreSQL, set the search_path to the specific database schema
  // Note: PostgreSQL doesn't have "databases" like MySQL, but schemas within a database
  try {
    await connection.query(`SET search_path TO "${database}"`);
  } catch (err) {
    // Schema may not exist yet — log and continue with default
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`[DB] Schema "${database}" not found, using default: ${errorMsg}`);
  }
  return connection;
}

/**
 * Execute a query without a specific database context
 */
export async function executeQuery(query: string) {
  let connection: PoolClient | null = null;
  try {
    connection = await getConnection();
    const result = await connection.query(query);
    return { success: true, results: result.rows };
  } catch (error: unknown) {
    const pgError = error as { message: string; code?: string; errno?: number; sqlState?: string };
    return {
      success: false,
      error: pgError.message,
      code: pgError.code,
      errno: undefined,
      sqlState: pgError.sqlState,
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

/**
 * Execute a query within a specific database context
 */
export async function executeQueryInDatabase(database: string, query: string) {
  let connection: PoolClient | null = null;
  try {
    connection = await getConnectionWithDatabase(database);
    const result = await connection.query(query);
    
    // Format the result to include field information
    const fields = result.fields || Object.keys(result.rows[0] || {}).map(name => ({ name }));
    
    return { success: true, results: result.rows, fields };
  } catch (error: unknown) {
    const pgError = error as { message: string; code?: string; errno?: number; sqlState?: string };
    return {
      success: false,
      error: pgError.message,
      code: pgError.code,
      errno: undefined,
      sqlState: pgError.sqlState,
    };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

/**
 * Format PostgreSQL results for terminal display
 * Makes the output look like PostgreSQL CLI output
 */
export function formatResultsForTerminal(results: unknown, query: string): string[] {
  const logs: string[] = [];
  const upperQuery = query.toUpperCase().trim();

  // Handle different query types
  if (Array.isArray(results) && results.length > 0) {
    // SELECT, SHOW, DESCRIBE queries return arrays
    if (typeof results[0] === 'object' && results[0] !== null) {
      const columns = Object.keys(results[0] as Record<string, unknown>);
      
      // Calculate column widths
      const widths = columns.map((col) => {
        const values = results.map((row) => String((row as Record<string, unknown>)[col] ?? 'NULL'));
        return Math.max(col.length, ...values.map((v) => v.length));
      });

      // Build separator
      const separator = '+' + widths.map((w) => '-'.repeat(w + 2)).join('+') + '+';

      logs.push(separator);
      logs.push('| ' + columns.map((col, i) => col.padEnd(widths[i])).join(' | ') + ' |');
      logs.push(separator);

      // Add rows
      results.forEach((row) => {
        const values = columns.map((col, i) => 
          String((row as Record<string, unknown>)[col] ?? 'NULL').padEnd(widths[i])
        );
        logs.push('| ' + values.join(' | ') + ' |');
      });

      logs.push(separator);
      logs.push(`${results.length} row(s) in set`);
    }
  } else if (results && typeof results === 'object') {
    // INSERT, UPDATE, DELETE return result objects
    const resultInfo = results as { affectedRows?: number; insertId?: number; changedRows?: number; rowCount?: number };
    
    if ('rowCount' in resultInfo || 'affectedRows' in resultInfo) {
      const rowCount = (resultInfo as any).rowCount || (resultInfo as any).affectedRows || 0;
      
      if (upperQuery.startsWith('INSERT')) {
        logs.push(`Query OK, ${rowCount} row(s) affected`);
      } else if (upperQuery.startsWith('UPDATE')) {
        logs.push(`Query OK, ${rowCount} row(s) affected`);
      } else if (upperQuery.startsWith('DELETE')) {
        logs.push(`Query OK, ${rowCount} row(s) affected`);
      } else if (upperQuery.startsWith('CREATE')) {
        logs.push('Query OK, 0 rows affected');
      } else if (upperQuery.startsWith('DROP')) {
        logs.push('Query OK, 0 rows affected');
      } else if (upperQuery.startsWith('ALTER')) {
        logs.push('Query OK, 0 rows affected');
      } else {
        logs.push(`Query OK, ${rowCount} row(s) affected`);
      }
    }
  } else if (results === undefined || (Array.isArray(results) && results.length === 0)) {
    if (upperQuery.startsWith('SELECT') || upperQuery.startsWith('SHOW') || upperQuery.startsWith('DESC')) {
      logs.push('Empty set');
    } else {
      logs.push('Query OK');
    }
  }

  return logs;
}

/**
 * Format PostgreSQL error for terminal display
 */
export function formatErrorForTerminal(error: string, code?: string, errno?: number): string {
  if (code) {
    return `ERROR (${code}): ${error}`;
  }
  return `ERROR: ${error}`;
}
