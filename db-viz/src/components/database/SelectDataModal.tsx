'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Database, Table, Loader2, Plus, Trash2, Play, Filter } from 'lucide-react';
import Button from '@/components/common/Button';
import { Database as DatabaseType, Table as TableType } from '@/types/database';

interface WhereCondition {
  id: string;
  column: string;
  operator: string;
  value: string;
  connector: 'AND' | 'OR';
}

interface SelectDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  databases: DatabaseType[];
  tables: TableType[];
  selectedDatabaseId: string | null;
  userId?: string;
  onExecuteQuery: (database: string, query: string) => Promise<{ success: boolean; results?: unknown[]; error?: string }>;
  onShowResults: (results: unknown[], query: string) => void;
  theme?: any;
}

const OPERATORS = [
  { value: '=', label: '= (equals)' },
  { value: '!=', label: '!= (not equals)' },
  { value: '>', label: '> (greater than)' },
  { value: '<', label: '< (less than)' },
  { value: '>=', label: '>= (greater or equal)' },
  { value: '<=', label: '<= (less or equal)' },
  { value: 'LIKE', label: 'LIKE (pattern match)' },
  { value: 'NOT LIKE', label: 'NOT LIKE' },
  { value: 'IN', label: 'IN (list of values)' },
  { value: 'NOT IN', label: 'NOT IN' },
  { value: 'BETWEEN', label: 'BETWEEN (range)' },
  { value: 'IS NULL', label: 'IS NULL' },
  { value: 'IS NOT NULL', label: 'IS NOT NULL' },
  { value: 'ANY', label: 'ANY (subquery)' },
  { value: 'ALL', label: 'ALL (subquery)' },
];

