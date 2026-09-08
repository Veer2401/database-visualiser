"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postgresql_1 = require("../../lib/postgresql");
const auth_helper_1 = require("../../lib/auth-helper");
const router = (0, express_1.Router)();
router.use(auth_helper_1.authenticateToken);
const SYSTEM_SCHEMAS = new Set(['information_schema', 'pg_catalog', 'public', 'db_viz_system']);
// POST /api/query/execute
router.post('/execute', async (req, res) => {
    const userId = req.userId;
    try {
        let { database, query } = req.body;
        if (!query || typeof query !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Query is required',
                formattedOutput: ['ERROR: Query is required'],
            });
        }
        const trimmedQuery = query.trim();
        if (!trimmedQuery) {
            return res.status(400).json({
                success: false,
                error: 'Query cannot be empty',
                formattedOutput: ['ERROR: Query cannot be empty'],
            });
        }
        if (database && !SYSTEM_SCHEMAS.has(database.toLowerCase())) {
            database = (0, postgresql_1.getPrefixedDatabaseName)(database, userId);
        }
        let processedQuery = trimmedQuery;
        let isSpecialCommand = false;
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
            isSpecialCommand = false;
        }
        const upperQuery = processedQuery.toUpperCase();
        const skipSchemaContext = upperQuery.includes('CREATE SCHEMA') ||
            upperQuery.includes('DROP SCHEMA') ||
            isSpecialCommand;
        let result;
        if (database && !skipSchemaContext) {
            result = await (0, postgresql_1.executeQueryInDatabase)(database, processedQuery);
        }
        else if (!database && !skipSchemaContext && !upperQuery.includes('INFORMATION_SCHEMA')) {
            return res.status(400).json({
                success: false,
                error: 'No schema selected',
                formattedOutput: ['ERROR: No schema selected'],
            });
        }
        else {
            result = await (0, postgresql_1.executeQuery)(processedQuery);
        }
        if (result.success) {
            const formattedOutput = (0, postgresql_1.formatResultsForTerminal)(result.results, trimmedQuery);
            return res.json({
                success: true,
                results: result.results,
                formattedOutput,
            });
        }
        else {
            const formattedError = (0, postgresql_1.formatErrorForTerminal)(result.error || 'Unknown error', result.code);
            return res.json({
                success: false,
                error: result.error,
                code: result.code,
                sqlState: result.sqlState,
                formattedOutput: [formattedError],
            });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return res.status(500).json({
            success: false,
            error: errorMessage,
            formattedOutput: [`ERROR: ${errorMessage}`],
        });
    }
});
exports.default = router;
