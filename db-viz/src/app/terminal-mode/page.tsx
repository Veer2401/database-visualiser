'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Terminal, Play, Loader2, Database, Clock, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { doc, onSnapshot, getDocs, query, collection, where, deleteDoc, updateDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Hooks and Types
import { useAuth } from '@/hooks/useAuth';
import { Database as DatabaseType, Column } from '@/types/database';
import { authFetch } from '@/lib/api-client';

interface QueryHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  success: boolean;
  duration: number;
  rowCount?: number;
}

interface QueryResult {
  success: boolean;
  results?: unknown[];
  error?: string;
  formattedOutput?: string[];
  affectedRows?: number;
}

function TerminalModeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const databaseId = searchParams.get('db');
  const { user, loading: authLoading } = useAuth();

  // Loading state for transition
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Data State
  const [database, setDatabase] = useState<DatabaseType | null>(null);

  // Terminal State
  const [queryInput, setQueryInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Smooth snappy transition animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setTransitionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 60);

    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 700);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(transitionTimer);
    };
  }, []);

  // Auth redirect
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Firebase: Get database
  useEffect(() => {
    if (!user || !databaseId) return;

    const unsubscribe = onSnapshot(doc(db, 'databases', databaseId), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setDatabase({
          id: snapshot.id,
          name: data.name,
          userId: data.userId,
          db_password_hash: data.db_password_hash,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        });
      }
    });

    return () => unsubscribe();
  }, [user, databaseId]);

  // Execute query with proper query parsing and Firebase syncing
  const executeQuery = useCallback(async (queryToExecute?: string) => {
    const queryText = (queryToExecute || queryInput).trim();
    if (!queryText || !database || isExecuting) return;

    const upperQuery = queryText.toUpperCase();

    // Intercept SHOW DATABASES to only show user's databases
    if (upperQuery === 'SHOW DATABASES' || upperQuery === 'SHOW DATABASES;') {
      const startTime = Date.now();
      setIsExecuting(true);
      setQueryResult(null);
      
      try {
        const response = await authFetch(`/api/database/list`);
        const result = await response.json();
        const duration = Date.now() - startTime;
        
        if (result.success && result.databases) {
          const dbData = result.databases.map((db: { name: string }) => ({ Database: db.name }));
          
          setQueryResult({
            success: true,
            results: dbData,
          });
          
          // Add to history
          const historyItem: QueryHistoryItem = {
            id: Date.now().toString(),
            query: queryText,
            timestamp: new Date(),
            success: true,
            duration,
            rowCount: dbData.length,
          };
          setQueryHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
        } else {
          throw new Error(result.error || 'Failed to fetch databases');
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        setQueryResult({
          success: false,
          error: errorMsg,
        });
        
        const historyItem: QueryHistoryItem = {
          id: Date.now().toString(),
          query: queryText,
          timestamp: new Date(),
          success: false,
          duration: Date.now() - startTime,
        };
        setQueryHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
      } finally {
        setIsExecuting(false);
      }
      return;
    }

    // Check limits before executing CREATE TABLE
    if (/^CREATE\s+TABLE/i.test(upperQuery)) {
      const tablesSnap = await getDocs(
        query(collection(db, 'tables'), where('databaseId', '==', databaseId))
      );
      if (tablesSnap.size >= 10) {
        setQueryResult({
          success: false,
          error: 'Free plan limit reached. Maximum 10 tables allowed per database.',
        });
        
        const historyItem: QueryHistoryItem = {
          id: Date.now().toString(),
          query: queryText,
          timestamp: new Date(),
          success: false,
          duration: 0,
        };
        setQueryHistory((prev) => [historyItem, ...prev.slice(0, 49)]);
        return;
      }
    }

    const startTime = Date.now();
    setIsExecuting(true);
    setQueryResult(null);

    try {
      const response = await authFetch('/api/query/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          database: database.name,
          query: queryText,
        }),
      });

      const result: QueryResult = await response.json();
      const duration = Date.now() - startTime;

      setQueryResult(result);

      // Add to history
      const historyItem: QueryHistoryItem = {
        id: Date.now().toString(),
        query: queryText,
        timestamp: new Date(),
        success: result.success,
        duration,
        rowCount: result.results?.length || result.affectedRows,
      };
      setQueryHistory((prev) => [historyItem, ...prev.slice(0, 49)]);

      // Scroll output into view
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      // Firebase syncing for schema changes
      if (result.success && database && databaseId) {
        const upperQuery = queryText.toUpperCase();
        const currentDatabaseName = database.name;

        try {
          // Handle CREATE TABLE - sync new table to Firebase
          if (/^CREATE\s+TABLE/i.test(upperQuery)) {
            const match = queryText.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
            if (match && match[1]) {
              const tableName = match[1];

              const describeResponse = await authFetch('/api/query/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  database: currentDatabaseName,
                  query: `DESCRIBE \`${tableName}\``,
                }),
              });
              const describeResult = await describeResponse.json();

              if (describeResult.success && Array.isArray(describeResult.results)) {
                const fkResponse = await authFetch('/api/query/execute', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    database: 'information_schema',
                    query: `
                      SELECT 
                        COLUMN_NAME,
                        REFERENCED_TABLE_NAME,
                        REFERENCED_COLUMN_NAME
                      FROM KEY_COLUMN_USAGE
                      WHERE TABLE_SCHEMA = '${currentDatabaseName}'
                        AND TABLE_NAME = '${tableName}'
                        AND REFERENCED_TABLE_NAME IS NOT NULL
                    `,
                  }),
                });
                const fkResult = await fkResponse.json();
                const foreignKeys = fkResult.success && Array.isArray(fkResult.results) ? fkResult.results : [];

                const fkMap = new Map<string, { tableName: string; columnName: string }>();
                foreignKeys.forEach((fk: any) => {
                  fkMap.set(fk.COLUMN_NAME, {
                    tableName: fk.REFERENCED_TABLE_NAME,
                    columnName: fk.REFERENCED_COLUMN_NAME,
                  });
                });

                const columns: Column[] = describeResult.results.map((col: any) => {
                  const column: Column = {
                    id: uuidv4(),
                    name: col.Field,
                    dataType: col.Type,
                    isPrimaryKey: col.Key === 'PRI',
                    isNotNull: col.Null === 'NO',
                    isUnique: col.Key === 'UNI',
                    defaultValue: col.Default,
                    isForeignKey: col.Key === 'MUL' || fkMap.has(col.Field),
                  };
                  return column;
                });

                const tableId = uuidv4();
                await setDoc(doc(db, 'tables', tableId), {
                  name: tableName,
                  databaseId: databaseId,
                  columns,
                  position: { x: 100, y: 100 },
                  createdAt: Timestamp.now(),
                  updatedAt: Timestamp.now(),
                });
              }
            }
          }
          // Handle DROP TABLE - remove from Firebase
          else if (upperQuery.startsWith('DROP TABLE')) {
            const match = queryText.match(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
            if (match && match[1]) {
              const tableName = match[1];

              const tablesSnap = await getDocs(
                query(collection(db, 'tables'), where('databaseId', '==', databaseId))
              );
              tablesSnap.docs.forEach((tableDoc) => {
                if (tableDoc.data().name.toLowerCase() === tableName.toLowerCase()) {
                  deleteDoc(doc(db, 'tables', tableDoc.id));
                }
              });
            }
          }
          // Handle ALTER TABLE - update table structure in Firebase
          else if (upperQuery.startsWith('ALTER TABLE')) {
            const match = queryText.match(/ALTER\s+TABLE\s+[`"]?(\w+)[`"]?/i);
            if (match && match[1]) {
              const tableName = match[1];

              const describeResponse = await authFetch('/api/query/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  database: currentDatabaseName,
                  query: `DESCRIBE \`${tableName}\``,
                }),
              });
              const describeResult = await describeResponse.json();

              if (describeResult.success && Array.isArray(describeResult.results)) {
                const fkResponse = await authFetch('/api/query/execute', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    database: 'information_schema',
                    query: `
                      SELECT 
                        COLUMN_NAME,
                        REFERENCED_TABLE_NAME,
                        REFERENCED_COLUMN_NAME
                      FROM KEY_COLUMN_USAGE
                      WHERE TABLE_SCHEMA = '${currentDatabaseName}'
                        AND TABLE_NAME = '${tableName}'
                        AND REFERENCED_TABLE_NAME IS NOT NULL
                    `,
                  }),
                });
                const fkResult = await fkResponse.json();
                const foreignKeys = fkResult.success && Array.isArray(fkResult.results) ? fkResult.results : [];

                const fkMap = new Map<string, { tableName: string; columnName: string }>();
                foreignKeys.forEach((fk: any) => {
                  fkMap.set(fk.COLUMN_NAME, {
                    tableName: fk.REFERENCED_TABLE_NAME,
                    columnName: fk.REFERENCED_COLUMN_NAME,
                  });
                });

                const updatedColumns: Column[] = describeResult.results.map((col: any) => {
                  const column: Column = {
                    id: uuidv4(),
                    name: col.Field,
                    dataType: col.Type,
                    isPrimaryKey: col.Key === 'PRI',
                    isNotNull: col.Null === 'NO',
                    isUnique: col.Key === 'UNI',
                    defaultValue: col.Default,
                    isForeignKey: col.Key === 'MUL' || fkMap.has(col.Field),
                  };
                  return column;
                });

                const tablesSnap = await getDocs(
                  query(collection(db, 'tables'), where('databaseId', '==', databaseId))
                );
                tablesSnap.docs.forEach((tableDoc) => {
                  if (tableDoc.data().name.toLowerCase() === tableName.toLowerCase()) {
                    updateDoc(doc(db, 'tables', tableDoc.id), {
                      columns: updatedColumns,
                      updatedAt: Timestamp.now(),
                    });
                  }
                });
              }
            }
          }
        } catch (err) {
          console.error('Error syncing to Firebase:', err);
        }
      }
    } catch (error) {
      setQueryResult({
        success: false,
        error: error instanceof Error ? error.message : 'Query execution failed',
      });
    } finally {
      setIsExecuting(false);
    }
  }, [queryInput, database, isExecuting, databaseId]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        executeQuery();
      } else if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        const currentQuery = queryInput.trim();
        if (currentQuery.endsWith(';')) {
          e.preventDefault();
          const queryToRun = currentQuery.slice(0, -1).trim();
          if (queryToRun) {
            executeQuery(queryToRun);
            setQueryInput('');
          }
        }
      }
    },
    [executeQuery, queryInput]
  );

  const loadFromHistory = (item: QueryHistoryItem) => {
    setQueryInput(item.query);
    textareaRef.current?.focus();
  };

  const clearHistory = () => {
    setQueryHistory([]);
  };

  const handleBack = () => {
    router.push('/dashboard');
  };

  // Transition Screen - matching Landing Page aesthetic
  if (isTransitioning) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          {/* Landing-style Terminal Mockup */}
          <div
            className="w-[420px] rounded-2xl p-5 text-left mb-8 mx-auto"
            style={{
              background: 'linear-gradient(145deg, #262626 0%, #171717 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 40px -12px rgba(0,0,0,0.4)',
            }}
          >
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              <span className="ml-2 text-xs font-mono text-gray-400">terminal.sql</span>
            </div>
            <div className="font-mono text-xs space-y-1">
              <p className="text-gray-400">postgres&gt; <span className="text-white">SELECT * FROM users;</span></p>
              <p className="text-emerald-400">Connected to active schema</p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-light text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Opening Terminal
            </h2>
            <div className="w-48 h-1.5 bg-white/10 rounded-full mx-auto overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${transitionProgress}%` }}
                transition={{ duration: 0.2 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="h-screen flex flex-col bg-gray-950 text-white select-none"
    >
      {/* Top Header - Dark landing page language */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="h-16 bg-gray-950/90 backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between px-6 z-40"
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 text-white text-xs font-medium transition-colors"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </motion.button>

          <div className="h-4 w-px bg-white/10" />

          {/* Schema View Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Database className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="text-sm font-normal text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
              Terminal Mode
            </span>
          </div>
        </div>

        {/* Database Pill Tag */}
        {database && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
            <span>{database.name}</span>
          </div>
        )}

        <div className="w-28 flex justify-end" />
      </motion.header>

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor and Output column */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-white/[0.08]">
          {/* Query Editor Container */}
          <div
            className="p-5 border-b border-white/[0.08]"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-gray-400">SQL Query Editor</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                <span>Run with</span>
                <kbd className="px-2 py-0.5 rounded-md bg-white/10 border border-white/10 text-gray-300 font-mono text-[11px]">⌘+Enter</kbd>
                <span>or terminate with</span>
                <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/10 text-gray-300 font-mono text-[11px] font-bold">;</kbd>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/[0.08] bg-[#121212] overflow-hidden focus-within:border-white/20 transition-all">
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-white/[0.02] border-r border-white/[0.05] flex flex-col items-center py-3 text-gray-600 text-xs font-mono select-none">
                {queryInput.split('\n').map((_, i) => (
                  <div key={i} className="leading-6">{i + 1}</div>
                ))}
                {queryInput.split('\n').length === 0 && <div className="leading-6">1</div>}
              </div>
              <textarea
                ref={textareaRef}
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write SQL query, e.g. SELECT * FROM users; or CREATE TABLE items (...)"
                className="w-full h-36 pl-12 pr-4 py-3 bg-transparent text-gray-100 font-mono text-sm resize-none focus:outline-none placeholder:text-gray-600"
                spellCheck={false}
              />
            </div>

            <div className="flex items-center justify-between mt-3">
              <span className="text-xs font-light text-gray-500">
                {queryInput.length} chars
              </span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => executeQuery()}
                disabled={isExecuting || !queryInput.trim()}
                className="flex items-center gap-2 rounded-full !bg-white !text-black hover:!bg-gray-100 disabled:!bg-white/20 disabled:!text-white/40 disabled:cursor-not-allowed font-medium text-xs px-6 py-2.5 transition-all shadow-md"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                {isExecuting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 fill-current" />
                    <span>Run Query</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Results Output Section */}
          <div
            ref={outputRef}
            className="flex-1 overflow-auto p-5 bg-gray-950 font-mono text-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs uppercase tracking-wider font-medium text-gray-500" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Query Output
              </span>
            </div>

            {queryResult ? (
              <div>
                {queryResult.success ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Query executed successfully</span>
                    </div>

                    {queryResult.results && queryResult.results.length > 0 ? (
                      <div className="rounded-xl border border-white/[0.08] overflow-hidden bg-[#121212]">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs">
                            <thead>
                              <tr className="bg-white/[0.04] border-b border-white/[0.08]">
                                {Object.keys(queryResult.results[0] as object).map((key) => (
                                  <th key={key} className="py-2.5 px-4 text-gray-400 font-medium uppercase tracking-wider text-[11px]">
                                    {key}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                              {queryResult.results.map((row, i) => (
                                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                  {Object.values(row as object).map((val, j) => (
                                    <td key={j} className="py-2.5 px-4 text-gray-300">
                                      {val === null ? (
                                        <span className="text-gray-600 italic">NULL</span>
                                      ) : (
                                        String(val)
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.08] text-gray-500 text-xs font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                          {queryResult.results.length} {queryResult.results.length === 1 ? 'row' : 'rows'} returned
                        </div>
                      </div>
                    ) : queryResult.affectedRows !== undefined ? (
                      <div className="rounded-xl border border-white/[0.08] bg-[#121212] p-4 text-gray-400 text-xs font-mono">
                        Query OK, {queryResult.affectedRows} row{queryResult.affectedRows !== 1 ? 's' : ''} affected
                      </div>
                    ) : (
                      <div className="rounded-xl border border-white/[0.08] bg-[#121212] p-4 text-gray-400 text-xs font-mono">
                        Query executed with no results returned
                      </div>
                    )}

                    {queryResult.formattedOutput && queryResult.formattedOutput.length > 0 && (
                      <div className="rounded-xl border border-white/[0.08] bg-[#121212] p-4 text-gray-300 text-xs space-y-1">
                        {queryResult.formattedOutput.map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-red-400 font-medium" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      <XCircle className="w-4 h-4" />
                      <span>Query execution failed</span>
                    </div>
                    <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-4 text-red-300 text-xs font-mono">
                      {queryResult.error}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-gray-600">
                <Terminal className="w-8 h-8 mb-3 opacity-30" />
                <p className="text-xs font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>Execute a query above to see PostgreSQL results</p>
              </div>
            )}
          </div>
        </div>

        {/* History Sidebar */}
        <div className="w-80 bg-[#121212] flex flex-col shrink-0">
          <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Query History
              </span>
            </div>
            {queryHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="p-1.5 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors"
                title="Clear history"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {queryHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-600 text-xs font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                <Clock className="w-6 h-6 mb-2 opacity-30" />
                <p>No queries executed yet</p>
              </div>
            ) : (
              queryHistory.map((item) => (
                <button
                  key={item.id}
                  onClick={() => loadFromHistory(item)}
                  className="w-full text-left p-3 rounded-xl border border-white/[0.06] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.05] transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1.5 font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.success ? 'bg-emerald-400' : 'bg-red-400'}`} />
                      <span>{item.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <span>{item.duration}ms</span>
                  </div>
                  <p className="text-xs text-gray-300 font-mono truncate group-hover:text-white">
                    {item.query}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TerminalModePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-gray-950"><Loader2 className="w-8 h-8 text-white animate-spin" /></div>}>
      <TerminalModeContent />
    </Suspense>
  );
}
