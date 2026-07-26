'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Presentation, Terminal, Menu } from 'lucide-react';

interface NavbarProps {
  onPresentationMode?: () => void;
  onTerminalMode?: () => void;
  showModeButtons?: boolean;
  theme?: any;
  onMobileMenuToggle?: () => void;
  selectedDatabaseName?: string | null;
}

export default function Navbar({
  onPresentationMode,
  onTerminalMode,
  showModeButtons = false,
  theme,
  onMobileMenuToggle,
  selectedDatabaseName,
}: NavbarProps) {
  const initialHeight = 64; // px (h-16)
  const maxExtra = 24; // max extra px to expand
  const expandScrollRange = 300; // px of scroll after which nav reaches full expansion

  const [height, setHeight] = useState<number>(initialHeight);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let lastHeight = initialHeight;

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        const extra = Math.min(y, expandScrollRange) / expandScrollRange * maxExtra;
        const newHeight = Math.round(initialHeight + extra);
        if (newHeight !== lastHeight) {
          lastHeight = newHeight;
          setHeight(newHeight);
        }
      });
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const extra = Math.max(0, height - initialHeight);
  const basePaddingTop = 12; // px
  const paddingTop = Math.round(basePaddingTop + extra * 0.6);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ height: `${height}px`, paddingTop: `${paddingTop}px`, paddingBottom: `12px` }}
      className={`${theme?.navbar || 'bg-white/95 border-gray-200/50'} backdrop-blur-2xl border-b px-4 sm:px-6 flex items-start justify-between shadow-lg shadow-gray-200/20 z-50 transition-[height,padding] duration-200 ease-out relative`}
    >
      {/* Logo and App Name */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center gap-2 sm:gap-3 min-w-0"
      >
        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-gray-900 to-black rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
          <svg
            className="w-5 sm:w-6 h-5 sm:h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <h1 className={`text-lg sm:text-xl font-light truncate ${theme?.text || 'text-gray-900'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Schema View
          </h1>
          <p className={`text-[10px] sm:text-xs font-light hidden sm:block ${theme?.textSecondary || 'text-gray-500'}`}>
            {/* PostgreSQL Workbench */}
          </p>
        </div>
      </motion.div>

      {/* Centered Database Name */}
      {selectedDatabaseName && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center"
          style={{ top: `${paddingTop}px` }}
        >
          <div className={`px-4 py-1.5 rounded-full ${theme?.buttonSecondary || 'bg-gray-100'} border ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'} shadow-sm flex items-center gap-2`}>
            <div className={`w-2 h-2 rounded-full ${theme?.navbar?.includes('slate') ? 'bg-emerald-400' : 'bg-emerald-500'}`}></div>
            <span className={`text-sm font-medium ${theme?.text || 'text-gray-900'} truncate max-w-[200px] lg:max-w-[300px]`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
              {selectedDatabaseName}
            </span>
          </div>
        </motion.div>
      )}

      {/* Right Side Actions */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-3"
      >
        {/* Mobile Menu Button */}
        {onMobileMenuToggle && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onMobileMenuToggle}
            className={`md:hidden p-2.5 rounded-lg ${theme?.buttonSecondary || 'bg-white hover:bg-gray-50 border-gray-200/80'} border transition-all`}
            aria-label="Toggle menu"
          >
            <Menu className={`w-5 h-5 ${theme?.text || 'text-gray-900'}`} />
          </motion.button>
        )}

        {/* Mode Buttons */}
        {showModeButtons && (
          <div className="flex items-center gap-2">
            {/* Terminal Mode */}
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onTerminalMode}
              className={`relative p-2.5 rounded-xl ${theme?.buttonSecondary || 'bg-white hover:bg-green-50 border-gray-200/80 hover:border-green-300'} border shadow-md shadow-gray-200/30 transition-all group`}
              aria-label="Terminal Mode"
            >
              <Terminal className={`w-5 h-5 ${theme?.text || 'text-gray-600'} group-hover:text-green-600 transition-colors`} />
              {/* Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-50">
                Switch to Terminal Mode
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-slate-900" />
              </div>
            </motion.button>

            {/* Presentation Mode */}
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPresentationMode}
              className={`relative p-2.5 rounded-xl ${theme?.buttonSecondary || 'bg-white hover:bg-blue-50 border-gray-200/80 hover:border-blue-300'} border shadow-md shadow-gray-200/30 transition-all group`}
              aria-label="Presentation Mode"
            >
              <Presentation className={`w-5 h-5 ${theme?.text || 'text-gray-600'} group-hover:text-blue-600 transition-colors`} />
              {/* Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-light rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-50">
                Switch to Presentation Mode
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-slate-900" />
              </div>
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.nav>
  );
}
