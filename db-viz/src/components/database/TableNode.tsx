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
    <div
      className={`
        relative ${theme?.modal || 'bg-white'} rounded-xl overflow-visible
        shadow-sm hover:shadow-md transition-all duration-150
        border ${selected || isSelected ? 'border-[#2c5d88] ring-2 ring-[#2c5d88]/20' : 'border-slate-200 hover:border-slate-300'}
        w-[280px]
      `}
    >
      {/* Table Header - Steel Blue as in Reference Image */}
      <div className="bg-[#2c5d88] px-3.5 py-2.5 flex items-center justify-between group rounded-t-xl">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 bg-blue-200 rounded-full opacity-90 flex-shrink-0" />
          <h3 className="text-white font-semibold text-xs tracking-wide truncate" style={{ fontFamily: 'var(--font-geist-sans)' }}>
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
          className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/20 text-white/80 hover:text-white transition-all flex-shrink-0"
          title="Delete table"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* Columns */}
      <div className={`divide-y ${theme?.navbar?.includes('slate') ? 'divide-slate-700' : 'divide-slate-100'} overflow-hidden`}>
        {table.columns.map((column) => (
          <div
            key={column.id}
            className={`relative px-3.5 py-2 flex items-center gap-2.5 ${theme?.navbar?.includes('slate') ? 'hover:bg-slate-700' : 'hover:bg-slate-50'} transition-colors`}
          >
            {/* Target Handle for FK (Left side - accepts relationship from parent PK) */}
            {column.isForeignKey && (
              <Handle
                type="target"
                position={Position.Left}
                id={`${column.id}-target`}
                className="!w-2.5 !h-2.5 !bg-white !border-2 !border-[#94a3b8] hover:!border-[#2c5d88] hover:!bg-blue-50 transition-colors z-10"
                style={{ left: -5 }}
              />
            )}

            {/* Column Info */}
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              {column.isPrimaryKey && (
                <Key className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              )}
              {column.isForeignKey && (
                <Link className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              )}
              <span className={`text-xs ${theme?.text || 'text-slate-800'} truncate font-medium`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                {column.name}
              </span>
            </div>

            {/* Data Type */}
            <div className={`flex items-center gap-1 text-slate-500`}>
              {getTypeIcon(column.dataType)}
              <span className="text-[11px] font-mono">{column.dataType}</span>
            </div>

            {/* Constraints Badges */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {column.isNotNull && (
                <span className="text-[10px] font-mono px-1 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">
                  NN
                </span>
              )}
              {column.isUnique && !column.isPrimaryKey && (
                <span className="text-[10px] font-mono px-1 py-0.5 bg-slate-100 text-slate-600 rounded font-medium">
                  UQ
                </span>
              )}
            </div>

            {/* Source Handle for PK / Unique (Right side - sends relationship to child FK) */}
            {(column.isPrimaryKey || column.isUnique) && (
              <Handle
                type="source"
                position={Position.Right}
                id={`${column.id}-source`}
                className="!w-2.5 !h-2.5 !bg-white !border-2 !border-[#94a3b8] hover:!border-[#2c5d88] hover:!bg-blue-50 transition-colors z-10"
                style={{ right: -5 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Table Footer */}
      <div className={`px-3.5 py-2 ${theme?.navbar?.includes('slate') ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'} border-t rounded-b-xl`}>
        <div className={`flex items-center justify-between text-xs ${theme?.textSecondary || 'text-slate-500'}`}>
          <span>{table.columns.length} columns</span>
          <span className="flex items-center gap-1">
            {table.columns.filter((c) => c.isPrimaryKey).length > 0 && (
              <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                <Key className="w-3 h-3 text-amber-500" />
                {table.columns.filter((c) => c.isPrimaryKey).length}
              </span>
            )}
            {table.columns.filter((c) => c.isForeignKey).length > 0 && (
              <span className="flex items-center gap-0.5 ml-2 text-blue-600 font-medium">
                <Link className="w-3 h-3 text-blue-500" />
                {table.columns.filter((c) => c.isForeignKey).length}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* View Data Arrow Button */}
      <motion.button
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation();
          onViewData(table.id, table.name);
        }}
        className={`absolute -right-4 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#2c5d88] hover:bg-[#234b6e] text-white rounded-full shadow-md flex items-center justify-center transition-colors z-20`}
        title="View table data"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </motion.button>
    </div>
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

