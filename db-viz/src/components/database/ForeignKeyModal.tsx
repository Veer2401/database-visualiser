'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link, Unlink, Key, ArrowRight, AlertCircle, Check, Database, Table as TableIcon } from 'lucide-react';
import Button from '@/components/common/Button';
import { Table as TableType, Column, areTypesCompatible } from '@/types/database';
import { formatFKDisplay } from '@/lib/fk-helpers';

interface ForeignKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  tables: TableType[];
  onAddForeignKey: (
    sourceTableId: string,
    sourceColumnId: string,
    targetTableId: string,
    targetColumnId: string
  ) => Promise<void>;
  onRemoveForeignKey: (tableId: string, columnId: string) => Promise<void>;
  databaseName: string;
  theme?: any;
}

type Mode = 'add' | 'remove';

export default function ForeignKeyModal({
  isOpen,
  onClose,
  tables,
  onAddForeignKey,
  onRemoveForeignKey,
  databaseName,
  theme,
}: ForeignKeyModalProps) {
  const [mode, setMode] = useState<Mode>('add');
  const [sourceTableId, setSourceTableId] = useState('');
  const [sourceColumnId, setSourceColumnId] = useState('');
  const [targetTableId, setTargetTableId] = useState('');
  const [targetColumnId, setTargetColumnId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSourceTableId('');
      setSourceColumnId('');
      setTargetTableId('');
      setTargetColumnId('');
      setError(null);
      setSuccess(null);
    }
  }, [isOpen]);

  // Reset column selections when table changes
  useEffect(() => {
    setSourceColumnId('');
  }, [sourceTableId]);

  useEffect(() => {
    setTargetColumnId('');
  }, [targetTableId]);

  // Get source table columns (excluding existing foreign keys in add mode)
  const sourceColumns = useMemo(() => {
    const table = tables.find((t) => t.id === sourceTableId);
    if (!table) return [];

    if (mode === 'add') {
      // Filter out columns that are already foreign keys
      return table.columns.filter((c) => !c.isForeignKey);
    } else {
      // For remove mode, show only foreign key columns
      return table.columns.filter((c) => c.isForeignKey);
    }
  }, [tables, sourceTableId, mode]);

  // Get target table columns (only primary keys for FK reference)
  const targetColumns = useMemo(() => {
    const table = tables.find((t) => t.id === targetTableId);
    if (!table) return [];
    return table.columns.filter((c) => c.isPrimaryKey);
  }, [tables, targetTableId]);

  // Get existing foreign keys for display
  const existingForeignKeys = useMemo(() => {
    const fks: Array<{
      sourceTable: TableType;
      sourceColumn: Column;
      targetTable: TableType | undefined;
      targetColumn: Column | undefined;
    }> = [];

    tables.forEach((table) => {
      table.columns.forEach((column) => {
        if (column.isForeignKey && column.foreignKeyReference) {
          const targetTable = tables.find(
            (t) => t.id === column.foreignKeyReference?.tableId
          );
          const targetColumn = targetTable?.columns.find(
            (c) => c.id === column.foreignKeyReference?.columnId
          );
          fks.push({
            sourceTable: table,
            sourceColumn: column,
            targetTable,
            targetColumn,
          });
        }
      });
    });

    return fks;
  }, [tables]);

  // Validate type compatibility
  const isTypeCompatible = useMemo(() => {
    if (!sourceColumnId || !targetColumnId) return true;

    const sourceTable = tables.find((t) => t.id === sourceTableId);
    const targetTable = tables.find((t) => t.id === targetTableId);
    const sourceColumn = sourceTable?.columns.find((c) => c.id === sourceColumnId);
    const targetColumn = targetTable?.columns.find((c) => c.id === targetColumnId);

    if (!sourceColumn || !targetColumn) return true;

    return areTypesCompatible(sourceColumn.dataType, targetColumn.dataType);
  }, [tables, sourceTableId, sourceColumnId, targetTableId, targetColumnId]);

  const handleAddForeignKey = async () => {
    if (!sourceTableId || !sourceColumnId || !targetTableId || !targetColumnId) {
      setError('Please select all required fields');
      return;
    }

    if (!isTypeCompatible) {
      setError('Data types are not compatible');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await onAddForeignKey(sourceTableId, sourceColumnId, targetTableId, targetColumnId);

      const sourceTable = tables.find((t) => t.id === sourceTableId);
      const sourceColumn = sourceTable?.columns.find((c) => c.id === sourceColumnId);
      const targetTable = tables.find((t) => t.id === targetTableId);
      const targetColumn = targetTable?.columns.find((c) => c.id === targetColumnId);

      setSuccess(
        `Foreign key added: ${sourceTable?.name}.${sourceColumn?.name} → ${targetTable?.name}.${targetColumn?.name}`
      );

      // Reset selections after success
      setSourceTableId('');
      setSourceColumnId('');
      setTargetTableId('');
      setTargetColumnId('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add foreign key');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveForeignKey = async () => {
    if (!sourceTableId || !sourceColumnId) {
      setError('Please select a table and column');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await onRemoveForeignKey(sourceTableId, sourceColumnId);

      const sourceTable = tables.find((t) => t.id === sourceTableId);
      const sourceColumn = sourceTable?.columns.find((c) => c.id === sourceColumnId);

      setSuccess(`Foreign key removed from ${sourceTable?.name}.${sourceColumn?.name}`);

      // Reset selections after success
      setSourceTableId('');
      setSourceColumnId('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove foreign key');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSourceTableId('');
    setSourceColumnId('');
    setTargetTableId('');
    setTargetColumnId('');
    setError(null);
    setSuccess(null);
    setMode('add');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto py-8"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`${theme?.modal || 'bg-white'} rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${theme?.buttonSecondary || 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                  <Link className={`w-5 h-5 ${theme?.text || 'text-gray-700'}`} />
                </div>
                <div>
                  <h2 className={`text-lg font-semibold ${theme?.text || 'text-black'}`}>
                    Manage Foreign Keys
                  </h2>
                  <p className={`text-sm ${theme?.textSecondary || 'text-gray-600'}`}>in {databaseName}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className={`p-2 rounded-lg ${theme?.buttonSecondary || 'hover:bg-gray-100'} transition-colors`}
              >
                <X className={`w-5 h-5 ${theme?.textSecondary || 'text-gray-600'}`} />
              </motion.button>
            </div>

            {/* Mode Toggle */}
            <div className={`p-4 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMode('add');
                    setSourceTableId('');
                    setSourceColumnId('');
                    setTargetTableId('');
                    setTargetColumnId('');
                    setError(null);
                    setSuccess(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${mode === 'add'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Link className="w-4 h-4" />
                  Add Foreign Key
                </button>
                <button
                  onClick={() => {
                    setMode('remove');
                    setSourceTableId('');
                    setSourceColumnId('');
                    setTargetTableId('');
                    setTargetColumnId('');
                    setError(null);
                    setSuccess(null);
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${mode === 'remove'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Unlink className="w-4 h-4" />
                  Remove Foreign Key
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* Error/Success Messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
                  >
                    <Check className="w-4 h-4 shrink-0" />
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>

              {tables.length < 2 && mode === 'add' && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  You need at least 2 tables to create a foreign key relationship.
                </div>
              )}

              {mode === 'add' ? (
                <>
                  {/* Source Table Selection */}
                  <div>
                    <label className={`block text-sm font-medium ${theme?.text || 'text-gray-700'} mb-2`}>
                      Source Table (where FK will be added)
                    </label>
                    <select
                      value={sourceTableId}
                      onChange={(e) => setSourceTableId(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    >
                      <option value="">Select source table...</option>
                      {tables.map((table) => (
                        <option key={table.id} value={table.id}>
                          {table.name} ({table.columns.length} columns)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Source Column Selection */}
                  {sourceTableId && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Source Column (to be foreign key)
                      </label>
                      {sourceColumns.length === 0 ? (
                        <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
                          No available columns. All columns may already be foreign keys.
                        </div>
                      ) : (
                        <select
                          value={sourceColumnId}
                          onChange={(e) => setSourceColumnId(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                        >
                          <option value="">Select source column...</option>
                          {sourceColumns.map((column) => (
                            <option key={column.id} value={column.id}>
                              {column.name} ({column.dataType})
                              {column.isPrimaryKey ? ' [PK]' : ''}
                            </option>
                          ))}
                        </select>
                      )}
                    </motion.div>
                  )}

                  {/* Visual Arrow */}
                  {sourceColumnId && (
                    <div className="flex justify-center py-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-8 h-0.5 bg-gray-300" />
                        <ArrowRight className="w-5 h-5" />
                        <div className="w-8 h-0.5 bg-gray-300" />
                      </div>
                    </div>
                  )}

                  {/* Target Table Selection */}
                  {sourceColumnId && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Table (referenced table)
                      </label>
                      <select
                        value={targetTableId}
                        onChange={(e) => setTargetTableId(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                      >
                        <option value="">Select target table...</option>
                        {tables
                          .filter((t) => t.id !== sourceTableId)
                          .filter((t) => t.columns.some((c) => c.isPrimaryKey))
                          .map((table) => (
                            <option key={table.id} value={table.id}>
                              {table.name} ({table.columns.filter((c) => c.isPrimaryKey).length} PK)
                            </option>
                          ))}
                      </select>
                    </motion.div>
                  )}

                  {/* Target Column Selection */}
                  {targetTableId && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Column (primary key to reference)
                      </label>
                      {targetColumns.length === 0 ? (
                        <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg">
                          No primary key columns found in this table.
                        </div>
                      ) : (
                        <select
                          value={targetColumnId}
                          onChange={(e) => setTargetColumnId(e.target.value)}
                          className={`w-full px-3 py-2.5 rounded-lg border text-sm bg-white text-black focus:ring-2 focus:ring-gray-500 focus:border-gray-500 ${!isTypeCompatible ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                          <option value="">Select target column...</option>
                          {targetColumns.map((column) => (
                            <option key={column.id} value={column.id}>
                              {column.name} ({column.dataType}) [PK]
                            </option>
                          ))}
                        </select>
                      )}
                      {!isTypeCompatible && (
                        <p className="text-xs text-red-500 mt-1">
                          Data types are not compatible. Source and target must have compatible types.
                        </p>
                      )}
                    </motion.div>
                  )}

                  {/* Preview */}
                  {sourceTableId && sourceColumnId && targetTableId && targetColumnId && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <p className="text-sm font-medium text-gray-800 mb-2">
                        Relationship Preview:
                      </p>
                      <div className="flex items-center justify-center gap-3 text-sm">
                        <div className="px-3 py-2 bg-white rounded-lg border border-gray-300">
                          <span className="font-medium text-gray-700">
                            {tables.find((t) => t.id === sourceTableId)?.name}
                          </span>
                          <span className="text-gray-600">
                            .{tables.find((t) => t.id === sourceTableId)?.columns.find((c) => c.id === sourceColumnId)?.name}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-500" />
                        <div className="px-3 py-2 bg-white rounded-lg border border-gray-300">
                          <span className="font-medium text-gray-700">
                            {tables.find((t) => t.id === targetTableId)?.name}
                          </span>
                          <span className="text-gray-600">
                            .{tables.find((t) => t.id === targetTableId)?.columns.find((c) => c.id === targetColumnId)?.name}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              ) : (
                <>
                  {/* Remove Mode */}
                  {existingForeignKeys.length === 0 ? (
                    <div className="text-center py-8">
                      <Unlink className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-sm text-gray-600">No foreign keys to remove</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Create some foreign key relationships first
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* Table Selection for Remove */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Table
                        </label>
                        <select
                          value={sourceTableId}
                          onChange={(e) => setSourceTableId(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Select table...</option>
                          {tables
                            .filter((t) => t.columns.some((c) => c.isForeignKey))
                            .map((table) => (
                              <option key={table.id} value={table.id}>
                                {table.name} ({table.columns.filter((c) => c.isForeignKey).length} FK)
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* Column Selection for Remove */}
                      {sourceTableId && sourceColumns.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Foreign Key to Remove
                          </label>
                          <select
                            value={sourceColumnId}
                            onChange={(e) => setSourceColumnId(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white text-black focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          >
                            <option value="">Select foreign key column...</option>
                            {sourceColumns.map((column) => (
                              <option key={column.id} value={column.id}>
                                {column.name} → {column.foreignKeyReference ? formatFKDisplay(column.foreignKeyReference, tables) : 'Unknown'}
                              </option>
                            ))}
                          </select>
                        </motion.div>
                      )}

                      {/* Existing FKs List */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Existing Foreign Keys
                        </label>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {existingForeignKeys.map((fk, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <TableIcon className="w-4 h-4 text-gray-500" />
                                <span className="font-medium text-gray-700">
                                  {fk.sourceTable.name}.{fk.sourceColumn.name}
                                </span>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600">
                                  {fk.targetTable?.name}.{fk.targetColumn?.name}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className={`flex items-center justify-end gap-3 p-4 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'} ${theme?.buttonSecondary || 'bg-gray-50'}`}>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              {mode === 'add' ? (
                <Button
                  onClick={handleAddForeignKey}
                  isLoading={isLoading}
                  disabled={
                    !sourceTableId ||
                    !sourceColumnId ||
                    !targetTableId ||
                    !targetColumnId ||
                    !isTypeCompatible
                  }
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  <Link className="w-4 h-4 mr-2" />
                  Add Foreign Key
                </Button>
              ) : (
                <Button
                  onClick={handleRemoveForeignKey}
                  isLoading={isLoading}
                  disabled={!sourceTableId || !sourceColumnId}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Unlink className="w-4 h-4 mr-2" />
                  Remove Foreign Key
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
