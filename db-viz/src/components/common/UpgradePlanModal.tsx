'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

interface UpgradePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason: 'database' | 'table';
  theme?: any;
}

export default function UpgradePlanModal({
  isOpen,
  onClose,
  reason,
  theme,
}: UpgradePlanModalProps) {
  const router = useRouter();

  const title = reason === 'database' ? 'Database Limit Reached' : 'Table Limit Reached';
  const description = reason === 'database'
    ? "You've reached the maximum limit of 3 databases on the Free plan."
    : "You've reached the maximum limit of 10 tables per database on the Free plan.";

  const handleUpgrade = () => {
    onClose();
    router.push('/pricing');
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
            className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
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
                  <div className={`w-9 sm:w-11 h-9 sm:h-11 bg-orange-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Lock className="w-4 sm:w-5 h-4 sm:h-5 text-orange-600" />
                  </div>
                  <div className="min-w-0">
                    <h2 className={`text-base sm:text-lg font-light truncate ${theme?.text || 'text-gray-900'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      {title}
                    </h2>
                    <p className={`text-xs sm:text-sm font-light ${theme?.textSecondary || 'text-gray-500'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      Free Plan Limitation
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`p-1.5 sm:p-2 rounded-lg ${theme?.buttonSecondary || 'hover:bg-gray-100'} transition-all flex-shrink-0`}
                >
                  <X className={`w-5 h-5 sm:w-6 sm:h-6 ${theme?.textSecondary || 'text-gray-500'}`} />
                </motion.button>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 space-y-6">
                <p className={`text-sm sm:text-base ${theme?.text || 'text-gray-700'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                  {description}
                </p>

                <div className={`p-4 rounded-xl ${theme?.buttonSecondary || 'bg-gray-50'}`}>
                  <h4 className={`text-sm font-medium mb-2 ${theme?.text || 'text-gray-900'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                    Upgrade to Pro for:
                  </h4>
                  <ul className="space-y-2">
                    <li className={`flex items-center gap-2 text-sm ${theme?.textSecondary || 'text-gray-600'}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Unlimited databases &amp; tables
                    </li>
                    <li className={`flex items-center gap-2 text-sm ${theme?.textSecondary || 'text-gray-600'}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Full SQL terminal (read/write)
                    </li>
                    <li className={`flex items-center gap-2 text-sm ${theme?.textSecondary || 'text-gray-600'}`}>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Export to SQL, DOCX, PDF
                    </li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-2 sm:gap-3 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1 text-sm py-2 sm:py-3"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    className="flex-1"
                    onClick={handleUpgrade}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Upgrade Plan
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
