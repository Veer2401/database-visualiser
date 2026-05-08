'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Database,
  Table,
  ChevronRight,
  ChevronDown,
  Plus,
  FolderPlus,
  Play,
  FileText,
  Edit3,
  Trash2,
  PlusCircle,
  XCircle,
  Link,
  Unlink,
  Settings,
  LogOut,
  User,
  Terminal,
  Presentation,
} from 'lucide-react';
import { Database as DatabaseType, Table as TableType, User as UserType } from '@/types/database';

interface SidebarProps {
  databases: DatabaseType[];
  tables: TableType[];
  allTables: TableType[]; // All tables for counting across all databases
  selectedDatabaseId: string | null;
  selectedTableId: string | null;
  user: UserType | null;
  onSelectDatabase: (databaseId: string) => void;
  onSelectTable: (tableId: string) => void;
  onCreateDatabase: () => void;
  onCreateTable: () => void;
  onDeleteDatabase: (databaseId: string) => void;
  onDeleteTable: (tableId: string) => void;
  onQuickSQL: (type: 'CREATE' | 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'DROP') => void;
  onEditTable: (tableId: string) => void;
  onManageForeignKeys: () => void;
  onOpenSettings: () => void;
  onViewProfile: () => void;
  onTerminalMode: () => void;
  onPresentationMode: () => void;
  showModeButtons: boolean;
  onLogout: () => void;
  theme?: any;
}

