'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Database,
  Table,
  ChevronRight,
  Plus,
  FolderPlus,
  FileText,
  Edit3,
  Trash2,
  PlusCircle,
  XCircle,
  Link,
  Settings,
  User,
  Terminal,
  Presentation,
} from 'lucide-react';
import { Database as DatabaseType, Table as TableType, User as UserType } from '@/types/database';

interface SidebarProps {
  databases: DatabaseType[];
  tables: TableType[];
  allTables: TableType[];
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
  isCollapsed?: boolean;
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
  isCollapsed = false,
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

  const tableCountsByDatabase = useMemo(() => {
    const counts: Record<string, number> = {};
    databases.forEach((db) => {
      counts[db.id] = allTables.filter((t) => t.databaseId === db.id).length;
    });
    return counts;
  }, [databases, allTables]);

  const getTablesForDatabase = (databaseId: string) => {
    return allTables.filter((t) => t.databaseId === databaseId);
  };

  const sqlButtons = [
    { type: 'CREATE' as const, label: 'CREATE' },
    { type: 'INSERT' as const, label: 'INSERT' },
    { type: 'SELECT' as const, label: 'SELECT' },
    { type: 'UPDATE' as const, label: 'UPDATE' },
    { type: 'DELETE' as const, label: 'DELETE' },
    { type: 'DROP' as const, label: 'DROP' },
  ];

