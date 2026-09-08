"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postgresql_1 = require("../../lib/postgresql");
const auth_helper_1 = require("../../lib/auth-helper");
const router = (0, express_1.Router)();
router.use(auth_helper_1.authenticateToken);
// GET /api/database/list
router.get('/list', async (req, res) => {
    const userId = req.userId;
    try {
        const result = await (0, postgresql_1.executeQuery)(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT LIKE 'pg_%' 
      AND schema_name != 'information_schema'
      ORDER BY schema_name
    `);
        if (result.success) {
            const allDatabases = result.results.map((row) => row.schema_name);
            const userPrefix = (0, postgresql_1.getUserDatabasePrefix)(userId);
            const userDatabases = allDatabases
                .filter((db) => db.startsWith(userPrefix))
                .map((db) => ({
                name: (0, postgresql_1.getDisplayDatabaseName)(db, userId),
                actualName: db,
            }));
            return res.json({
                success: true,
                databases: userDatabases,
            });
        }
        else {
            return res.status(500).json({
                success: false,
                error: result.error,
                code: result.code,
            });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return res.status(500).json({ success: false, error: errorMessage });
    }
});
// POST /api/database/create
router.post('/create', async (req, res) => {
    const userId = req.userId;
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ success: false, error: 'Database name is required.' });
    }
    const cleanName = name.trim().toLowerCase();
    if (!/^[a-z0-9_]+$/.test(cleanName)) {
        return res.status(400).json({ success: false, error: 'Database name can only contain letters, numbers, and underscores.' });
    }
    const actualSchemaName = (0, postgresql_1.getPrefixedDatabaseName)(cleanName, userId);
    try {
        const result = await (0, postgresql_1.executeQuery)(`CREATE SCHEMA IF NOT EXISTS "${actualSchemaName}"`);
        if (result.success) {
            return res.json({
                success: true,
                message: `Database "${cleanName}" created successfully.`,
                database: {
                    name: cleanName,
                    actualName: actualSchemaName,
                },
            });
        }
        else {
            return res.status(500).json({ success: false, error: result.error || 'Failed to create database.' });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return res.status(500).json({ success: false, error: errorMessage });
    }
});
// POST /api/database/drop
router.post('/drop', async (req, res) => {
    const userId = req.userId;
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ success: false, error: 'Database name is required.' });
    }
    const actualSchemaName = (0, postgresql_1.getPrefixedDatabaseName)(name, userId);
    try {
        const result = await (0, postgresql_1.executeQuery)(`DROP SCHEMA IF EXISTS "${actualSchemaName}" CASCADE`);
        if (result.success) {
            return res.json({
                success: true,
                message: `Database "${name}" dropped successfully.`,
            });
        }
        else {
            return res.status(500).json({ success: false, error: result.error || 'Failed to drop database.' });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return res.status(500).json({ success: false, error: errorMessage });
    }
});
exports.default = router;
