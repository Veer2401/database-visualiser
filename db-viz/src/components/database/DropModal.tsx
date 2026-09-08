'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Database, Table, AlertTriangle } from 'lucide-react';
import Button from '@/components/common/Button';
import { Database as DatabaseType, Table as TableType } from '@/types/database';

interface DropModalProps {
  isOpen: boolean;
  onClose: () => void;
  databases: DatabaseType[];
  tables: TableType[];
  selectedDatabaseId: string | null;
  userId?: string;
  onDropDatabase: (databaseId: string) => Promise<void>;
  onDropTable: (database: string, tableName: string) => Promise<void>;
  theme?: any;
}

type DropMode = 'database' | 'table';

export default function DropModal({
  isOpen,
  onClose,
  databases,
  tables,
  selectedDatabaseId,
  userId,
  onDropDatabase,
  onDropTable,
  theme,
}: DropModalProps) {
  const [mode, setMode] = useState<DropMode | null>(null);
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDrop, setConfirmDrop] = useState(false);

  // Get tables for selected database
  const tablesForDatabase = tables.filter((t) => {
    const db = databases.find((d) => d.name === selectedDatabase);
    return db && t.databaseId === db.id;
  });

  // Get selected database object
  const selectedDbObject = databases.find((d) => d.name === selectedDatabase);

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

    if (mode === 'database') {
      if (!selectedDbObject) {
        setError('Please select a database');
        return;
      }

      if (!confirmDrop) {
        setConfirmDrop(true);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        await onDropDatabase(selectedDbObject.id);
        handleClose();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to drop database');
        setConfirmDrop(false);
      } finally {
        setIsLoading(false);
      }
    } else if (mode === 'table') {
      if (!selectedDatabase || !selectedTable) {
        setError('Please select a database and table');
        return;
      }

      // Drop table immediately without confirmation
      setIsLoading(true);
      setError(null);

      try {
        console.log('[DropModal] About to call onDropTable with:', {
          selectedDatabase,
          selectedTable,
          userId,
        });
        console.log('[DropModal] Available tables:', tables.map(t => ({
          name: t.name,
          databaseId: t.databaseId,
          id: t.id,
        })));
        console.log('[DropModal] Available databases:', databases.map(d => ({
          name: d.name,
          id: d.id,
        })));
        
        await onDropTable(selectedDatabase, selectedTable);
        handleClose();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to drop table');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleClose = () => {
    setMode(null);
    setSelectedDatabase('');
    setSelectedTable('');
    setError(null);
    setConfirmDrop(false);
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
              <div className={`flex items-center justify-between p-5 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'} bg-red-50`}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center">
                    <Trash2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className={`text-xl font-semibold ${theme?.text || 'text-gray-900'}`}>Drop</h2>
                    <p className="text-sm text-red-600 font-medium">⚠️ This action cannot be undone</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className={`p-2 rounded-lg ${theme?.buttonSecondary || 'hover:bg-red-100'} transition-all`}
                >
                  <X className={`w-5 h-5 ${theme?.textSecondary || 'text-gray-500'}`} />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-5 overflow-y-auto max-h-[60vh]">
                {/* Mode Selection */}
                {!mode && (
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">What do you want to drop?</p>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('database')}
                        className="p-6 bg-gray-50 rounded-2xl hover:bg-red-50 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-red-200"
                      >
                        <div className="w-14 h-14 mx-auto mb-3 bg-red-600 rounded-xl flex items-center justify-center">
                          <Database className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="font-medium text-gray-900">Database</h3>
                        <p className="text-sm text-gray-500 mt-1">Drop entire database</p>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMode('table')}
                        className="p-6 bg-gray-50 rounded-2xl hover:bg-orange-50 hover:shadow-md transition-all duration-300 border-2 border-transparent hover:border-orange-200"
                      >
                        <div className="w-14 h-14 mx-auto mb-3 bg-orange-600 rounded-xl flex items-center justify-center">
                          <Table className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="font-medium text-gray-900">Table</h3>
                        <p className="text-sm text-gray-500 mt-1">Drop a table</p>
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Drop Form */}
                {mode && (
                  <form onSubmit={handleSubmit}>
                    {/* Database Selection */}
                    <div className="mb-4">
                      <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                        <Database className="w-4 h-4 inline mr-2" />
                        {mode === 'database' ? 'Database to Drop' : 'Database'}
                      </label>
                      <select
                        value={selectedDatabase}
                        onChange={(e) => {
                          setSelectedDatabase(e.target.value);
                          setSelectedTable('');
                          setConfirmDrop(false);
                        }}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select a database</option>
                        {databases.map((db) => (
                          <option key={db.id} value={db.name}>
                            {db.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Table Selection (for table mode) */}
                    {mode === 'table' && (
                      <div className="mb-4">
                        <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                          <Table className="w-4 h-4 inline mr-2" />
                          Table to Drop
                        </label>
                        <select
                          value={selectedTable}
                          onChange={(e) => {
                            setSelectedTable(e.target.value);
                            setConfirmDrop(false);
                          }}
                          disabled={!selectedDatabase}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-50"
                        >
                          <option value="">Select a table</option>
                          {tablesForDatabase.map((table) => (
                            <option key={table.id} value={table.name}>
                              {table.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Warning */}
                    {((mode === 'database' && selectedDatabase) ||
                      (mode === 'table' && selectedTable)) && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl mb-4">
                        <div className="flex items-center gap-2 text-red-800 font-medium">
                          <AlertTriangle className="w-5 h-5" />
                          Warning
                        </div>
                        <p className="text-sm text-red-700 mt-1">
                          {mode === 'database'
                            ? `This will permanently delete the database "${selectedDatabase}" and ALL its tables and data.`
                            : `This will permanently delete the table "${selectedTable}" and ALL its data.`}
                        </p>
                      </div>
                    )}

                    {/* Confirmation - Only for database drops */}
                    {confirmDrop && mode === 'database' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                      >
                        <div className="flex items-center gap-2 text-yellow-800 font-medium">
                          <AlertTriangle className="w-5 h-5" />
                          Final Confirmation
                        </div>
                        <p className="text-sm text-yellow-700 mt-1">
                          Click the button again to permanently drop this {mode}.
                        </p>
                      </motion.div>
                    )}

                    {/* Error */}
                    {error && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Actions */}
                    <div className={`flex justify-end gap-3 mt-6 pt-4 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          if (confirmDrop) {
                            setConfirmDrop(false);
                          } else if (mode) {
                            setMode(null);
                          } else {
                            handleClose();
                          }
                        }}
                        type="button"
                      >
                        {confirmDrop && mode === 'database' ? 'Cancel' : mode ? 'Back' : 'Close'}
                      </Button>
                      {mode && (
                        <Button
                          type="submit"
                          variant="danger"
                          disabled={
                            isLoading ||
                            (mode === 'database' && !selectedDatabase) ||
                            (mode === 'table' && (!selectedDatabase || !selectedTable))
                          }
                          isLoading={isLoading}
                        >
                          {confirmDrop && mode === 'database' ? 'Confirm Drop' : `Drop ${mode === 'database' ? 'Database' : 'Table'}`}
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
