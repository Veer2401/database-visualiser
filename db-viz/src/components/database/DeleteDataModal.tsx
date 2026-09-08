'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Database, Table, Columns, Rows, AlertTriangle } from 'lucide-react';
import Button from '@/components/common/Button';
import { Database as DatabaseType, Table as TableType } from '@/types/database';

interface DeleteDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  databases: DatabaseType[];
  tables: TableType[];
  selectedDatabaseId: string | null;
  userId?: string;
  onExecuteQuery: (database: string, query: string) => Promise<{ success: boolean; error?: string }>;
  theme?: any;
}

type DeleteMode = 'rows' | 'columns';

export default function DeleteDataModal({
  isOpen,
  onClose,
  databases,
  tables,
  selectedDatabaseId,
  userId,
  onExecuteQuery,
  theme,
}: DeleteDataModalProps) {
  const [mode, setMode] = useState<DeleteMode | null>(null);
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [whereClause, setWhereClause] = useState('');
  const [columnName, setColumnName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

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

    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    let query = '';

    if (mode === 'rows') {
      query = `DELETE FROM "${selectedTable}"`;
      if (whereClause.trim()) {
        query += ` WHERE ${whereClause}`;
      }
    } else if (mode === 'columns') {
      if (!columnName.trim()) {
        setError('Column name is required');
        setIsLoading(false);
        return;
      }
      query = `ALTER TABLE "${selectedTable}" DROP COLUMN "${columnName}"`;
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
        setSuccess('Delete executed successfully');
        setTimeout(() => {
          handleClose();
        }, 1500);
      } else {
        setError(result.error || 'Failed to execute delete');
        setConfirmDelete(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute delete');
      setConfirmDelete(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setMode(null);
    setSelectedDatabase('');
    setSelectedTable('');
    setWhereClause('');
    setColumnName('');
    setError(null);
    setSuccess(null);
    setConfirmDelete(false);
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
              className={`${theme?.modal || 'bg-white'} rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-hidden mx-4`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-5 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-orange-600 rounded-xl flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${theme?.text || 'text-gray-900'}`}>Delete Data</h2>
                    <p className={`text-sm ${theme?.textSecondary || 'text-gray-500'}`}>Remove rows or columns</p>
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
              <div className="p-5 overflow-y-auto max-h-[60vh]">
                {/* Mode Selection */}
                {!mode && (
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">What do you want to delete?</p>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('rows')}
                        className="p-6 bg-gray-50 rounded-2xl hover:bg-orange-50 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-orange-200"
                      >
                        <div className="w-14 h-14 mx-auto mb-3 bg-orange-600 rounded-xl flex items-center justify-center">
                          <Rows className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="font-medium text-gray-900">Rows</h3>
                        <p className="text-sm text-gray-500 mt-1">Delete table rows</p>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('columns')}
                        className="p-6 bg-gray-50 rounded-2xl hover:bg-red-50 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-red-200"
                      >
                        <div className="w-14 h-14 mx-auto mb-3 bg-red-600 rounded-xl flex items-center justify-center">
                          <Columns className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="font-medium text-gray-900">Column</h3>
                        <p className="text-sm text-gray-500 mt-1">Drop a column</p>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Delete Form */}
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
                          setConfirmDelete(false);
                        }}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                        onChange={(e) => {
                          setSelectedTable(e.target.value);
                          setConfirmDelete(false);
                        }}
                        disabled={!selectedDatabase}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50"
                      >
                        <option value="">Select a table</option>
                        {tablesForDatabase.map((table) => (
                          <option key={table.id} value={table.name}>
                            {table.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Row Delete Fields */}
                    {mode === 'rows' && selectedTable && (
                      <div className="space-y-4 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            WHERE Clause (optional)
                          </label>
                          <input
                            type="text"
                            value={whereClause}
                            onChange={(e) => {
                              setWhereClause(e.target.value);
                              setConfirmDelete(false);
                            }}
                            placeholder="id = 1"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                          <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Without WHERE clause, ALL rows will be deleted!
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Column Delete Fields */}
                    {mode === 'columns' && selectedTable && (
                      <div className="space-y-4 mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Column to Drop
                          </label>
                          <select
                            value={columnName}
                            onChange={(e) => {
                              setColumnName(e.target.value);
                              setConfirmDelete(false);
                            }}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          >
                            <option value="">Select a column</option>
                            {selectedTableInfo?.columns.map((col) => (
                              <option key={col.id} value={col.name}>
                                {col.name} ({col.dataType})
                                {col.isPrimaryKey ? ' - PRIMARY KEY' : ''}
                              </option>
                            ))}
                          </select>
                          <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            This action cannot be undone!
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Confirmation Warning */}
                    {confirmDelete && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                      >
                        <div className="flex items-center gap-2 text-yellow-800 font-medium">
                          <AlertTriangle className="w-5 h-5" />
                          Are you sure?
                        </div>
                        <p className="text-sm text-yellow-700 mt-1">
                          Click the button again to confirm this destructive action.
                        </p>
                      </motion.div>
                    )}

                    {/* Error/Success Messages */}
                    {error && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                        {success}
                      </div>
                    )}

                    {/* Actions */}
                    <div className={`flex justify-end gap-3 mt-6 pt-4 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          if (confirmDelete) {
                            setConfirmDelete(false);
                          } else if (mode) {
                            setMode(null);
                          } else {
                            handleClose();
                          }
                        }}
                        type="button"
                      >
                        {confirmDelete ? 'Cancel' : mode ? 'Back' : 'Close'}
                      </Button>
                      {mode && (
                        <Button
                          type="submit"
                          variant="danger"
                          disabled={!selectedDatabase || !selectedTable || isLoading}
                          isLoading={isLoading}
                        >
                          {confirmDelete ? 'Confirm Delete' : 'Delete'}
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
