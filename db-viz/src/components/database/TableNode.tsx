'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { motion } from 'framer-motion';
import { Key, Link, Hash, Type, Calendar, ToggleLeft, FileJson, Trash2, ChevronRight } from 'lucide-react';
import { Table, Column, DataType } from '@/types/database';

interface TableNodeData {
  table: Table;
  onDelete: (tableId: string) => void;
  onViewData: (tableId: string, tableName: string) => void;
  isSelected: boolean;
  theme?: any;
}

const getTypeIcon = (dataType: DataType) => {
  if (['INT', 'BIGINT', 'SMALLINT', 'TINYINT', 'FLOAT', 'DOUBLE', 'DECIMAL'].includes(dataType)) {
    return <Hash className="w-3 h-3" />;
  }
  if (['VARCHAR', 'CHAR', 'TEXT', 'LONGTEXT'].includes(dataType)) {
    return <Type className="w-3 h-3" />;
  }
  if (['DATE', 'DATETIME', 'TIMESTAMP', 'TIME', 'YEAR'].includes(dataType)) {
    return <Calendar className="w-3 h-3" />;
  }
  if (dataType === 'BOOLEAN') {
    return <ToggleLeft className="w-3 h-3" />;
  }
  if (dataType === 'JSON') {
    return <FileJson className="w-3 h-3" />;
  }
  return <Type className="w-3 h-3" />;
};

function TableNode({ data, selected }: NodeProps<TableNodeData>) {
  const { table, onDelete, onViewData, isSelected, theme } = data;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative ${theme?.modal || 'bg-white'} rounded-xl overflow-visible
        shadow-lg hover:shadow-xl transition-shadow duration-300
        border-2 ${selected || isSelected ? (theme?.navbar?.includes('slate') ? 'border-blue-400' : 'border-blue-500') : (theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200')}
        min-w-[220px]
      `}
    >
      {/* Table Header */}
      <div className={`${theme?.button || 'bg-black'} px-4 py-3 flex items-center justify-between group rounded-t-xl`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full opacity-80" />
          <h3 className="text-white font-light text-sm tracking-wide" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            {table.name}
          </h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(table.id);
          }}
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/20 text-white transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Columns */}
      <div className={`divide-y ${theme?.navbar?.includes('slate') ? 'divide-slate-700' : 'divide-gray-100'} overflow-hidden`}>
        {table.columns.map((column, index) => (
          <div
            key={column.id}
            className={`relative px-4 py-2 flex items-center gap-3 ${theme?.navbar?.includes('slate') ? 'hover:bg-slate-700' : 'hover:bg-gray-50'} transition-colors`}
          >
            {/* Source Handle for FK */}
            {column.isForeignKey && (
              <Handle
                type="source"
                position={Position.Left}
                id={`${column.id}-source`}
                className="!w-3 !h-3 !bg-gray-800 !border-2 !border-white"
                style={{ left: -6 }}
              />
            )}

            {/* Column Info */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {column.isPrimaryKey && (
                <Key className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              )}
              {column.isForeignKey && (
                <Link className={`w-3.5 h-3.5 ${theme?.text || 'text-gray-700'} flex-shrink-0`} />
              )}
              <span className={`text-sm ${theme?.text || 'text-gray-900'} truncate font-light`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                {column.name}
              </span>
            </div>

            {/* Data Type */}
            <div className={`flex items-center gap-1.5 ${theme?.textSecondary || 'text-gray-600'}`}>
              {getTypeIcon(column.dataType)}
              <span className="text-xs font-mono">{column.dataType}</span>
            </div>

            {/* Constraints Badges */}
            <div className="flex gap-1">
              {column.isNotNull && (
                <span className={`text-[10px] px-1 py-0.5 ${theme?.buttonSecondary || 'bg-gray-200 text-gray-800'} rounded font-light`}>
                  NN
                </span>
              )}
              {column.isUnique && !column.isPrimaryKey && (
                <span className={`text-[10px] px-1 py-0.5 ${theme?.navbar?.includes('slate') ? 'bg-slate-600 text-white' : 'bg-gray-400 text-gray-800'} rounded font-light`}>
                  UQ
                </span>
              )}
            </div>

            {/* Target Handle for PK */}
            {column.isPrimaryKey && (
              <Handle
                type="target"
                position={Position.Right}
                id={`${column.id}-target`}
                className="!w-3 !h-3 !bg-amber-500 !border-2 !border-white"
                style={{ right: -6 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Table Footer */}
      <div className={`px-4 py-2 ${theme?.navbar?.includes('slate') ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'} border-t rounded-b-xl`}>
        <div className={`flex items-center justify-between text-xs ${theme?.textSecondary || 'text-gray-600'}`}>
          <span>{table.columns.length} columns</span>
          <span className="flex items-center gap-1">
            {table.columns.filter((c) => c.isPrimaryKey).length > 0 && (
              <span className="flex items-center gap-0.5">
                <Key className="w-3 h-3 text-amber-500" />
                {table.columns.filter((c) => c.isPrimaryKey).length}
              </span>
            )}
            {table.columns.filter((c) => c.isForeignKey).length > 0 && (
              <span className="flex items-center gap-0.5 ml-2">
                <Link className={`w-3 h-3 ${theme?.text || 'text-gray-700'}`} />
                {table.columns.filter((c) => c.isForeignKey).length}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* View Data Arrow Button */}
      <motion.button
        whileHover={{ scale: 1.1, x: 3 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onViewData(table.id, table.name);
        }}
        className={`absolute -right-5 top-1/2 -translate-y-1/2 w-8 h-8 ${theme?.button || 'bg-black hover:bg-gray-800 text-white'} rounded-full shadow-lg flex items-center justify-center transition-colors z-20`}
        title="View table data"
      >
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

// Custom comparison function for memo to check if table columns changed
const arePropsEqual = (prevProps: NodeProps<TableNodeData>, nextProps: NodeProps<TableNodeData>) => {
  // Always re-render if table or columns changed
  if (prevProps.data.table.columns.length !== nextProps.data.table.columns.length) {
    return false;
  }
  
  // Check if any column properties changed
  for (let i = 0; i < prevProps.data.table.columns.length; i++) {
    const prevCol = prevProps.data.table.columns[i];
    const nextCol = nextProps.data.table.columns[i];
    
    if (
      prevCol.name !== nextCol.name ||
      prevCol.dataType !== nextCol.dataType ||
      prevCol.isPrimaryKey !== nextCol.isPrimaryKey ||
      prevCol.isForeignKey !== nextCol.isForeignKey ||
      prevCol.isNotNull !== nextCol.isNotNull ||
      prevCol.isUnique !== nextCol.isUnique
    ) {
      return false;
    }
  }
  
  // Check other props
  return (
    prevProps.selected === nextProps.selected &&
    prevProps.data.isSelected === nextProps.data.isSelected &&
    prevProps.data.table.id === nextProps.data.table.id
  );
};

export default memo(TableNode, arePropsEqual);

