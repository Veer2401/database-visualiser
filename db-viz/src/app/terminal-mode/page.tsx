'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Terminal, Play, Loader2, Database, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

// Firebase
import { doc, onSnapshot, getDocs, query, collection, where, deleteDoc, updateDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Hooks and Types
import { useAuth } from '@/hooks/useAuth';
import { Database as DatabaseType, Column } from '@/types/database';

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

  // Transition animation
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setTransitionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2.5;
      });
    }, 75);

    const transitionTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 3500);

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
        const response = await fetch(`/api/database/list?userId=${user?.uid}`);
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
        
        // Add to history
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
      const response = await fetch('/api/query/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          database: database.name,
          query: queryText,
          userId: user?.uid,
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

              // Fetch table structure from PostgreSQL
              const describeResponse = await fetch('/api/query/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  database: currentDatabaseName,
                  query: `DESCRIBE \`${tableName}\``,
                  userId: user?.uid,
                }),
              });
              const describeResult = await describeResponse.json();

              if (describeResult.success && Array.isArray(describeResult.results)) {
                // Get foreign key information
                const fkResponse = await fetch('/api/query/execute', {
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

                // Create a map of column name -> foreign key reference
                const fkMap = new Map<string, { tableName: string; columnName: string }>();
                foreignKeys.forEach((fk: any) => {
                  fkMap.set(fk.COLUMN_NAME, {
                    tableName: fk.REFERENCED_TABLE_NAME,
                    columnName: fk.REFERENCED_COLUMN_NAME,
                  });
                });

                // Convert PostgreSQL column info to Column format
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

                  // Note: FK reference will need to be resolved in the dashboard
                  // by looking up the referenced table and column IDs
                  // For now, we mark isForeignKey but don't populate the reference

                  return column;
                });

                // Add table to Firebase
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

              // Find and delete the table from Firebase
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

              // Fetch updated table structure
              const describeResponse = await fetch('/api/query/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  database: currentDatabaseName,
                  query: `DESCRIBE \`${tableName}\``,
                  userId: user?.uid,
                }),
              });
              const describeResult = await describeResponse.json();

              if (describeResult.success && Array.isArray(describeResult.results)) {
                // Get foreign key information
                const fkResponse = await fetch('/api/query/execute', {
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

                // Create a map of column name -> foreign key reference
                const fkMap = new Map<string, { tableName: string; columnName: string }>();
                foreignKeys.forEach((fk: any) => {
                  fkMap.set(fk.COLUMN_NAME, {
                    tableName: fk.REFERENCED_TABLE_NAME,
                    columnName: fk.REFERENCED_COLUMN_NAME,
                  });
                });

                // Convert PostgreSQL column info to Column format
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

                  // Note: FK reference will need to be resolved in the dashboard
                  // by looking up the referenced table and column IDs

                  return column;
                });

                // Find and update the table in Firebase
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
          // Don't fail the query execution if Firebase sync fails
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
  }, [queryInput, database, user, isExecuting, databaseId]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Cmd/Ctrl + Enter to execute
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        executeQuery();
      }
      // Enter with semicolon at the end - auto-execute
      else if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        const currentQuery = queryInput.trim();
        // Check if the line being entered ends with a semicolon
        if (currentQuery.endsWith(';')) {
          e.preventDefault();
          // Execute the query without the trailing semicolon and newline
          const queryToRun = currentQuery.slice(0, -1).trim();
          if (queryToRun) {
            executeQuery(queryToRun);
            // Clear the input after execution
            setQueryInput('');
          }
        }
      }
    },
    [executeQuery, queryInput]
  );

  // Load query from history
  const loadFromHistory = (item: QueryHistoryItem) => {
    setQueryInput(item.query);
    textareaRef.current?.focus();
  };

  // Clear history
  const clearHistory = () => {
    setQueryHistory([]);
  };

  // Back to dashboard
  const handleBack = () => {
    router.push('/dashboard');
  };

  // Transition Screen
  if (isTransitioning) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          {/* Terminal Animation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative mb-8"
          >
            {/* Terminal Window */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="w-[450px] bg-slate-900 rounded-lg border border-slate-700 shadow-2xl overflow-hidden"
            >
              {/* Terminal Header */}
              <div className="h-8 bg-slate-800 flex items-center px-3 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-slate-400 font-mono">sql-terminal</span>
              </div>

              {/* Terminal Content */}
              <div className="p-4 font-mono text-sm">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-green-400 mb-2"
                >
                  postgres&gt; <span className="text-white">SELECT * FROM users;</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-slate-400"
                >
                  +----+----------+------------------+
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-slate-400"
                >
                  | id | name     | email            |
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-slate-400"
                >
                  +----+----------+------------------+
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="text-cyan-400"
                >
                  3 rows in set (0.02 sec)
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 1.6 }}
                  className="text-green-400 mt-2"
                >
                  postgres&gt; <span className="bg-green-400 text-slate-900 px-0.5">_</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3">
              <Terminal className="w-6 h-6 text-black" />
              <h2 className="text-4xl font-light text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Switching to Terminal Mode
              </h2>
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${transitionProgress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-black rounded-full"
              />
            </div>

          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="h-screen flex flex-col bg-slate-950"
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="h-16 bg-slate-900/80 backdrop-blur-2xl border-b border-slate-800 flex items-center justify-between px-6 z-50 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-light">Back to Dashboard</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-green-400" />
          <h1 className="text-2xl font-light text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Terminal Mode
          </h1>
          {database && (
            <span className="text-slate-400 text-sm font-light flex items-center gap-2">
              — <Database className="w-4 h-4" /> {database.name}
            </span>
          )}
        </div>

        <div className="w-40" />
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Query Editor */}
        <div className="flex-1 flex flex-col">
          {/* Query Input Area */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-slate-800"
          >
            <div className="bg-slate-900 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-3 text-slate-400 text-sm font-mono">SQL Query Editor</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">
                    Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">⌘</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">Enter</kbd> to execute
                  </span>
                  <span className="text-xs text-slate-600">|</span>
                  <span className="text-xs text-slate-500">
                    Separate queries with <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-400">;</kbd> to run multiple
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-800/50 flex flex-col items-center py-3 text-slate-600 text-xs font-mono rounded-l-lg">
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
                  placeholder="Enter your SQL query here..."
                  className="w-full h-40 pl-14 pr-4 py-3 bg-slate-800/30 border border-slate-700 rounded-lg text-slate-100 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50"
                  spellCheck={false}
                />
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-slate-500">
                  {queryInput.length} characters
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => executeQuery()}
                  disabled={isExecuting || !queryInput.trim()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors shadow-lg shadow-green-600/20"
                >
                  {isExecuting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Executing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Execute Query</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Output Area */}
          <motion.div
            ref={outputRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 overflow-auto bg-slate-950 p-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-slate-500" />
              <span className="text-slate-400 text-sm font-medium">Output</span>
            </div>

            {queryResult ? (
              <div className="font-mono text-sm">
                {queryResult.success ? (
                  <div className="space-y-3">
                    {/* Success indicator */}
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Query executed successfully</span>
                    </div>

                    {/* Results table */}
                    {queryResult.results && queryResult.results.length > 0 ? (
                      <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-slate-800/50 border-b border-slate-700">
                                {Object.keys(queryResult.results[0] as object).map((key) => (
                                  <th key={key} className="text-left py-3 px-4 text-slate-300 font-semibold text-xs uppercase tracking-wider">
                                    {key}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {queryResult.results.map((row, i) => (
                                <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                                  {Object.values(row as object).map((val, j) => (
                                    <td key={j} className="py-3 px-4 text-slate-400">
                                      {val === null ? (
                                        <span className="text-slate-600 italic">NULL</span>
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
                        <div className="px-4 py-2 bg-slate-800/30 border-t border-slate-800 text-slate-500 text-xs">
                          {queryResult.results.length} row{queryResult.results.length !== 1 ? 's' : ''} returned
                        </div>
                      </div>
                    ) : queryResult.affectedRows !== undefined ? (
                      <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 text-slate-400">
                        Query OK, {queryResult.affectedRows} row{queryResult.affectedRows !== 1 ? 's' : ''} affected
                      </div>
                    ) : (
                      <div className="bg-slate-900 rounded-lg border border-slate-800 p-4 text-slate-400">
                        Query executed with no results
                      </div>
                    )}

                    {/* Formatted output */}
                    {queryResult.formattedOutput && queryResult.formattedOutput.length > 0 && (
                      <div className="bg-slate-900 rounded-lg border border-slate-800 p-4">
                        {queryResult.formattedOutput.map((line, i) => (
                          <div key={i} className="text-slate-400">{line}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-400">
                      <XCircle className="w-4 h-4" />
                      <span>Query execution failed</span>
                    </div>
                    <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-4 text-red-400">
                      {queryResult.error}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-slate-600">
                <Terminal className="w-12 h-12 mb-4 opacity-50" />
                <p>Execute a query to see results here</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Query History Sidebar */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col"
        >
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-300">Query History</span>
            </div>
            {queryHistory.length > 0 && (
              <button
                onClick={clearHistory}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-500 hover:text-slate-300 transition-colors"
                title="Clear history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {queryHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-slate-600 text-sm">
                <Clock className="w-8 h-8 mb-2 opacity-50" />
                <p>No queries yet</p>
              </div>
            ) : (
              <div className="p-2 space-y-2">
                {queryHistory.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => loadFromHistory(item)}
                    className="w-full text-left p-3 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {item.success ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-500" />
                      )}
                      <span className="text-xs text-slate-500">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                      <span className="text-xs text-slate-600">
                        {item.duration}ms
                      </span>
                      {item.rowCount !== undefined && (
                        <span className="text-xs text-slate-600">
                          • {item.rowCount} rows
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 font-mono truncate group-hover:text-slate-300">
                      {item.query}
                    </p>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function TerminalModePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <TerminalModeContent />
    </Suspense>
  );
}
