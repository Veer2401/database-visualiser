'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit3, Database, Table, Loader2, Columns, Rows } from 'lucide-react';
import Button from '@/components/common/Button';
import { Database as DatabaseType, Table as TableType, DATA_TYPES, DataType } from '@/types/database';

interface UpdateDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  databases: DatabaseType[];
  tables: TableType[];
  selectedDatabaseId: string | null;
  userId?: string;
  onExecuteQuery: (database: string, query: string) => Promise<{ success: boolean; error?: string }>;
  theme?: any;
}

type UpdateMode = 'rows' | 'columns';
type ColumnAction = 'add' | 'modify' | 'drop';

export default function UpdateDataModal({
  isOpen,
  onClose,
  databases,
  tables,
  selectedDatabaseId,
  userId,
  onExecuteQuery,
  theme,
}: UpdateDataModalProps) {
  const [mode, setMode] = useState<UpdateMode | null>(null);
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Row update state
  const [whereClause, setWhereClause] = useState('');
  const [setClause, setSetClause] = useState('');

  // Column update state
  const [columnAction, setColumnAction] = useState<ColumnAction>('add');
  const [columnName, setColumnName] = useState('');
  const [newColumnName, setNewColumnName] = useState('');
  const [columnType, setColumnType] = useState<DataType>('VARCHAR');
  const [columnConstraints, setColumnConstraints] = useState({
    notNull: false,
    unique: false,
    defaultValue: '',
  });

  // Get tables for selected database
  const tablesForDatabase = tables.filter((t) => {
    const db = databases.find((d) => d.name === selectedDatabase);
    return db && t.databaseId === db.id;
  });

  // Get selected table info
  const selectedTableInfo = tables.find((t) => t.name === selectedTable);

  // Set default database on open
  useEffect(() => {
    if (isOpen && selectedDatabaseId) {
      const db = databases.find((d) => d.id === selectedDatabaseId);
      if (db) {
        setSelectedDatabase(db.name);
      }
    }
  }, [isOpen, selectedDatabaseId, databases]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDatabase || !selectedTable) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    let query = '';

    if (mode === 'rows') {
      if (!setClause.trim()) {
        setError('SET clause is required');
        setIsLoading(false);
        return;
      }
      query = `UPDATE "${selectedTable}" SET ${setClause}`;
      if (whereClause.trim()) {
        query += ` WHERE ${whereClause}`;
      }
    } else if (mode === 'columns') {
      if (columnAction === 'add') {
        if (!columnName.trim()) {
          setError('Column name is required');
          setIsLoading(false);
          return;
        }
        let typeStr: string = columnType;
        if (columnType === 'VARCHAR') typeStr = 'VARCHAR(255)';
        
        query = `ALTER TABLE "${selectedTable}" ADD COLUMN "${columnName}" ${typeStr}`;
        if (columnConstraints.notNull) query += ' NOT NULL';
        if (columnConstraints.unique) query += ' UNIQUE';
        if (columnConstraints.defaultValue) {
          query += ` DEFAULT '${columnConstraints.defaultValue}'`;
        }
      } else if (columnAction === 'modify') {
        if (!columnName.trim() || !newColumnName.trim()) {
          setError('Column name and new name are required');
          setIsLoading(false);
          return;
        }
        // PostgreSQL doesn't use CHANGE COLUMN - use RENAME for column name change
        query = `ALTER TABLE "${selectedTable}" RENAME COLUMN "${columnName}" TO "${newColumnName}"`;
      } else if (columnAction === 'drop') {
        if (!columnName.trim()) {
          setError('Column name is required');
          setIsLoading(false);
          return;
        }
        query = `ALTER TABLE "${selectedTable}" DROP COLUMN "${columnName}"`;
      }
    }

    try {
      // Compute prefixed database name if userId is provided
      let databaseToUse = selectedDatabase;
      if (userId) {
        const prefix = `user_${userId.substring(0, 8)}_`;
        databaseToUse = `${prefix}${selectedDatabase}`;
      }

      const result = await onExecuteQuery(databaseToUse, query);
      if (result.success) {
        setSuccess('Update executed successfully');
        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        setError(result.error || 'Failed to execute update');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute update');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setMode(null);
    setSelectedDatabase('');
    setSelectedTable('');
    setWhereClause('');
    setSetClause('');
    setColumnAction('add');
    setColumnName('');
    setNewColumnName('');
    setColumnType('VARCHAR');
    setColumnConstraints({ notNull: false, unique: false, defaultValue: '' });
    setError(null);
    setSuccess(null);
    onClose();
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
              className={`${theme?.modal || 'bg-white'} rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-hidden`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-6 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <Edit3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${theme?.text || 'text-gray-900'}`}>Update Data</h2>
                    <p className={`text-sm ${theme?.textSecondary || 'text-gray-500'}`}>Modify table data or structure</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className={`p-2 rounded-lg ${theme?.buttonSecondary || 'hover:bg-gray-100'} transition-colors`}
                >
                  <X className={`w-5 h-5 ${theme?.textSecondary || 'text-gray-500'}`} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* Mode Selection */}
                {!mode && (
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">What do you want to update?</p>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('rows')}
                        className="p-6 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all"
                      >
                        <Rows className="w-8 h-8 mx-auto mb-3 text-yellow-600" />
                        <h3 className="font-medium text-gray-900">Table Data</h3>
                        <p className="text-sm text-gray-500 mt-1">Update row values</p>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('columns')}
                        className="p-6 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all"
                      >
                        <Columns className="w-8 h-8 mx-auto mb-3 text-yellow-600" />
                        <h3 className="font-medium text-gray-900">Table Structure</h3>
                        <p className="text-sm text-gray-500 mt-1">Add/modify/drop columns</p>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Update Form */}
                {mode && (
                  <form onSubmit={handleSubmit}>
                    {/* Database Selection */}
                    <div className="mb-4">
                      <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                        <Database className="w-4 h-4 inline mr-2" />
                        Database
                      </label>
                      <select
                        value={selectedDatabase}
                        onChange={(e) => {
                          setSelectedDatabase(e.target.value);
                          setSelectedTable('');
                        }}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      >
                        <option value="">Select a database</option>
                        {databases.map((db) => (
                          <option key={db.id} value={db.name}>
                            {db.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Table Selection */}
                    <div className="mb-4">
                      <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                        <Table className="w-4 h-4 inline mr-2" />
                        Table
                      </label>
                      <select
                        value={selectedTable}
                        onChange={(e) => setSelectedTable(e.target.value)}
                        disabled={!selectedDatabase}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50"
                      >
                        <option value="">Select a table</option>
                        {tablesForDatabase.map((table) => (
                          <option key={table.id} value={table.name}>
                            {table.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Row Update Fields */}
                    {mode === 'rows' && selectedTable && (
                      <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            SET Clause <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={setClause}
                            onChange={(e) => setSetClause(e.target.value)}
                            placeholder="column1 = 'value1', column2 = 'value2'"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Example: name = &apos;John&apos;, age = 25
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            WHERE Clause (optional)
                          </label>
                          <input
                            type="text"
                            value={whereClause}
                            onChange={(e) => setWhereClause(e.target.value)}
                            placeholder="id = 1"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                          <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                            ⚠️ Without WHERE, all rows will be updated
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Column Update Fields */}
                    {mode === 'columns' && selectedTable && (
                      <div className="space-y-4 mt-6">
                        {/* Column Action */}
                        <div className="flex gap-2">
                          {(['add', 'modify', 'drop'] as ColumnAction[]).map((action) => (
                            <button
                              key={action}
                              type="button"
                              onClick={() => setColumnAction(action)}
                              className={`flex-1 py-2.5 px-4 rounded-xl font-medium capitalize transition-all ${
                                columnAction === action
                                  ? 'bg-yellow-500 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {action}
                            </button>
                          ))}
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                          {/* Column Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {columnAction === 'add' ? 'New Column Name' : 'Column Name'}
                            </label>
                            {columnAction === 'drop' ? (
                              <select
                                value={columnName}
                                onChange={(e) => setColumnName(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              >
                                <option value="">Select column to drop</option>
                                {selectedTableInfo?.columns.map((col) => (
                                  <option key={col.id} value={col.name}>
                                    {col.name} ({col.dataType})
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                value={columnName}
                                onChange={(e) => setColumnName(e.target.value)}
                                placeholder="Enter column name"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            )}
                          </div>

                          {/* New Column Name (for modify) */}
                          {columnAction === 'modify' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Column Name
                              </label>
                              <input
                                type="text"
                                value={newColumnName}
                                onChange={(e) => setNewColumnName(e.target.value)}
                                placeholder="Enter new column name"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                          )}

                          {/* Data Type (for add/modify) */}
                          {columnAction !== 'drop' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Data Type
                              </label>
                              <select
                                value={columnType}
                                onChange={(e) => setColumnType(e.target.value as DataType)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              >
                                {DATA_TYPES.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* Constraints (for add) */}
                          {columnAction === 'add' && (
                            <>
                              <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={columnConstraints.notNull}
                                    onChange={(e) =>
                                      setColumnConstraints((prev) => ({
                                        ...prev,
                                        notNull: e.target.checked,
                                      }))
                                    }
                                    className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                                  />
                                  <span className="text-sm text-gray-700">NOT NULL</span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={columnConstraints.unique}
                                    onChange={(e) =>
                                      setColumnConstraints((prev) => ({
                                        ...prev,
                                        unique: e.target.checked,
                                      }))
                                    }
                                    className="rounded border-gray-300 text-yellow-500 focus:ring-yellow-500"
                                  />
                                  <span className="text-sm text-gray-700">UNIQUE</span>
                                </label>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Default Value (optional)
                                </label>
                                <input
                                  type="text"
                                  value={columnConstraints.defaultValue}
                                  onChange={(e) =>
                                    setColumnConstraints((prev) => ({
                                      ...prev,
                                      defaultValue: e.target.value,
                                    }))
                                  }
                                  placeholder="Enter default value"
                                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Error/Success Messages */}
                    {error && (
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm">
                        {success}
                      </div>
                    )}

                    {/* Actions */}
                    <div className={`flex justify-end gap-3 mt-6 pt-4 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
                      <Button
                        variant="secondary"
                        onClick={() => (mode ? setMode(null) : handleClose())}
                        type="button"
                      >
                        {mode ? 'Back' : 'Cancel'}
                      </Button>
                      {mode && (
                        <Button
                          type="submit"
                          disabled={!selectedDatabase || !selectedTable || isLoading}
                          isLoading={isLoading}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          Execute Update
                        </Button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
