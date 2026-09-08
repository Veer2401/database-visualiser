"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDatabasePrefix = getUserDatabasePrefix;
exports.isDatabaseOwnedByUser = isDatabaseOwnedByUser;
exports.getPrefixedDatabaseName = getPrefixedDatabaseName;
exports.getDisplayDatabaseName = getDisplayDatabaseName;
exports.getConnection = getConnection;
exports.getConnectionWithDatabase = getConnectionWithDatabase;
exports.executeQuery = executeQuery;
exports.executeQueryInDatabase = executeQueryInDatabase;
exports.formatResultsForTerminal = formatResultsForTerminal;
exports.formatErrorForTerminal = formatErrorForTerminal;
const pg_1 = require("pg");
const DATABASE_URL = process.env.DATABASE_URL;
let pool = null;
function getPool() {
    const connectionString = process.env.DATABASE_URL || DATABASE_URL;
    if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set');
    }
    if (!pool) {
        pool = new pg_1.Pool({
            connectionString,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 15000,
            ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
        });
        pool.on('error', (err) => {
            console.error('[PostgreSQL] Unexpected error on idle client:', err.message);
        });
    }
    return pool;
}
function getUserDatabasePrefix(userId) {
    return `user_${userId.substring(0, 8)}_`;
}
function isDatabaseOwnedByUser(databaseName, userId) {
    const prefix = getUserDatabasePrefix(userId);
    return databaseName.startsWith(prefix);
}
function getPrefixedDatabaseName(databaseName, userId) {
    const prefix = getUserDatabasePrefix(userId);
    if (databaseName.startsWith(prefix)) {
        return databaseName;
    }
    return `${prefix}${databaseName}`;
}
function getDisplayDatabaseName(schemaName, userId) {
    const prefix = getUserDatabasePrefix(userId);
    if (schemaName.startsWith(prefix)) {
        return schemaName.replace(prefix, '');
    }
    return schemaName;
}
async function getConnection() {
    return getPool().connect();
}
async function getConnectionWithDatabase(database) {
    if (!/^[a-zA-Z0-9_-]+$/.test(database)) {
        throw new Error(`Invalid schema identifier: "${database}"`);
    }
    const connection = await getPool().connect();
    try {
        await connection.query(`CREATE SCHEMA IF NOT EXISTS "${database}"`);
        await connection.query(`SET search_path TO "${database}"`);
    }
    catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error(`[PostgreSQL] Error setting schema "${database}": ${errorMsg}`);
    }
    return connection;
}
async function executeQuery(query) {
    let connection = null;
    try {
        connection = await getConnection();
        const result = await connection.query(query);
        return { success: true, results: result.rows };
    }
    catch (error) {
        const pgError = error;
        return {
            success: false,
            error: pgError.message,
            code: pgError.code,
            errno: undefined,
            sqlState: pgError.sqlState,
        };
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
}
async function executeQueryInDatabase(database, query) {
    let connection = null;
    try {
        connection = await getConnectionWithDatabase(database);
        await connection.query("SET statement_timeout = '10000'");
        const result = await connection.query(query);
        const fields = result.fields || Object.keys(result.rows[0] || {}).map(name => ({ name }));
        return { success: true, results: result.rows, fields };
    }
    catch (error) {
        const pgError = error;
        console.error(`[PostgreSQL] Error in schema "${database}":`, pgError.message);
        return {
            success: false,
            error: pgError.message,
            code: pgError.code,
            errno: undefined,
            sqlState: pgError.sqlState,
        };
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
}
function formatResultsForTerminal(results, query) {
    const logs = [];
    const upperQuery = query.toUpperCase().trim();
    if (Array.isArray(results) && results.length > 0) {
        if (typeof results[0] === 'object' && results[0] !== null) {
            const columns = Object.keys(results[0]);
            const widths = columns.map((col) => {
                const values = results.map((row) => String(row[col] ?? 'NULL'));
                return Math.max(col.length, ...values.map((v) => v.length));
            });
            const separator = '+' + widths.map((w) => '-'.repeat(w + 2)).join('+') + '+';
            logs.push(separator);
            logs.push('| ' + columns.map((col, i) => col.padEnd(widths[i])).join(' | ') + ' |');
            logs.push(separator);
            results.forEach((row) => {
                const values = columns.map((col, i) => String(row[col] ?? 'NULL').padEnd(widths[i]));
                logs.push('| ' + values.join(' | ') + ' |');
            });
            logs.push(separator);
            logs.push(`${results.length} row(s) in set`);
        }
    }
    else if (results && typeof results === 'object') {
        const resultInfo = results;
        if ('rowCount' in resultInfo || 'affectedRows' in resultInfo) {
            const rowCount = resultInfo.rowCount || resultInfo.affectedRows || 0;
            if (upperQuery.startsWith('INSERT')) {
                logs.push(`Query OK, ${rowCount} row(s) affected`);
            }
            else if (upperQuery.startsWith('UPDATE')) {
                logs.push(`Query OK, ${rowCount} row(s) affected`);
            }
            else if (upperQuery.startsWith('DELETE')) {
                logs.push(`Query OK, ${rowCount} row(s) affected`);
            }
            else if (upperQuery.startsWith('CREATE')) {
                logs.push('Query OK, 0 rows affected');
            }
            else if (upperQuery.startsWith('DROP')) {
                logs.push('Query OK, 0 rows affected');
            }
            else if (upperQuery.startsWith('ALTER')) {
                logs.push('Query OK, 0 rows affected');
            }
            else {
                logs.push(`Query OK, ${rowCount} row(s) affected`);
            }
        }
    }
    else if (results === undefined || (Array.isArray(results) && results.length === 0)) {
        if (upperQuery.startsWith('SELECT') || upperQuery.startsWith('SHOW') || upperQuery.startsWith('DESC')) {
            logs.push('Empty set');
        }
        else {
            logs.push('Query OK');
        }
    }
    return logs;
}
function formatErrorForTerminal(error, code, errno) {
    if (code) {
        return `ERROR (${code}): ${error}`;
    }
    return `ERROR: ${error}`;
}
