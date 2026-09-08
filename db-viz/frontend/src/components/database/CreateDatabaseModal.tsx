'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, AlertCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface CreateDatabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
  existingNames: string[];
  theme?: any;
}

export default function CreateDatabaseModal({
  isOpen,
  onClose,
  onCreate,
  existingNames,
  theme,
}: CreateDatabaseModalProps) {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateName = (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Database name is required';
    }
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(value)) {
      return 'Name must start with letter or underscore, and contain only letters, numbers, and underscores';
    }
    if (value.length > 64) {
      return 'Name must be 64 characters or less';
    }
    if (existingNames.some((n) => n.toLowerCase() === value.toLowerCase())) {
      return 'A database with this name already exists';
    }
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateName(name);

    if (nameError) {
      setErrors({ name: nameError });
      return;
    }

    setIsLoading(true);
    try {
      await onCreate(name);
      handleClose();
    } catch (error) {
      console.error('Error creating database:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setErrors({});
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`${theme?.modal || 'bg-white'} rounded-2xl shadow-xl w-full max-w-md overflow-hidden`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-4 sm:p-6 border-b ${theme?.navbar?.includes('slate') ? 'border-slate-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className={`w-9 sm:w-11 h-9 sm:h-11 ${theme?.button || 'bg-blue-600'} rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Database className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h2 className={`text-base sm:text-lg font-light truncate ${theme?.text || 'text-gray-900'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      Create Database
                    </h2>
                    <p className={`text-xs sm:text-sm font-light ${theme?.textSecondary || 'text-gray-500'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      Create a new MySQL database
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className={`p-1.5 sm:p-2 rounded-lg ${theme?.buttonSecondary || 'hover:bg-gray-100'} transition-all flex-shrink-0`}
                >
                  <X className={`w-5 h-5 sm:w-6 sm:h-6 ${theme?.textSecondary || 'text-gray-500'}`} />
                </motion.button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
                <Input
                  label="Database Name"
                  placeholder="my_database"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  error={errors.name}
                  leftIcon={<Database className="w-4 h-4" />}
                />

                {/* Info Box */}
                <div className={`flex items-start gap-2 sm:gap-3 p-3 sm:p-4 ${theme?.buttonSecondary || 'bg-blue-50 border-blue-200'} border rounded-lg sm:rounded-xl text-sm`}>
                  <AlertCircle className={`w-4 sm:w-5 h-4 sm:h-5 ${theme?.button?.includes('blue') ? 'text-blue-600' : theme?.text || 'text-blue-600'} mt-0.5 flex-shrink-0`} />
                  <p className={`font-light ${theme?.text || 'text-gray-700'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                    A new MySQL database will be created with this name.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1 text-sm py-2 sm:py-3"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                    isLoading={isLoading}
                  >
                    Create Database
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