  return (
    <aside
      style={{
        width: isCollapsed ? 64 : 260,
      }}
      className="hidden md:flex bg-white border-r border-gray-200 flex-col h-full overflow-hidden shrink-0 transition-[width] duration-200 ease-in-out select-none"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} ${isCollapsed ? 'mb-0' : 'mb-3'}`}>
          {!isCollapsed && (
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Databases
            </span>
          )}
          <button
            onClick={onCreateDatabase}
            className={`rounded-lg bg-black text-white hover:bg-gray-800 transition-colors ${isCollapsed ? 'p-2' : 'p-1.5'}`}
            title="Create Database"
          >
            <FolderPlus className={isCollapsed ? "w-4 h-4" : "w-3.5 h-3.5"} />
          </button>
        </div>

        {/* Quick SQL Buttons */}
        {!isCollapsed && (
          <div className="grid grid-cols-3 gap-1.5 mb-2">
            {sqlButtons.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => onQuickSQL(type)}
                className="py-1.5 px-1 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-[10px] font-medium text-gray-700 transition-colors text-center"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
                title={`Quick ${label}`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Foreign Key Management */}
        {selectedDatabaseId && !isCollapsed && (
          <div className="pt-2">
            <button
              onClick={onManageForeignKeys}
              className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-medium text-gray-700 transition-colors"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              <Link className="w-3 h-3" />
              <span>Foreign Keys</span>
            </button>
          </div>
        )}
      </div>

      {/* Database & Table List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {databases.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-10 h-10 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-3">
              <Database className="w-5 h-5 text-gray-400" />
            </div>
            {!isCollapsed && (
              <>
                <p className="text-xs font-light text-gray-500 mb-3" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                  No databases created
                </p>
                <button
                  onClick={onCreateDatabase}
                  className="text-xs rounded-full bg-black text-white hover:bg-gray-800 px-4 py-2 font-medium transition-colors"
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  Create database
                </button>
              </>
            )}
          </div>
        ) : (
          databases.map((db) => {
            const isExpanded = expandedDatabases.has(db.id);
            const isSelected = selectedDatabaseId === db.id;
            const dbTables = getTablesForDatabase(db.id);

            return (
              <div key={db.id} className="space-y-0.5">
                {/* Database Row */}
                <div
                  className={`
                    flex items-center gap-2 rounded-xl cursor-pointer group transition-all text-xs
                    ${isCollapsed ? 'justify-center p-2' : 'px-3 py-2'}
                    ${isSelected ? 'bg-black text-white shadow-sm font-medium' : 'text-gray-700 hover:bg-gray-100 font-light'}
                  `}
                  onClick={() => {
                    onSelectDatabase(db.id);
                    if (!isCollapsed) {
                      toggleDatabase(db.id);
                    }
                  }}
                  title={isCollapsed ? db.name : undefined}
                >
                  {!isCollapsed && (
                    <motion.div
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ChevronRight className={`w-3 h-3 ${isSelected ? 'text-white/70' : 'text-gray-400'}`} />
                    </motion.div>
                  )}
                  <Database className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 truncate" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                        {db.name}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {tableCountsByDatabase[db.id] || 0}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteDatabase(db.id);
                        }}
                        className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                          isSelected ? 'hover:bg-white/20 text-white' : 'hover:bg-gray-200 text-gray-500 hover:text-red-600'
                        }`}
                        title="Delete Database"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>

                {/* Nested Tables */}
                <AnimatePresence>
                  {isExpanded && !isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="ml-4 pl-3 border-l border-gray-200 overflow-hidden space-y-0.5 pt-0.5"
                    >
                      {dbTables.length === 0 ? (
                        <div className="py-1 text-[11px] font-light text-gray-400" style={{ fontFamily: 'var(--font-geist-sans)' }}>
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
                                flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors group text-xs
                                ${isTableSelected ? 'bg-gray-100 text-black font-medium' : 'text-gray-600 hover:bg-gray-50 font-light'}
                              `}
                            >
                              <Table className={`w-3 h-3 ${isTableSelected ? 'text-black' : 'text-gray-400'}`} />
                              <span className="flex-1 truncate" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                {table.name}
                              </span>
                              <span className="text-[10px] text-gray-400 font-light">
                                {table.columns.length}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditTable(table.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-gray-400 hover:text-black transition-opacity"
                                title="Edit Table"
                              >
                                <Edit3 className="w-2.5 h-2.5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteTable(table.id);
                                }}
                                className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-gray-400 hover:text-red-600 transition-opacity"
                                title="Delete Table"
                              >
                                <Trash2 className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          );
                        })
                      )}

                      {/* Add table shortcut */}
                      {isSelected && (
                        <button
                          onClick={onCreateTable}
                          className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-md border border-dashed border-gray-300 hover:border-gray-500 text-gray-500 hover:text-black text-[11px] font-light transition-colors mt-1"
                          style={{ fontFamily: 'var(--font-geist-sans)' }}
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add table</span>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Navigation: Mode Buttons, Settings, Profile */}
      <div className="mt-auto border-t border-gray-100 p-2 space-y-0.5">
        {/* Terminal Mode */}
        {showModeButtons && (
          <button
            onClick={onTerminalMode}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-2.5 px-3 py-2'} rounded-xl text-xs font-light text-gray-700 hover:bg-gray-100 hover:text-black transition-colors`}
            style={{ fontFamily: 'var(--font-geist-sans)' }}
            title={isCollapsed ? "Terminal Mode" : undefined}
          >
            <Terminal className="w-3.5 h-3.5 text-gray-500" />
            {!isCollapsed && <span>Terminal Mode</span>}
          </button>
        )}

        {/* Presentation Mode */}
        {showModeButtons && (
          <button
            onClick={onPresentationMode}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-2.5 px-3 py-2'} rounded-xl text-xs font-light text-gray-700 hover:bg-gray-100 hover:text-black transition-colors`}
            style={{ fontFamily: 'var(--font-geist-sans)' }}
            title={isCollapsed ? "Presentation Mode" : undefined}
          >
            <Presentation className="w-3.5 h-3.5 text-gray-500" />
            {!isCollapsed && <span>Presentation Mode</span>}
          </button>
        )}

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-2.5 px-3 py-2'} rounded-xl text-xs font-light text-gray-700 hover:bg-gray-100 hover:text-black transition-colors`}
          style={{ fontFamily: 'var(--font-geist-sans)' }}
          title={isCollapsed ? "Settings" : undefined}
        >
          <Settings className="w-3.5 h-3.5 text-gray-500" />
          {!isCollapsed && <span>Settings</span>}
        </button>

        {/* User Profile */}
        {user && (
          <div className="pt-1 border-t border-gray-100 mt-1">
            <button
              onClick={onViewProfile}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2' : 'gap-2.5 px-3 py-2'} rounded-xl hover:bg-gray-100 transition-colors text-left`}
              title={isCollapsed ? "Profile" : undefined}
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  width={22}
                  height={22}
                  className="w-5 h-5 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                  <User className="w-2.5 h-2.5" />
                </div>
              )}
              {!isCollapsed && (
                <span className="text-xs font-light text-gray-800 truncate flex-1" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                  {user.displayName || user.email?.split('@')[0] || 'Account'}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}