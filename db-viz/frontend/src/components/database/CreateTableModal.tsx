'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Table, Plus, Trash2, Key, Link, AlertCircle, Check } from 'lucide-react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Column, DataType, DATA_TYPES, Table as TableType, areTypesCompatible } from '@/types/database';
import { v4 as uuidv4 } from 'uuid';

interface CreateTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, columns: Column[]) => void;
  existingTables: TableType[];
  databaseName: string;
  onInsertData?: (database: string, table: string, values: Record<string, string>) => Promise<void>;
  theme?: any;
}

interface ColumnFormData {
  id: string;
  name: string;
  dataType: DataType;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  foreignKeyTableId: string;
  foreignKeyColumnId: string;
  isNotNull: boolean;
  isUnique: boolean;
  isAutoIncrement: boolean;
}

interface RowValues {
  [key: string]: string;
}

export default function CreateTableModal({
  isOpen,
  onClose,
  onCreate,
  existingTables,
  databaseName,
  onInsertData,
  theme,
}: CreateTableModalProps) {
  const [tableName, setTableName] = useState('');
  const [columns, setColumns] = useState<ColumnFormData[]>([
    {
      id: uuidv4(),
      name: '',
      dataType: 'INT',
      isPrimaryKey: false,
      isForeignKey: false,
      foreignKeyTableId: '',
      foreignKeyColumnId: '',
      isNotNull: false,
      isUnique: false,
      isAutoIncrement: false,
    },
  ]);
  const [wantsToAddData, setWantsToAddData] = useState(false);
  const [rows, setRows] = useState<RowValues[]>([{}]);
  const [errors, setErrors] = useState<{ tableName?: string; columns?: { [key: string]: string } }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateTableName = (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Table name is required';
    }
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
      return 'Invalid table name format';
    }
    if (existingTables.some((t) => t.name.toLowerCase() === value.toLowerCase())) {
      return 'A table with this name already exists';
    }
    return undefined;
  };

  const validateColumns = (): { [key: string]: string } => {
    const columnErrors: { [key: string]: string } = {};
    const primaryKeys = columns.filter((c) => c.isPrimaryKey);

    if (primaryKeys.length > 1) {
      primaryKeys.forEach((pk) => {
        columnErrors[`${pk.id}-pk`] = 'Only one primary key allowed per table';
      });
    }

    const columnNames = new Set<string>();
    columns.forEach((col) => {
      if (!col.name.trim()) {
        columnErrors[`${col.id}-name`] = 'Column name is required';
      } else if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(col.name)) {
        columnErrors[`${col.id}-name`] = 'Invalid column name';
      } else if (columnNames.has(col.name.toLowerCase())) {
        columnErrors[`${col.id}-name`] = 'Duplicate column name';
      } else {
        columnNames.add(col.name.toLowerCase());
      }

      if (col.isForeignKey) {
        if (!col.foreignKeyTableId) {
          columnErrors[`${col.id}-fk`] = 'Select a reference table';
        } else if (!col.foreignKeyColumnId) {
          columnErrors[`${col.id}-fk`] = 'Select a reference column';
        } else {
          const refTable = existingTables.find((t) => t.id === col.foreignKeyTableId);
          const refColumn = refTable?.columns.find((c) => c.id === col.foreignKeyColumnId);
          if (refColumn && !areTypesCompatible(col.dataType, refColumn.dataType)) {
            columnErrors[`${col.id}-fk`] = `Data type must be compatible with ${refColumn.dataType}`;
          }
          if (refColumn && !refColumn.isPrimaryKey) {
            columnErrors[`${col.id}-fk`] = 'Foreign key must reference a primary key';
          }
        }
      }
    });

    return columnErrors;
  };

  const addColumn = () => {
    setColumns([
      ...columns,
      {
        id: uuidv4(),
        name: '',
        dataType: 'INT',
        isPrimaryKey: false,
        isForeignKey: false,
        foreignKeyTableId: '',
        foreignKeyColumnId: '',
        isNotNull: false,
        isUnique: false,
        isAutoIncrement: false,
      },
    ]);
  };

  const removeColumn = (id: string) => {
    if (columns.length > 1) {
      setColumns(columns.filter((c) => c.id !== id));
    }
  };

  const updateColumn = (id: string, updates: Partial<ColumnFormData>) => {
    setColumns(columns.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    setErrors((prev) => ({ ...prev, columns: {} }));
  };

  const handlePrimaryKeyToggle = (id: string) => {
    setColumns(
      columns.map((c) => ({
        ...c,
        isPrimaryKey: c.id === id ? !c.isPrimaryKey : false,
        isNotNull: c.id === id && !c.isPrimaryKey ? true : c.isNotNull,
        isUnique: c.id === id && !c.isPrimaryKey ? true : c.isUnique,
        // Auto-enable auto increment for INT primary keys
        isAutoIncrement: c.id === id && !c.isPrimaryKey && ['INT', 'BIGINT', 'SMALLINT', 'TINYINT'].includes(c.dataType) ? true : c.isAutoIncrement,
      }))
    );
  };

  const getPrimaryKeyColumns = (tableId: string): Column[] => {
    const table = existingTables.find((t) => t.id === tableId);
    return table?.columns.filter((c) => c.isPrimaryKey) || [];
  };

  const addNewRow = () => {
    const initialRow: RowValues = {};
    columns.forEach((col) => {
      initialRow[col.name] = '';
    });
    setRows([...rows, initialRow]);
  };

  const removeRow = (index: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const updateRowValue = (rowIndex: number, field: string, value: string) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex] = { ...updatedRows[rowIndex], [field]: value };
    setRows(updatedRows);
  };

  const getPlaceholder = (col: ColumnFormData): string => {
    if (col.isPrimaryKey && col.dataType === 'INT') return 'Auto (leave empty)';
    if (col.isNotNull) return `Required`;
    return `NULL (optional)`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tableNameError = validateTableName(tableName);
    const columnErrors = validateColumns();

    if (tableNameError || Object.keys(columnErrors).length > 0) {
      setErrors({ tableName: tableNameError, columns: columnErrors });
      return;
    }

    setIsLoading(true);
    try {
      const formattedColumns: Column[] = columns.map((col) => {
        const column: Column = {
          id: col.id,
          name: col.name,
          dataType: col.dataType,
          isPrimaryKey: col.isPrimaryKey,
          isForeignKey: col.isForeignKey,
          isNotNull: col.isNotNull,
          isUnique: col.isUnique,
          isAutoIncrement: col.isAutoIncrement,
        };

        // Only add foreignKeyReference if it's a foreign key with valid references
        if (col.isForeignKey && col.foreignKeyTableId && col.foreignKeyColumnId) {
          const refTable = existingTables.find((t) => t.id === col.foreignKeyTableId);
          const refColumn = refTable?.columns.find((c) => c.id === col.foreignKeyColumnId);

          if (refTable && refColumn) {
            column.foreignKeyReference = {
              tableId: col.foreignKeyTableId,
              columnId: col.foreignKeyColumnId,
            };
          }
        }

        return column;
      });

      await onCreate(tableName, formattedColumns);

      // Insert data if user wants to add data
      if (wantsToAddData && rows.length > 0 && onInsertData && databaseName) {
        // Get primary key columns (they should be auto-increment and not included unless explicitly provided)
        const primaryKeyColumns = columns
          .filter(col => col.isPrimaryKey && col.name)
          .map(col => col.name);

        for (const rowValues of rows) {
          // Filter out empty primary key values (let them auto-increment)
          const filteredValues = { ...rowValues };
          primaryKeyColumns.forEach(pkCol => {
            if (!filteredValues[pkCol] || filteredValues[pkCol].trim() === '') {
              delete filteredValues[pkCol];
            }
          });

          // Only insert if at least one value is provided
          const hasValues = Object.values(filteredValues).some((v) => v !== '');
          if (hasValues) {
            await onInsertData(databaseName, tableName, filteredValues);
          }
        }
      }

      handleClose();
    } catch (error) {
      console.error('Error creating table:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTableName('');
    setColumns([
      {
        id: uuidv4(),
        name: '',
        dataType: 'INT',
        isPrimaryKey: false,
        isForeignKey: false,
        foreignKeyTableId: '',
        foreignKeyColumnId: '',
        isNotNull: false,
        isUnique: false,
        isAutoIncrement: false,
      },
    ]);
    setWantsToAddData(false);
    setRows([{}]);
    setErrors({});
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
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto p-4 py-8"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`${theme?.modal || 'bg-white'} rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-3 sm:p-4 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className={`w-9 sm:w-10 h-9 sm:h-10 ${theme?.buttonSecondary || 'bg-gray-100'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Table className={`w-4 sm:w-5 h-4 sm:h-5 ${theme?.text || 'text-gray-800'}`} />
                  </div>
                  <div className="min-w-0">
                    <h2 className={`text-base sm:text-lg font-light truncate ${theme?.text || 'text-black'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      Create Table
                    </h2>
                    <p className={`text-xs sm:text-sm font-light truncate ${theme?.textSecondary || 'text-gray-600'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      in {databaseName}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className={`p-1.5 sm:p-2 rounded-lg ${theme?.buttonSecondary || 'hover:bg-gray-100'} transition-colors flex-shrink-0`}
                >
                  <X className={`w-5 h-5 ${theme?.textSecondary || 'text-gray-600'}`} />
                </motion.button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-3 sm:p-4 space-y-4 max-h-[70vh] sm:max-h-[60vh] overflow-y-auto">
                <Input
                  label="Table Name"
                  placeholder="users"
                  value={tableName}
                  onChange={(e) => {
                    setTableName(e.target.value);
                    setErrors((prev) => ({ ...prev, tableName: undefined }));
                  }}
                  error={errors.tableName}
                  leftIcon={<Table className="w-4 h-4" />}
                />

                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <label className={`block text-xs sm:text-sm font-light ${theme?.text || 'text-gray-800'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      Columns
                    </label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={addColumn}
                      leftIcon={<Plus className="w-4 h-4" />}
                    >
                      Add Column
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {columns.map((column, index) => (
                      <motion.div
                        key={column.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 bg-gray-50 rounded-lg space-y-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Column name"
                              value={column.name}
                              onChange={(e) => updateColumn(column.id, { name: e.target.value })}
                              className={`w-full px-3 py-2 rounded-lg border text-sm
                                bg-white
                                text-black
                                border-gray-400
                                focus:ring-2 focus:ring-gray-600 focus:border-gray-600
                                ${errors.columns?.[`${column.id}-name`] ? 'border-red-500' : ''}
                              `}
                            />
                            {errors.columns?.[`${column.id}-name`] && (
                              <p className="text-xs text-red-500 mt-1">
                                {errors.columns[`${column.id}-name`]}
                              </p>
                            )}
                          </div>

                          <select
                            value={column.dataType}
                            onChange={(e) => updateColumn(column.id, { dataType: e.target.value as DataType })}
                            className="px-3 py-2 rounded-lg border text-sm
                              bg-white
                              text-black
                              border-gray-400
                              focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                          >
                            {DATA_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>

                          {columns.length > 1 && (
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeColumn(column.id)}
                              className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>

                        {/* Constraints */}
                        <div className="flex flex-wrap gap-2">
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePrimaryKeyToggle(column.id)}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors
                              ${column.isPrimaryKey
                                ? 'bg-amber-100 text-amber-700 border border-amber-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            <Key className="w-3 h-3" />
                            PK
                          </motion.button>

                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateColumn(column.id, { isForeignKey: !column.isForeignKey })}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors
                              ${column.isForeignKey
                                ? 'bg-gray-400 text-gray-900 border border-gray-500'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                          >
                            <Link className="w-3 h-3" />
                            FK
                          </motion.button>

                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateColumn(column.id, { isNotNull: !column.isNotNull })}
                            disabled={column.isPrimaryKey}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors
                              ${column.isNotNull
                                ? 'bg-gray-400 text-gray-900 border border-gray-500'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }
                              ${column.isPrimaryKey ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                          >
                            NOT NULL
                          </motion.button>

                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateColumn(column.id, { isUnique: !column.isUnique })}
                            disabled={column.isPrimaryKey}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors
                              ${column.isUnique
                                ? 'bg-gray-400 text-gray-900 border border-gray-500'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }
                              ${column.isPrimaryKey ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                          >
                            UNIQUE
                          </motion.button>

                          {/* Auto Increment - only for numeric types */}
                          {['INT', 'BIGINT', 'SMALLINT', 'TINYINT'].includes(column.dataType) && (
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateColumn(column.id, { isAutoIncrement: !column.isAutoIncrement })}
                              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors
                                ${column.isAutoIncrement
                                  ? 'bg-gray-400 text-gray-900 border border-gray-500'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }
                              `}
                            >
                              AI
                            </motion.button>
                          )}
                        </div>

                        {/* Foreign Key Reference */}
                        {column.isForeignKey && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex gap-2 pt-2 border-t border-gray-200"
                          >
                            <select
                              value={column.foreignKeyTableId}
                              onChange={(e) =>
                                updateColumn(column.id, {
                                  foreignKeyTableId: e.target.value,
                                  foreignKeyColumnId: '',
                                })
                              }
                              className="flex-1 px-3 py-2 rounded-lg border text-sm
                                bg-white
                                text-black
                                border-gray-400
                                focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
                            >
                              <option value="">Select table...</option>
                              {existingTables.map((table) => (
                                <option key={table.id} value={table.id}>
                                  {table.name}
                                </option>
                              ))}
                            </select>

                            <select
                              value={column.foreignKeyColumnId}
                              onChange={(e) =>
                                updateColumn(column.id, { foreignKeyColumnId: e.target.value })
                              }
                              disabled={!column.foreignKeyTableId}
                              className="flex-1 px-3 py-2 rounded-lg border text-sm
                                bg-white
                                text-black
                                border-gray-400
                                focus:ring-2 focus:ring-gray-600 focus:border-gray-600
                                disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <option value="">Select column...</option>
                              {getPrimaryKeyColumns(column.foreignKeyTableId).map((col) => (
                                <option key={col.id} value={col.id}>
                                  {col.name} ({col.dataType})
                                </option>
                              ))}
                            </select>
                          </motion.div>
                        )}

                        {errors.columns?.[`${column.id}-pk`] && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.columns[`${column.id}-pk`]}
                          </p>
                        )}
                        {errors.columns?.[`${column.id}-fk`] && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.columns[`${column.id}-fk`]}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Optional Data Insertion Section */}
                {onInsertData && databaseName && (
                  <div className="space-y-4 border-t border-gray-200 pt-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wantsToAddData}
                        onChange={(e) => setWantsToAddData(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                      />
                      <span>Add initial data to this table?</span>
                    </label>

                    {wantsToAddData && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        <p className="text-xs text-gray-500">
                          Leave fields empty to insert NULL values
                        </p>

                        {rows.map((rowValues, rowIndex) => (
                          <div
                            key={rowIndex}
                            className="p-3 bg-gray-50 rounded-lg space-y-2 border border-gray-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-gray-600">
                                Row {rowIndex + 1}
                              </span>
                              {rows.length > 1 && (
                                <motion.button
                                  type="button"
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => removeRow(rowIndex)}
                                  className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </motion.button>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {columns.map((column) => (
                                <div key={column.id} className="space-y-1">
                                  <label className="text-xs font-medium text-gray-700">
                                    {column.name}
                                    {column.isNotNull && (
                                      <span className="text-red-500 ml-1">*</span>
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    value={rowValues[column.name] || ''}
                                    onChange={(e) =>
                                      updateRowValue(rowIndex, column.name, e.target.value)
                                    }
                                    placeholder={getPlaceholder(column)}
                                    className="w-full px-2 py-1.5 text-sm rounded border
                                      bg-white text-black border-gray-300
                                      focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={addNewRow}
                          className="w-full py-2 px-4 rounded-lg border-2 border-dashed
                            border-gray-300 text-gray-600 hover:border-gray-400
                            hover:text-gray-700 transition-colors text-sm font-medium"
                        >
                          + Add Another Row
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                )}
              </form>

              {/* Actions */}
              <div className={`flex gap-3 p-4 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  isLoading={isLoading}
                  onClick={handleSubmit}
                >
                  Create Table
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
