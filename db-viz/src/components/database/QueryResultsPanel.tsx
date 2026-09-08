'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

interface QueryResultsPanelProps {
  results: unknown[];
  query: string;
  onClose: () => void;
}

export default function QueryResultsPanel({ results, query, onClose }: QueryResultsPanelProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Get columns from first result
  const columns = useMemo(() => {
    if (results.length === 0) return [];
    return Object.keys(results[0] as object);
  }, [results]);

  // Paginate results
  const totalPages = Math.ceil(results.length / rowsPerPage);
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return results.slice(start, start + rowsPerPage);
  }, [results, currentPage, rowsPerPage]);

  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return 'NULL';
    if (value instanceof Date) return value.toLocaleString();
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-2xl border border-gray-200 z-10 max-h-96 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h3 className="font-semibold text-gray-800">Query Results</h3>
            <p className="text-xs text-gray-500 mt-1 font-mono">{query}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Results Table */}
        <div className="flex-1 overflow-auto p-4">
          {results.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No data found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-2 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedResults.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      {columns.map((col) => (
                        <td
                          key={col}
                          className="px-4 py-2 text-sm text-gray-600 whitespace-nowrap"
                        >
                          {formatValue((row as Record<string, unknown>)[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer with Pagination */}
        {results.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-600">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to{' '}
              {Math.min(currentPage * rowsPerPage, results.length)} of {results.length} rows
            </div>
            
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