export default function Sidebar({
  databases,
  tables,
  allTables,
  selectedDatabaseId,
  selectedTableId,
  user,
  onSelectDatabase,
  onSelectTable,
  onCreateDatabase,
  onCreateTable,
  onDeleteDatabase,
  onDeleteTable,
  onQuickSQL,
  onEditTable,
  onManageForeignKeys,
  onOpenSettings,
  onViewProfile,
  onTerminalMode,
  onPresentationMode,
  showModeButtons,
  onLogout,
  theme,
}: SidebarProps) {
  const [expandedDatabases, setExpandedDatabases] = useState<Set<string>>(new Set());

  const toggleDatabase = (dbId: string) => {
    setExpandedDatabases((prev) => {
      const next = new Set(prev);
      if (next.has(dbId)) {
        next.delete(dbId);
      } else {
        next.add(dbId);
      }
      return next;
    });
  };

  // Memoize table counts using allTables (all tables across all databases)
  const tableCountsByDatabase = useMemo(() => {
    const counts: Record<string, number> = {};
    databases.forEach((db) => {
      counts[db.id] = allTables.filter((t) => t.databaseId === db.id).length;
    });
    return counts;
  }, [databases, allTables]);

  const getTablesForDatabase = (databaseId: string) => {
    // Use allTables which contains tables from all databases
    // The dashboard filters 'tables' by selectedDatabaseId, but Sidebar needs to show
    // tables for any database being viewed, not just the currently selected one
    return allTables.filter((t) => t.databaseId === databaseId);
  };

  const sqlButtons = [
    { type: 'CREATE' as const, color: 'bg-black hover:bg-gray-900', icon: Plus },
    { type: 'INSERT' as const, color: 'bg-black hover:bg-gray-900', icon: PlusCircle },
    { type: 'SELECT' as const, color: 'bg-black hover:bg-gray-900', icon: FileText },
    { type: 'UPDATE' as const, color: 'bg-black hover:bg-gray-900', icon: Edit3 },
    { type: 'DELETE' as const, color: 'bg-black hover:bg-gray-900', icon: Trash2 },
    { type: 'DROP' as const, color: 'bg-black hover:bg-gray-900', icon: XCircle },
  ];

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className={`hidden md:flex w-60 lg:w-64 ${theme?.sidebar || 'bg-white/95 border-gray-200'} border-r flex-col h-full backdrop-blur-xl shadow-lg shadow-gray-200/10 overflow-hidden`}
    >
      {/* Header */}
      <div className={`p-4 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700 bg-slate-800' : 'border-gray-200/80 bg-gray-50/80'}`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className={`text-base font-medium ${theme?.text || 'text-gray-900'} tracking-tight`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Databases
          </h2>
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onCreateDatabase}
            className={`p-1.5 rounded-lg ${theme?.button || 'bg-black text-white hover:bg-gray-900'} transition-colors`}
            title="Create Database"
          >
            <FolderPlus className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Quick SQL Buttons */}
        <div className="grid grid-cols-3 gap-1.5 mb-3">
          {sqlButtons.map(({ type, color }, index) => (
            <motion.button
              key={type}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onQuickSQL(type)}
              className={`${color} text-white text-xs py-2.5 px-2 rounded-md flex items-center justify-center transition-colors touch-target`}
              style={{ fontFamily: 'var(--font-geist-sans)' }}
              title={type}
            >
              <span>{type}</span>
            </motion.button>
          ))}
        </div>

        {/* Foreign Key Management */}
        {selectedDatabaseId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`pt-3 border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200/80'}`}
          >
            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              onClick={onManageForeignKeys}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 ${theme?.buttonSecondary || 'bg-black hover:bg-gray-900 text-white'} rounded-lg text-sm transition-colors`}
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              <Link className="w-3.5 h-3.5" />
              <span>Foreign Keys</span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Database List */}
      <div className="flex-1 overflow-y-auto p-3">
        {databases.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className={`w-14 h-14 mx-auto ${theme?.buttonSecondary || 'bg-gray-100'} rounded-lg flex items-center justify-center mb-3 border ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
              <Database className={`w-7 h-7 ${theme?.textSecondary || 'text-gray-500'}`} />
            </div>
            <p className={`text-sm ${theme?.textSecondary || 'text-gray-600'} mb-3`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
              No databases yet
            </p>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCreateDatabase}
              className={`text-sm ${theme?.button || 'bg-black text-white hover:bg-gray-900'} px-4 py-2 rounded-lg transition-colors`}
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              Create database
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {databases.map((db) => {
              const isExpanded = expandedDatabases.has(db.id);
              const isSelected = selectedDatabaseId === db.id;
              const dbTables = getTablesForDatabase(db.id);

              return (
                <div key={db.id}>
                  {/* Database Item */}
                  <div
                    className={`
                      flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer group transition-colors
                      ${isSelected ? (theme?.buttonSecondary || 'bg-gray-100 border border-gray-200') : (theme?.navbar?.includes('slate') ? 'hover:bg-slate-800' : 'hover:bg-gray-50')}
                    `}
                    onClick={() => {
                      onSelectDatabase(db.id);
                      toggleDatabase(db.id);
                    }}
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ChevronRight className={`w-3.5 h-3.5 ${theme?.textSecondary || 'text-gray-500'}`} />
                    </motion.div>
                    <Database className={`w-3.5 h-3.5 ${isSelected ? (theme?.text || 'text-gray-900') : (theme?.textSecondary || 'text-gray-600')}`} />
                    <span className={`flex-1 text-sm truncate ${isSelected ? (theme?.text || 'text-gray-900') : (theme?.text || 'text-gray-800')}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      {db.name}
                    </span>
                    <span className={`text-xs ${theme?.textSecondary || 'text-gray-600'} ${theme?.buttonSecondary || 'bg-gray-200/60'} px-2 py-0.5 rounded-md`}>
                      {tableCountsByDatabase[db.id] || 0}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteDatabase(db.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded bg-white text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                      title="Delete Database"
                    >
                      <Trash2 className="w-3 h-3" />
                    </motion.button>
                  </div>

                  {/* Tables */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`ml-4 pl-3 border-l ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'} overflow-hidden mt-1`}
                      >
                        {dbTables.length === 0 ? (
                          <div className={`py-2 text-xs ${theme?.textSecondary || 'text-gray-500'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            No tables
                          </div>
                        ) : (
                          dbTables.map((table) => {
                            const isTableSelected = selectedTableId === table.id;
                            return (
                              <div
                                key={table.id}
                                onClick={() => onSelectTable(table.id)}
                                className={`
                                  flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer transition-colors group
                                  ${isTableSelected ? (theme?.buttonSecondary || 'bg-gray-100') : (theme?.navbar?.includes('slate') ? 'hover:bg-slate-800' : 'hover:bg-gray-50')}
                                `}
                              >
                                <Table className={`w-3 h-3 ${isTableSelected ? (theme?.text || 'text-gray-900') : (theme?.textSecondary || 'text-gray-500')}`} />
                                <span className={`flex-1 text-sm truncate ${isTableSelected ? (theme?.text || 'text-gray-900') : (theme?.text || 'text-gray-700')}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                  {table.name}
                                </span>
                                <span className={`text-[11px] ${theme?.textSecondary || 'text-gray-500'} ${theme?.buttonSecondary || 'bg-gray-100'} px-1.5 py-0.5 rounded`}>
                                  {table.columns.length}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEditTable(table.id);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 p-1 rounded bg-white text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                                  title="Edit Table"
                                >
                                  <Edit3 className="w-2.5 h-2.5" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteTable(table.id);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 p-1 rounded bg-white text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                                  title="Delete Table"
                                >
                                  <Trash2 className="w-2.5 h-2.5" />
                                </motion.button>
                              </div>
                            );
                          })
                        )}

                        {/* Add Table Button */}
                        {isSelected && (
                          <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={onCreateTable}
                            className={`flex items-center gap-2 w-full px-2 py-1.5 mt-1 rounded-md ${theme?.navbar?.includes('slate') ? 'text-slate-400 hover:bg-slate-800 border-slate-600' : 'text-gray-500 hover:bg-gray-50 border-gray-300'} transition-colors border border-dashed text-xs`}
                            style={{ fontFamily: 'var(--font-geist-sans)' }}
                          >
                            <Plus className="w-3 h-3" />
                            <span style={{ fontFamily: 'var(--font-geist-sans)' }}>Add table</span>
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Section - Mode Buttons, Settings and Profile */}
      <div className={`mt-auto border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200/80'}`}>
        {/* Terminal Mode Button */}
        {showModeButtons && (
          <button
            onClick={onTerminalMode}
            className={`w-full flex items-center gap-3 px-4 py-3 ${theme?.navbar?.includes('slate') ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-gray-50 text-gray-700'} transition-colors text-sm`}
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <Terminal className="w-4 h-4" />
            <span>Terminal Mode</span>
          </button>
        )}

        {/* Presentation Mode Button */}
        {showModeButtons && (
          <button
            onClick={onPresentationMode}
            className={`w-full flex items-center gap-3 px-4 py-3 ${theme?.navbar?.includes('slate') ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-gray-50 text-gray-700'} transition-colors text-sm`}
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <Presentation className="w-4 h-4" />
            <span>Presentation Mode</span>
          </button>
        )}

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className={`w-full flex items-center gap-3 px-4 py-3 ${theme?.navbar?.includes('slate') ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-gray-50 text-gray-700'} transition-colors text-sm`}
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>

        {/* User Profile - clickable to go to profile page */}
        {user && (
          <div className={`border-t ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200/80'}`}>
            <button
              onClick={onViewProfile}
              className={`w-full flex items-center gap-3 px-4 py-3 ${theme?.navbar?.includes('slate') ? 'hover:bg-slate-800' : 'hover:bg-gray-50'} transition-colors`}
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className={`w-8 h-8 rounded-full ${theme?.button || 'bg-gray-900'} flex items-center justify-center`}>
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
              <span className={`text-sm truncate flex-1 text-left ${theme?.text || 'text-gray-900'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                {user.displayName || user.email?.split('@')[0] || 'User'}
              </span>
              <ChevronRight className={`w-4 h-4 ${theme?.textSecondary || 'text-gray-400'}`} />
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  );
}