'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, AlertCircle, Loader2, Check } from 'lucide-react';
import Button from '@/components/common/Button';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (sqlContent: string, fileName: string) => Promise<void>;
  theme?: any;
}

export default function ImportModal({
  isOpen,
  onClose,
  onImport,
  theme = {},
}: ImportModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(null);

    // Validate file type
    if (!file.name.endsWith('.sql')) {
      setError('Only .sql files are supported');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      return;
    }

    setSelectedFile(file);
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setError('Please select a .sql file');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const fileContent = await selectedFile.text();
      
      // Validate that file contains SQL
      if (fileContent.trim().length === 0) {
        throw new Error('File is empty');
      }

      await onImport(fileContent, selectedFile.name);
      
      setSuccess(`Successfully imported from ${selectedFile.name}`);
      setSelectedFile(null);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import file');
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full max-w-md ${
              theme.modal || 'bg-white'
            } rounded-2xl shadow-2xl border ${
              theme.navbar?.includes('dark') ? 'border-slate-700' : 'border-gray-200'
            }`}
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between p-6 border-b ${
                theme.navbar?.includes('dark') ? 'border-slate-700' : 'border-gray-200'
              }`}
            >
              <h2
                className={`text-lg font-semibold ${
                  theme.text || 'text-gray-900'
                }`}
              >
                Import SQL File
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  theme.navbar?.includes('dark')
                    ? 'hover:bg-slate-800 text-slate-300'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* File Upload Area */}
              <div
                onClick={triggerFileInput}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  selectedFile
                    ? theme.navbar?.includes('dark')
                      ? 'border-green-600 bg-green-900/10'
                      : 'border-green-500 bg-green-50'
                    : theme.navbar?.includes('dark')
                    ? 'border-slate-600 hover:border-slate-500 hover:bg-slate-800/50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".sql"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isLoading}
                />

                <div className="flex flex-col items-center justify-center gap-2">
                  {selectedFile ? (
                    <>
                      <Check className={`w-8 h-8 ${
                        theme.navbar?.includes('dark')
                          ? 'text-green-500'
                          : 'text-green-600'
                      }`} />
                      <p
                        className={`text-sm font-medium ${
                          theme.navbar?.includes('dark')
                            ? 'text-green-400'
                            : 'text-green-700'
                        }`}
                      >
                        {selectedFile.name}
                      </p>
                      <p
                        className={`text-xs ${
                          theme.textSecondary || 'text-gray-500'
                        }`}
                      >
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className={`w-8 h-8 ${
                        theme.textSecondary || 'text-gray-400'
                      }`} />
                      <p
                        className={`text-sm font-medium ${
                          theme.text || 'text-gray-900'
                        }`}
                      >
                        Click to select a .sql file
                      </p>
                      <p
                        className={`text-xs ${
                          theme.textSecondary || 'text-gray-500'
                        }`}
                      >
                        or drag and drop (max 10MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    theme.navbar?.includes('dark')
                      ? 'bg-red-900/20 border border-red-800'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <AlertCircle
                    className={`w-4 h-4 mt-0.5 ${
                      theme.navbar?.includes('dark')
                        ? 'text-red-500'
                        : 'text-red-600'
                    }`}
                  />
                  <p
                    className={`text-sm ${
                      theme.navbar?.includes('dark')
                        ? 'text-red-300'
                        : 'text-red-700'
                    }`}
                  >
                    {error}
                  </p>
                </motion.div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    theme.navbar?.includes('dark')
                      ? 'bg-green-900/20 border border-green-800'
                      : 'bg-green-50 border border-green-200'
                  }`}
                >
                  <Check
                    className={`w-4 h-4 mt-0.5 ${
                      theme.navbar?.includes('dark')
                        ? 'text-green-500'
                        : 'text-green-600'
                    }`}
                  />
                  <p
                    className={`text-sm ${
                      theme.navbar?.includes('dark')
                        ? 'text-green-300'
                        : 'text-green-700'
                    }`}
                  >
                    {success}
                  </p>
                </motion.div>
              )}

              {/* Info Text */}
              <p
                className={`text-xs ${
                  theme.textSecondary || 'text-gray-500'
                }`}
              >
                The import will automatically detect database and table definitions. If no database is specified, a new one will be created.
              </p>
            </div>

            {/* Footer */}
            <div
              className={`flex gap-3 p-6 border-t ${
                theme.navbar?.includes('dark') ? 'border-slate-700' : 'border-gray-200'
              }`}
            >
              <button
                onClick={onClose}
                disabled={isLoading}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  theme.navbar?.includes('dark')
                    ? 'bg-slate-800 hover:bg-slate-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={isLoading || !selectedFile}
                className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2 transition-colors ${
                  isLoading || !selectedFile
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-900'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Import
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