export default function SelectDataModal({
  isOpen,
  onClose,
  databases,
  tables,
  selectedDatabaseId,
  userId,
  onExecuteQuery,
  onShowResults,
  theme,
}: SelectDataModalProps) {
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['*']);
  const [whereConditions, setWhereConditions] = useState<WhereCondition[]>([]);
  const [orderBy, setOrderBy] = useState<string>('');
  const [orderDirection, setOrderDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [limit, setLimit] = useState<string>('');
  const [offset, setOffset] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedQuery, setGeneratedQuery] = useState<string>('');

  // Get tables for selected database
  const tablesForDatabase = tables.filter((t) => {
    const db = databases.find((d) => d.name === selectedDatabase);
    return db && t.databaseId === db.id;
  });

  // Get columns for selected table
  const selectedTableData = tablesForDatabase.find((t) => t.name === selectedTable);
  const availableColumns = selectedTableData?.columns || [];

  // Set default database on open
  useEffect(() => {
    if (isOpen && selectedDatabaseId) {
      const db = databases.find((d) => d.id === selectedDatabaseId);
      if (db) {
        setSelectedDatabase(db.name);
      }
    }
  }, [isOpen, selectedDatabaseId, databases]);

  // Generate query whenever conditions change
  useEffect(() => {
    if (selectedDatabase && selectedTable) {
      const query = buildQuery();
      setGeneratedQuery(query);
    } else {
      setGeneratedQuery('');
    }
  }, [selectedDatabase, selectedTable, selectedColumns, whereConditions, orderBy, orderDirection, limit, offset]);

  const buildQuery = () => {
    if (!selectedTable) return '';

    // Columns
    const cols = selectedColumns.length === 0 || selectedColumns.includes('*')
      ? '*'
      : selectedColumns.map(c => `"${c}"`).join(', ');

    let query = `SELECT ${cols} FROM "${selectedTable}"`;

    // WHERE clause
    if (whereConditions.length > 0) {
      const validConditions = whereConditions.filter(c => c.column && c.operator);
      if (validConditions.length > 0) {
        query += ' WHERE ';
        query += validConditions.map((cond, idx) => {
          let condStr = '';
          if (idx > 0) {
            condStr += ` ${cond.connector} `;
          }

          // Handle operators that don't need value
          if (cond.operator === 'IS NULL' || cond.operator === 'IS NOT NULL') {
            condStr += `"${cond.column}" ${cond.operator}`;
          }
          // Handle IN/NOT IN
          else if (cond.operator === 'IN' || cond.operator === 'NOT IN') {
            const values = cond.value.split(',').map(v => `'${v.trim()}'`).join(', ');
            condStr += `"${cond.column}" ${cond.operator} (${values})`;
          }
          // Handle BETWEEN
          else if (cond.operator === 'BETWEEN') {
            const [val1, val2] = cond.value.split(',').map(v => v.trim());
            condStr += `"${cond.column}" BETWEEN '${val1 || ''}' AND '${val2 || ''}'`;
          }
          // Handle ANY/ALL (simplified - user enters subquery)
          else if (cond.operator === 'ANY' || cond.operator === 'ALL') {
            condStr += `"${cond.column}" = ${cond.operator} (${cond.value})`;
          }
          // Handle LIKE
          else if (cond.operator === 'LIKE' || cond.operator === 'NOT LIKE') {
            condStr += `"${cond.column}" ${cond.operator} '${cond.value}'`;
          }
          // Standard operators
          else {
            // Try to detect if value is numeric
            const isNumeric = !isNaN(Number(cond.value)) && cond.value.trim() !== '';
            const formattedValue = isNumeric ? cond.value : `'${cond.value}'`;
            condStr += `"${cond.column}" ${cond.operator} ${formattedValue}`;
          }

          return condStr;
        }).join('');
      }
    }

    // ORDER BY
    if (orderBy) {
      query += ` ORDER BY "${orderBy}" ${orderDirection}`;
    }

    // LIMIT
    if (limit && !isNaN(Number(limit))) {
      query += ` LIMIT ${limit}`;
    }

    // OFFSET
    if (offset && !isNaN(Number(offset)) && Number(offset) > 0) {
      query += ` OFFSET ${offset}`;
    }

    return query;
  };

  const addCondition = () => {
    setWhereConditions([
      ...whereConditions,
      {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        column: availableColumns[0]?.name || '',
        operator: '=',
        value: '',
        connector: 'AND',
      },
    ]);
  };

  const removeCondition = (id: string) => {
    setWhereConditions(whereConditions.filter((c) => c.id !== id));
  };

  const updateCondition = (id: string, field: keyof WhereCondition, value: string) => {
    setWhereConditions(
      whereConditions.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const executeQuery = async () => {
    if (!selectedDatabase || !selectedTable) return;

    setIsLoading(true);
    setError(null);

    try {
      const query = buildQuery();
      
      // Compute prefixed database name if userId is provided
      let databaseToUse = selectedDatabase;
      if (userId) {
        const prefix = `user_${userId.substring(0, 8)}_`;
        databaseToUse = `${prefix}${selectedDatabase}`;
      }
      
      const result = await onExecuteQuery(databaseToUse, query);

      if (result.success && Array.isArray(result.results)) {
        onShowResults(result.results, query);
        handleClose();
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      setError('Failed to execute query');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedDatabase('');
    setSelectedTable('');
    setSelectedColumns(['*']);
    setWhereConditions([]);
    setOrderBy('');
    setOrderDirection('ASC');
    setLimit('');
    setOffset('');
    setError(null);
    setGeneratedQuery('');
    onClose();
  };

  const toggleColumn = (columnName: string) => {
    if (columnName === '*') {
      setSelectedColumns(['*']);
    } else {
      let newColumns = selectedColumns.filter(c => c !== '*');
      if (newColumns.includes(columnName)) {
        newColumns = newColumns.filter(c => c !== columnName);
      } else {
        newColumns.push(columnName);
      }
      setSelectedColumns(newColumns.length === 0 ? ['*'] : newColumns);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`${theme?.modal || 'bg-white'} rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-5 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${theme?.text || 'text-gray-900'}`}>Select Data</h2>
                    <p className={`text-sm ${theme?.textSecondary || 'text-gray-500'}`}>
                      Build a query with WHERE clauses, filters, and more
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className={`p-2 rounded-lg ${theme?.buttonSecondary || 'hover:bg-gray-100'} transition-all`}
                >
                  <X className={`w-5 h-5 ${theme?.textSecondary || 'text-gray-500'}`} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-5 overflow-y-auto max-h-[calc(90vh-180px)]">
                {/* Database & Table Selection */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                      <Database className="w-4 h-4 inline mr-2" />
                      Database
                    </label>
                    <select
                      value={selectedDatabase}
                      onChange={(e) => {
                        setSelectedDatabase(e.target.value);
                        setSelectedTable('');
                        setSelectedColumns(['*']);
                        setWhereConditions([]);
                      }}
                      className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme?.navbar?.includes('slate') ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
                    >
                      <option value="">Select database</option>
                      {databases.map((db) => (
                        <option key={db.id} value={db.name}>
                          {db.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                      <Table className="w-4 h-4 inline mr-2" />
                      Table
                    </label>
                    <select
                      value={selectedTable}
                      onChange={(e) => {
                        setSelectedTable(e.target.value);
                        setSelectedColumns(['*']);
                        setWhereConditions([]);
                      }}
                      disabled={!selectedDatabase}
                      className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 ${theme?.navbar?.includes('slate') ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300 disabled:bg-gray-50'}`}
                    >
                      <option value="">Select table</option>
                      {tablesForDatabase.map((table) => (
                        <option key={table.id} value={table.name}>
                          {table.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedTable && (
                  <>
                    {/* Column Selection */}
                    <div className="mb-6">
                      <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                        Select Columns
                      </label>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedColumns(['*'])}
                          className={`px-3 py-1.5 rounded-lg text-sm transition-all ${selectedColumns.includes('*')
                              ? 'bg-blue-600 text-white'
                              : theme?.navbar?.includes('slate')
                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          All (*)
                        </button>
                        {availableColumns.map((col) => (
                          <button
                            key={col.name}
                            onClick={() => toggleColumn(col.name)}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${selectedColumns.includes(col.name) && !selectedColumns.includes('*')
                                ? 'bg-blue-600 text-white'
                                : theme?.navbar?.includes('slate')
                                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            {col.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* WHERE Conditions */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className={`text-sm font-medium ${theme?.text || 'text-gray-700'} flex items-center gap-2`}>
                          <Filter className="w-4 h-4" />
                          WHERE Conditions
                        </label>
                        <button
                          onClick={addCondition}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Condition
                        </button>
                      </div>

                      {whereConditions.length === 0 ? (
                        <p className={`text-sm ${theme?.textSecondary || 'text-gray-500'} italic`}>
                          No conditions added. Click "Add Condition" to filter results.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {whereConditions.map((condition, idx) => (
                            <div
                              key={condition.id}
                              className={`flex items-center gap-2 p-3 rounded-xl ${theme?.navbar?.includes('slate') ? 'bg-slate-800' : 'bg-gray-50'}`}
                            >
                              {idx > 0 && (
                                <select
                                  value={condition.connector}
                                  onChange={(e) => updateCondition(condition.id, 'connector', e.target.value)}
                                  className={`px-2 py-1.5 border rounded-lg text-sm ${theme?.navbar?.includes('slate') ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300'}`}
                                >
                                  <option value="AND">AND</option>
                                  <option value="OR">OR</option>
                                </select>
                              )}

                              {/* Column */}
                              <select
                                value={condition.column}
                                onChange={(e) => updateCondition(condition.id, 'column', e.target.value)}
                                className={`flex-1 px-3 py-1.5 border rounded-lg text-sm ${theme?.navbar?.includes('slate') ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300'}`}
                              >
                                <option value="">Column</option>
                                {availableColumns.map((col) => (
                                  <option key={col.name} value={col.name}>
                                    {col.name}
                                  </option>
                                ))}
                              </select>

                              {/* Operator */}
                              <select
                                value={condition.operator}
                                onChange={(e) => updateCondition(condition.id, 'operator', e.target.value)}
                                className={`px-3 py-1.5 border rounded-lg text-sm ${theme?.navbar?.includes('slate') ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-300'}`}
                              >
                                {OPERATORS.map((op) => (
                                  <option key={op.value} value={op.value}>
                                    {op.label}
                                  </option>
                                ))}
                              </select>

                              {/* Value - hide for IS NULL/IS NOT NULL */}
                              {condition.operator !== 'IS NULL' && condition.operator !== 'IS NOT NULL' && (
                                <input
                                  type="text"
                                  value={condition.value}
                                  onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                                  placeholder={
                                    condition.operator === 'IN' || condition.operator === 'NOT IN'
                                      ? 'val1, val2, val3'
                                      : condition.operator === 'BETWEEN'
                                        ? 'min, max'
                                        : condition.operator === 'LIKE'
                                          ? '%pattern%'
                                          : condition.operator === 'ANY' || condition.operator === 'ALL'
                                            ? 'SELECT query'
                                            : 'Value'
                                  }
                                  className={`flex-1 px-3 py-1.5 border rounded-lg text-sm ${theme?.navbar?.includes('slate') ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' : 'border-gray-300'}`}
                                />
                              )}

                              <button
                                onClick={() => removeCondition(condition.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ORDER BY & LIMIT & OFFSET */}
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1">
                        <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                          Order By
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={orderBy}
                            onChange={(e) => setOrderBy(e.target.value)}
                            className={`flex-1 px-3 py-2 border rounded-xl text-sm ${theme?.navbar?.includes('slate') ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
                          >
                            <option value="">None</option>
                            {availableColumns.map((col) => (
                              <option key={col.name} value={col.name}>
                                {col.name}
                              </option>
                            ))}
                          </select>
                          <select
                            value={orderDirection}
                            onChange={(e) => setOrderDirection(e.target.value as 'ASC' | 'DESC')}
                            disabled={!orderBy}
                            className={`px-3 py-2 border rounded-xl text-sm disabled:opacity-50 ${theme?.navbar?.includes('slate') ? 'bg-slate-800 border-slate-600 text-white' : 'border-gray-300'}`}
                          >
                            <option value="ASC">ASC</option>
                            <option value="DESC">DESC</option>
                          </select>
                        </div>
                      </div>
                      <div className="w-28">
                        <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                          Limit
                        </label>
                        <input
                          type="number"
                          value={limit}
                          onChange={(e) => setLimit(e.target.value)}
                          placeholder="All"
                          min="1"
                          className={`w-full px-3 py-2 border rounded-xl text-sm ${theme?.navbar?.includes('slate') ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' : 'border-gray-300'}`}
                        />
                      </div>
                      <div className="w-28">
                        <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                          Offset
                        </label>
                        <input
                          type="number"
                          value={offset}
                          onChange={(e) => setOffset(e.target.value)}
                          placeholder="0"
                          min="0"
                          className={`w-full px-3 py-2 border rounded-xl text-sm ${theme?.navbar?.includes('slate') ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' : 'border-gray-300'}`}
                        />
                      </div>
                    </div>

                    {/* Generated Query Preview */}
                    {generatedQuery && (
                      <div className="mb-4">
                        <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                          Generated Query
                        </label>
                        <pre className={`p-3 rounded-xl text-sm font-mono overflow-x-auto ${theme?.navbar?.includes('slate') ? 'bg-slate-800 text-green-400' : 'bg-gray-900 text-green-400'}`}>
                          {generatedQuery}
                        </pre>
                      </div>
                    )}
                  </>
                )}

                {/* Loading/Error States */}
                {isLoading && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <span className="ml-3 text-gray-500">Executing query...</span>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm mb-4">
                    {error}
                  </div>
                )}

                {!selectedTable && !isLoading && (
                  <div className="py-12 text-center text-gray-500">
                    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <p>Select a database and table to build your query</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className={`flex justify-between items-center p-5 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={executeQuery}
                  disabled={!selectedTable || isLoading}
                  className="flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Execute Query
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
