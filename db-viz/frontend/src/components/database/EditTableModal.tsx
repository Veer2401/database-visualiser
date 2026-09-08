'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Key, Link as LinkIcon } from 'lucide-react';
import { Table as TableType, Column } from '@/types/database';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface EditTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: TableType | null;
  onUpdate: (tableId: string, columns: Column[]) => void;
  existingTables: TableType[];
  theme?: any;
}

const dataTypes = [
  'INT',
  'VARCHAR',
  'TEXT',
  'DATE',
  'DATETIME',
  'BOOLEAN',
  'DECIMAL',
  'FLOAT',
  'DOUBLE',
  'BIGINT',
  'CHAR',
  'LONGTEXT',
  'TIMESTAMP',
  'TIME',
  'YEAR',
  'BLOB',
  'JSON',
];

export default function EditTableModal({
  isOpen,
  onClose,
  table,
  onUpdate,
  existingTables,
  theme,
}: EditTableModalProps) {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    if (table) {
      setColumns([...table.columns]);
    }
  }, [table]);

  const handleAddColumn = () => {
    const newColumn: Column = {
      id: `col_${Date.now()}`,
      name: '',
      dataType: 'VARCHAR',
      isPrimaryKey: false,
      isForeignKey: false,
      isNotNull: false,
      isUnique: false,
      defaultValue: '',
    };
    setColumns([...columns, newColumn]);
  };

  const handleRemoveColumn = (columnId: string) => {
    setColumns(columns.filter((col) => col.id !== columnId));
  };

  const handleColumnChange = (
    columnId: string,
    field: keyof Column,
    value: any
  ) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, [field]: value } : col
      )
    );
  };

  const handleSubmit = () => {
    if (!table) return;

    // Validate columns
    const hasEmptyNames = columns.some((col) => !col.name.trim());
    if (hasEmptyNames) {
      alert('All columns must have names');
      return;
    }

    // Check for duplicate names
    const names = columns.map((col) => col.name.toLowerCase());
    if (new Set(names).size !== names.length) {
      alert('Column names must be unique');
      return;
    }

    onUpdate(table.id, columns);
  };

  if (!isOpen || !table) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[90vh] ${theme?.modal || 'bg-white'} rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-6 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
              <div>
                <h2 className={`text-2xl font-bold ${theme?.text || 'text-black'}`}>Edit Table</h2>
                <p className={`text-sm ${theme?.textSecondary || 'text-gray-600'} mt-1`}>
                  Modify columns for <span className="font-semibold">{table.name}</span>
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`p-2 rounded-lg ${theme?.buttonSecondary || 'hover:bg-gray-100'} transition-colors`}
              >
                <X className={`w-5 h-5 ${theme?.textSecondary || 'text-gray-600'}`} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {/* Columns List */}
                {columns.map((column, index) => (
                  <motion.div
                    key={column.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        {/* Column Name */}
                        <Input
                          label={`Column ${index + 1} Name`}
                          value={column.name}
                          onChange={(e) =>
                            handleColumnChange(column.id, 'name', e.target.value)
                          }
                          placeholder="e.g., user_id"
                        />

                        {/* Data Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Data Type
                          </label>
                          <select
                            value={column.dataType}
                            onChange={(e) =>
                              handleColumnChange(column.id, 'dataType', e.target.value)
                            }
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 outline-none transition-colors"
                          >
                            {dataTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Constraints */}
                        <div className="col-span-2 flex flex-wrap gap-3">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={column.isPrimaryKey}
                              onChange={(e) =>
                                handleColumnChange(
                                  column.id,
                                  'isPrimaryKey',
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <span className="text-sm text-gray-700 flex items-center gap-1">
                              <Key className="w-3 h-3" />
                              Primary Key
                            </span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={column.isForeignKey}
                              onChange={(e) =>
                                handleColumnChange(
                                  column.id,
                                  'isForeignKey',
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <span className="text-sm text-gray-700 flex items-center gap-1">
                              <LinkIcon className="w-3 h-3" />
                              Foreign Key
                            </span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={column.isNotNull}
                              onChange={(e) =>
                                handleColumnChange(
                                  column.id,
                                  'isNotNull',
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <span className="text-sm text-gray-700">NOT NULL</span>
                          </label>

                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={column.isUnique}
                              onChange={(e) =>
                                handleColumnChange(
                                  column.id,
                                  'isUnique',
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <span className="text-sm text-gray-700">UNIQUE</span>
                          </label>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveColumn(column.id)}
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                        title="Remove Column"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}

                {/* Add Column Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddColumn}
                  className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Column
                </motion.button>
              </div>
            </div>

            {/* Footer */}
            <div className={`flex items-center justify-end gap-3 p-6 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={columns.length === 0}
              >
                Save Changes
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
