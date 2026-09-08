'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Table } from 'lucide-react';

interface CreateChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChoose: (choice: 'database' | 'table') => void;
  hasSelectedDatabase: boolean;
  theme?: any;
}

export default function CreateChoiceModal({
  isOpen,
  onClose,
  onChoose,
  hasSelectedDatabase,
  theme,
}: CreateChoiceModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md ${theme?.modal || 'bg-white'} rounded-2xl shadow-xl z-50 p-6`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${theme?.text || 'text-gray-900'}`}>What would you like to create?</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className={`p-2 rounded-lg ${theme?.buttonSecondary || 'hover:bg-gray-100'} transition-all`}
              >
                <X className={`w-5 h-5 ${theme?.textSecondary || 'text-gray-500'}`} />
              </motion.button>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {/* Create Database Option */}
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onChoose('database');
                  onClose();
                }}
                className={`group relative p-6 ${theme?.buttonSecondary || 'bg-gray-50 hover:bg-blue-50'} rounded-2xl hover:shadow-md transition-all duration-300 border-2 border-transparent ${theme?.button?.includes('blue') ? 'hover:border-blue-200' : 'hover:border-gray-300'}`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-16 h-16 ${theme?.button || 'bg-blue-600'} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Database className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center">
                    <h3 className={`font-semibold ${theme?.text || 'text-gray-900'} mb-1`}>Database</h3>
                    <p className={`text-xs ${theme?.textSecondary || 'text-gray-500'}`}>Create a new database</p>
                  </div>
                </div>
              </motion.button>

              {/* Create Table Option */}
              <motion.button
                whileHover={{ scale: hasSelectedDatabase ? 1.03 : 1, y: hasSelectedDatabase ? -2 : 0 }}
                whileTap={{ scale: hasSelectedDatabase ? 0.98 : 1 }}
                onClick={() => {
                  if (!hasSelectedDatabase) {
                    alert('Please select a database first');
                    return;
                  }
                  onChoose('table');
                  onClose();
                }}
                disabled={!hasSelectedDatabase}
                className={`group relative p-6 ${theme?.buttonSecondary || 'bg-gray-50'} rounded-2xl transition-all duration-300 ${
                  hasSelectedDatabase
                    ? `hover:shadow-md border-2 border-transparent ${theme?.button?.includes('emerald') || theme?.button?.includes('green') ? 'hover:border-emerald-200' : 'hover:border-green-200'}`
                    : 'opacity-50 cursor-not-allowed border-2 border-transparent'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
                    hasSelectedDatabase
                      ? `${theme?.button?.includes('emerald') ? 'bg-emerald-600' : 'bg-green-600'} group-hover:scale-110`
                      : `${theme?.navbar?.includes('slate') ? 'bg-slate-600' : 'bg-gray-300'}`
                  }`}>
                    <Table className={`w-8 h-8 ${
                      hasSelectedDatabase ? 'text-white' : `${theme?.textSecondary || 'text-gray-400'}`
                    }`} />
                  </div>
                  <div className="text-center">
                    <h3 className={`font-semibold ${theme?.text || 'text-gray-900'} mb-1`}>Table</h3>
                    <p className={`text-xs ${theme?.textSecondary || 'text-gray-500'}`}>
                      {hasSelectedDatabase ? 'Create a new table' : 'Select database first'}
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>

            {!hasSelectedDatabase && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 ${theme?.buttonSecondary || 'bg-yellow-50 border-yellow-200'} border rounded-xl`}
              >
                <p className={`text-sm ${theme?.text || 'text-yellow-800'} flex items-center gap-2`}>
                  <span className="text-lg">💡</span>
                  <span>Tip: Select a database from the sidebar to create tables</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
