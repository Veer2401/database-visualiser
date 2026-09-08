'use client';

import React from 'react';
import { Menu, Database, Upload } from 'lucide-react';

interface NavbarProps {
  onPresentationMode?: () => void;
  onTerminalMode?: () => void;
  onComposerToggle?: () => void;
  isComposerOpen?: boolean;
  showModeButtons?: boolean;
  theme?: any;
  onMobileMenuToggle?: () => void;
  selectedDatabaseName?: string | null;
  tableCount?: number;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  onToggleTerminal?: () => void;
  isTerminalMinimized?: boolean;
  onExport?: () => void;
  onImport?: () => void;
}

export default function Navbar({
  onComposerToggle,
  isComposerOpen,
  theme,
  onMobileMenuToggle,
  selectedDatabaseName,
  tableCount,
  onToggleSidebar,
  isSidebarCollapsed,
  onToggleTerminal,
  isTerminalMinimized,
  onExport,
  onImport,
}: NavbarProps) {
  return (
    <nav className="h-16 bg-white/90 backdrop-blur-xl border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between z-30 relative shrink-0">
      {/* Brand Unit - Matching Landing Page Navbar */}
      <div className="flex items-center gap-3 min-w-0">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2.5 select-none">
          <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center shadow-sm">
            <Database className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Schema View
          </span>
        </div>
      </div>

      {/* Centered Import / Export Section (Shifted up to navbar, replacing green dot pill) */}
      {(onExport || onImport) && (
        <div className="hidden sm:flex items-center absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 p-1 rounded-full bg-gray-100/80 border border-gray-200/80 shadow-sm">
            {selectedDatabaseName && (
              <div className="px-3 py-1 text-xs text-gray-600 font-light select-none" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                <span className="font-medium text-black truncate max-w-[150px] inline-block align-middle">{selectedDatabaseName}</span>
                {tableCount !== undefined && (
                  <>
                    <span className="mx-1.5 text-gray-300">·</span>
                    <span>{tableCount} {tableCount === 1 ? 'table' : 'tables'}</span>
                  </>
                )}
              </div>
            )}

            {onExport && (
              <button
                onClick={onExport}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black text-white hover:bg-gray-800 text-xs font-medium transition-colors shadow-sm cursor-pointer"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
                title="Export SQL Schema"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Export</span>
              </button>
            )}

            {onImport && (
              <button
                onClick={onImport}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-gray-100 text-black border border-gray-200 text-xs font-medium transition-colors shadow-xs cursor-pointer"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
                title="Import SQL"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Import</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Right Side Layout Control Buttons (Sidebar, Terminal, DB Composer) */}
      <div className="flex items-center gap-2">
        {/* Toggle Sidebar (Left) */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
              !isSidebarCollapsed
                ? 'bg-black border-black text-white shadow-sm'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
            title={!isSidebarCollapsed ? "Collapse Sidebar" : "Expand Sidebar"}
            aria-label="Toggle Sidebar"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M12.5 1C13.881 1 15 2.119 15 3.5V12.5C15 13.881 13.881 15 12.5 15H3.5C2.119 15 1 13.881 1 12.5V3.5C1 2.119 2.119 1 3.5 1H12.5ZM12.5 14C13.328 14 14 13.328 14 12.5V3.5C14 2.672 13.328 2 12.5 2H7V14H12.5Z" />
            </svg>
          </button>
        )}

        {/* Toggle Docked Terminal (Bottom) */}
        {onToggleTerminal && (
          <button
            onClick={onToggleTerminal}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
              !isTerminalMinimized
                ? 'bg-black border-black text-white shadow-sm'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
            title={!isTerminalMinimized ? "Hide Terminal" : "Show Terminal"}
            aria-label="Toggle Terminal"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M15 12.5C15 13.881 13.881 15 12.5 15H3.5C2.119 15 1 13.881 1 12.5V3.5C1 2.119 2.119 1 3.5 1H12.5C13.881 1 15 2.119 15 3.5V12.5ZM2 10H14V3.5C14 2.672 13.328 2 12.5 2H3.5C2.672 2 2 2.672 2 3.5V10Z" />
            </svg>
          </button>
        )}

        {/* Toggle DB Composer (Right) */}
        {onComposerToggle && (
          <button
            onClick={onComposerToggle}
            className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
              isComposerOpen
                ? 'bg-black border-black text-white shadow-sm'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
            title={isComposerOpen ? "Close DB Composer" : "Open DB Composer"}
            aria-label="Toggle DB Composer"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M12.5 1C13.881 1 15 2.119 15 3.5V12.5C15 13.881 13.881 15 12.5 15H3.5C2.119 15 1 13.881 1 12.5V3.5C1 2.119 2.119 1 3.5 1H12.5ZM9 14V2H3.5C2.672 2 2 2.672 2 3.5V12.5C2 13.328 2.672 14 3.5 14H9Z" />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
}
