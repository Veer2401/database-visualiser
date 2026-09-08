"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postgresql_1 = require("../../lib/postgresql");
const auth_helper_1 = require("../../lib/auth-helper");
const router = (0, express_1.Router)();
router.use(auth_helper_1.authenticateToken);
// POST /api/table/describe
router.post('/describe', async (req, res) => {
    const userId = req.userId;
    try {
        let { database, table } = req.body;
        if (!database || typeof database !== 'string') {
            return res.status(400).json({ success: false, error: 'Schema name is required' });
        }
        if (!table || typeof table !== 'string') {
            return res.status(400).json({ success: false, error: 'Table name is required' });
        }
        database = (0, postgresql_1.getPrefixedDatabaseName)(database, userId);
        const tableLower = table.trim().toLowerCase();
        if (!/^[a-zA-Z0-9_]+$/.test(tableLower)) {
            return res.status(400).json({ success: false, error: 'Invalid table name' });
        }
        const result = await (0, postgresql_1.executeQueryInDatabase)(database, `
      SELECT 
        c.column_name as "Field",
        c.data_type as "Type",
        CASE WHEN c.is_nullable = 'YES' THEN 'YES' ELSE 'NO' END as "Null",
        c.column_default as "Default",
        CASE 
          WHEN pk.column_name IS NOT NULL THEN 'PRI'
          ELSE ''
        END as "Key",
        CASE WHEN c.is_identity = 'YES' THEN 'auto_increment' ELSE '' END as "Extra"
      FROM information_schema.columns c
      LEFT JOIN (
        SELECT kcu.column_name
        FROM information_schema.key_column_usage kcu
        JOIN information_schema.table_constraints tc 
          ON kcu.constraint_name = tc.constraint_name
          AND kcu.table_schema = tc.table_schema
          AND kcu.table_name = tc.table_name
        WHERE tc.constraint_type = 'PRIMARY KEY'
          AND kcu.table_schema = current_schema()
          AND kcu.table_name = '${tableLower}'
      ) pk ON c.column_name = pk.column_name
      WHERE c.table_schema = current_schema()
        AND c.table_name = '${tableLower}'
      ORDER BY c.ordinal_position
    `);
        if (result.success) {
            return res.json({
                success: true,
                columns: result.results,
            });
        }
        else {
            return res.status(400).json({
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
// POST /api/table/create
router.post('/create', async (req, res) => {
    const userId = req.userId;
    try {
        let { database, tableName, columns } = req.body;
        if (!database || typeof database !== 'string') {
            return res.status(400).json({ success: false, error: 'Schema name is required' });
        }
        database = (0, postgresql_1.getPrefixedDatabaseName)(database.trim(), userId);
        if (!tableName || typeof tableName !== 'string') {
            return res.status(400).json({ success: false, error: 'Table name is required' });
        }
        if (!columns || !Array.isArray(columns) || columns.length === 0) {
            return res.status(400).json({ success: false, error: 'At least one column is required' });
        }
        const columnDefinitions = [];
        const foreignKeys = [];
        const primaryKeys = [];
        const tableNameLower = tableName.trim().toLowerCase();
        for (const column of columns) {
            let dataType = column.dataType.toUpperCase();
            if (dataType === 'INT' && column.isAutoIncrement) {
                dataType = 'SERIAL';
            }
            let definition = `"${column.name}" ${dataType}`;
            if (dataType.includes('VARCHAR') && !dataType.includes('(')) {
                definition += '(255)';
            }
            if (column.isNotNull && dataType !== 'SERIAL') {
                definition += ' NOT NULL';
            }
            if (column.isUnique && !column.isPrimaryKey) {
                definition += ' UNIQUE';
            }
            if (column.defaultValue !== undefined && column.defaultValue !== '') {
                if (column.defaultValue.toUpperCase() === 'NULL') {
                    definition += ' DEFAULT NULL';
                }
                else if (column.defaultValue.toUpperCase() === 'CURRENT_TIMESTAMP') {
                    definition += ' DEFAULT CURRENT_TIMESTAMP';
                }
                else if (dataType.includes('INT') ||
                    dataType.includes('FLOAT') ||
                    dataType.includes('DOUBLE') ||
                    dataType.includes('DECIMAL') ||
                    dataType.includes('NUMERIC')) {
                    definition += ` DEFAULT ${column.defaultValue}`;
                }
                else {
                    definition += ` DEFAULT '${column.defaultValue}'`;
                }
            }
            columnDefinitions.push(definition);
            if (column.isPrimaryKey) {
                primaryKeys.push(`"${column.name}"`);
            }
            if (column.isForeignKey && column.foreignKeyReference) {
                const refTableName = column.foreignKeyReference.tableName.toLowerCase();
                foreignKeys.push(`FOREIGN KEY ("${column.name}") REFERENCES "${refTableName}"("${column.foreignKeyReference.columnName}")`);
            }
        }
        if (primaryKeys.length > 0) {
            columnDefinitions.push(`PRIMARY KEY (${primaryKeys.join(', ')})`);
        }
        foreignKeys.forEach((fk) => {
            columnDefinitions.push(fk);
        });
        const query = `CREATE TABLE "${tableNameLower}" (\n  ${columnDefinitions.join(',\n  ')}\n)`;
        const result = await (0, postgresql_1.executeQueryInDatabase)(database.trim(), query);
        if (result.success) {
            return res.json({
                success: true,
                message: `Table '${tableNameLower}' created successfully in schema '${database}'`,
                table: tableNameLower,
            });
        }
        else {
            let errorMessage = result.error || 'Failed to create table';
            if (result.code === 'DUPLICATE_TABLE') {
                errorMessage = `Table '${tableName}' already exists`;
            }
            else if (result.code === 'INVALID_SCHEMA_NAME') {
                errorMessage = `Schema '${database}' does not exist`;
            }
            return res.status(400).json({
                success: false,
                error: errorMessage,
                code: result.code,
            });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return res.status(500).json({ success: false, error: errorMessage });
    }
});
exports.default = router;
