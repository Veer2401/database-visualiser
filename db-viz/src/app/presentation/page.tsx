'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  useNodesState,
  useEdgesState,
  NodeChange,
  applyNodeChanges,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Presentation, Monitor, Loader2 } from 'lucide-react';

// Firebase
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Components
import TableNode from '@/components/database/TableNode';
import RelationshipEdge from '@/components/database/RelationshipEdge';

// Hooks and Types
import { useAuth } from '@/hooks/useAuth';
import { useWorkflowLayouts } from '@/hooks/useWorkflowLayouts';
import {
  Database as DatabaseType,
  Table as TableType,
} from '@/types/database';

// Node and Edge types for React Flow
const nodeTypes = {
  tableNode: TableNode,
};

const edgeTypes = {
  relationshipEdge: RelationshipEdge,
};

function PresentationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const databaseId = searchParams.get('db');
  const themeParam = searchParams.get('theme') || 'light';
  const { user, loading: authLoading } = useAuth();

  // Loading state for transition
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [transitionProgress, setTransitionProgress] = useState(0);

  // Theme definitions
  const THEMES = {
    light: { bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100' },
    dark: { bg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' },
    blue: { bg: 'bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50' },
    purple: { bg: 'bg-gradient-to-br from-purple-50 via-purple-100 to-pink-50' },
    green: { bg: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100' },
  };

  // Data State
  const [database, setDatabase] = useState<DatabaseType | null>(null);
  const [tables, setTables] = useState<TableType[]>([]);

  // Query results for table data display
  const [queryResults, setQueryResults] = useState<{ results: unknown[]; query: string; tableName: string } | null>(null);

  // React Flow state
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);

  // Workflow layouts for position persistence
  const {
    layouts: workflowLayouts,
    updateTablePosition: saveTablePosition,
    isLoading: layoutsLoading,
  } = useWorkflowLayouts({
    userId: user?.uid,
    databaseId: databaseId,
  });

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

  // Firebase: Subscribe to tables
  useEffect(() => {
    if (!databaseId) {
      setTables([]);
      return;
    }

    const q = query(collection(db, 'tables'), where('databaseId', '==', databaseId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tbls: TableType[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        tbls.push({
          id: doc.id,
          name: data.name,
          databaseId: data.databaseId,
          columns: data.columns || [],
          position: data.position || { x: 100, y: 100 },
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        });
      });
      setTables(tbls);
    });

    return () => unsubscribe();
  }, [databaseId]);

  // Convert foreign key relationships to edges
  useEffect(() => {
    const newEdges: Edge[] = [];

    tables.forEach((table) => {
      table.columns.forEach((column) => {
        if (column.isForeignKey && column.foreignKeyReference) {
          const targetTable = tables.find((t) => t.id === column.foreignKeyReference?.tableId);
          const targetColumn = targetTable?.columns.find(
            (c) => c.id === column.foreignKeyReference?.columnId
          );

          if (targetTable && targetColumn) {
            newEdges.push({
              id: `${table.id}-${column.id}-${targetTable.id}-${targetColumn.id}`,
              source: table.id,
              target: targetTable.id,
              sourceHandle: `${column.id}-source`,
              targetHandle: `${targetColumn.id}-target`,
              type: 'relationshipEdge',
              animated: false,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#475569',
                width: 20,
                height: 20,
              },
              data: {
                sourceColumn: column.name,
                targetColumn: targetColumn.name,
              },
            });
          }
        }
      });
    });

    setEdges(newEdges);
  }, [tables]);

  // Handle node position changes
  const onNodesChange = useCallback(
    async (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));

      // Save position to workflow_layouts when drag ends
      for (const change of changes) {
        if (change.type === 'position' && change.position && !change.dragging) {
          const tableId = change.id;
          const newPosition = change.position;

          // Save to dedicated workflow_layouts collection (debounced)
          saveTablePosition(tableId, newPosition);
        }
      }
    },
    [setNodes, saveTablePosition]
  );

  // Handle view data from table node
  const handleViewData = useCallback(
    async (tableId: string, tableName: string) => {
      if (!database) return;

      // Query table data (search_path is already set by executeQueryInDatabase)
      // Convert table name to lowercase for PostgreSQL consistency
      const tableNameLower = tableName.toLowerCase();
      const queryStr = `SELECT * FROM "${tableNameLower}"`;

      try {
        const response = await fetch('/api/query/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            database: database.name,
            query: queryStr,
            userId: user?.uid,
          }),
        });
        const result = await response.json();

        if (result.success && result.results) {
          setQueryResults({
            results: result.results,
            query: queryStr,
            tableName: tableNameLower,
          });
        }
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    },
    [database, user]
  );

  // Handle delete table (disabled in presentation mode)
  const handleDeleteTable = useCallback(async (tableId: string) => {
    // No-op in presentation mode
  }, []);

  // Convert tables to React Flow nodes with persisted layout positions
  useEffect(() => {
    // Wait for layouts to load before rendering nodes with positions
    if (layoutsLoading) return;

    const newNodes: Node[] = tables.map((table) => {
      // Use saved layout position if available, otherwise use table's default position
      const savedPosition = workflowLayouts[table.id];
      const position = savedPosition || table.position;

      return {
        id: table.id,
        type: 'tableNode',
        position,
        data: {
          table: { ...table, columns: [...table.columns] },
          onDelete: handleDeleteTable,
          onViewData: handleViewData,
          isSelected: false,
        },
      };
    });
    setNodes(newNodes);
  }, [tables, handleViewData, handleDeleteTable, setNodes, workflowLayouts, layoutsLoading]);

  // Back to dashboard
  const handleBack = () => {
    router.push('/dashboard');
  };

  // Transition Screen
  if (isTransitioning) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center"
        >
          {/* Presentation Screen Animation */}
          <motion.div
            initial={{ y: 50, rotateX: -30 }}
            animate={{ y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative mb-8 flex justify-center"
          >
            {/* Monitor Frame */}
            <div className="relative">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-96 h-56 bg-white rounded-2xl border-4 border-gray-300 shadow-2xl overflow-hidden"
              >
                {/* Screen Content */}
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 p-4">
                  {/* Animated table placeholders */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="w-20 h-16 bg-white rounded-lg mb-3 shadow-lg border border-gray-200"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="w-20 h-16 bg-white rounded-lg ml-auto shadow-lg border border-gray-200"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8, duration: 0.3 }}
                    className="w-16 h-0.5 bg-gray-400 mx-auto mt-2"
                  />
                </div>
              </motion.div>

              {/* Monitor Stand */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-16 h-8 bg-gray-300 mx-auto rounded-b-lg"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="w-32 h-2 bg-gray-300 mx-auto rounded-full"
              />
            </div>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-3">
              <Presentation className="w-6 h-6 text-black" />
              <h2 className="text-4xl font-light text-black" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                Switching to Presentation Mode
              </h2>
            </div>

            {/* Progress Bar */}
            <div className="w-80 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${transitionProgress}%` }}
                transition={{ ease: "easeOut" }}
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
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className={`h-screen flex flex-col ${THEMES[themeParam as keyof typeof THEMES]?.bg || THEMES.light.bg}`}
    >
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`h-16 ${themeParam === 'dark' ? 'bg-slate-900/95 border-slate-700/50' : 'bg-white/95 border-gray-200/50'} backdrop-blur-2xl border-b flex items-center justify-between px-8 z-50 shadow-sm`}
      >
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBack}
            className={`flex items-center gap-2 px-5 py-2.5 ${themeParam === 'dark' ? 'bg-slate-100 hover:bg-white text-slate-900' : 'bg-gray-900 hover:bg-black text-white'} rounded-xl transition-all shadow-lg ${themeParam === 'dark' ? 'shadow-black/20' : 'shadow-gray-900/10'} font-medium`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Dashboard</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-3">
          <Presentation className={`w-5 h-5 ${themeParam === 'dark' ? 'text-white' : 'text-black'}`} />
          <h1 className={`text-2xl font-light ${themeParam === 'dark' ? 'text-white' : 'text-black'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
            Presentation Mode
          </h1>
          {database && (
            <span className={`text-base font-light ${themeParam === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
              — {database.name}
            </span>
          )}
        </div>

        <div className="w-48" /> {/* Spacer for centering */}
      </motion.header>

      {/* Workflow Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 relative"
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          className={THEMES[themeParam as keyof typeof THEMES]?.bg || THEMES.light.bg}
        >
          <Controls
            className="bg-white border-gray-200 rounded-lg shadow-md"
            showInteractive={false}
          />

        </ReactFlow>

        {/* Query Results Panel */}
        <AnimatePresence>
          {queryResults && (
            <motion.div
              initial={{ x: 400, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 400, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`absolute top-6 right-6 w-[800px] max-h-[85vh] ${themeParam === 'dark' ? 'bg-slate-800 border-slate-700/80' : 'bg-white border-gray-200/80'} rounded-2xl shadow-2xl border overflow-hidden z-40`}
            >
              <div className={`p-5 border-b ${themeParam === 'dark' ? 'border-slate-700 bg-slate-900/50' : 'border-gray-200 bg-gray-50/50'} flex items-center justify-between`}>
                <div>
                  <h3 className={`font-semibold ${themeParam === 'dark' ? 'text-white' : 'text-gray-900'} text-lg`} style={{ fontFamily: 'var(--font-geist-sans)' }}>{queryResults.tableName}</h3>
                  <p className={`text-xs ${themeParam === 'dark' ? 'text-slate-400' : 'text-gray-500'} font-mono mt-1`}>{queryResults.query}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setQueryResults(null)}
                  className={`p-2 ${themeParam === 'dark' ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-gray-200 text-gray-500 hover:text-gray-900'} rounded-lg transition-colors`}
                >
                  ✕
                </motion.button>
              </div>
              <div className="p-4 overflow-auto max-h-[70vh]">
                {Array.isArray(queryResults.results) && queryResults.results.length > 0 ? (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b-2 ${themeParam === 'dark' ? 'border-slate-600 bg-slate-900/50' : 'border-gray-300 bg-gray-50'}`}>
                        {Object.keys(queryResults.results[0] as object).map((key) => (
                          <th key={key} className={`text-left py-3 px-4 ${themeParam === 'dark' ? 'text-slate-300' : 'text-gray-700'} font-semibold whitespace-nowrap`}>
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResults.results.map((row, i) => (
                        <tr key={i} className={`border-b ${themeParam === 'dark' ? 'border-slate-700 hover:bg-slate-900/30' : 'border-gray-200 hover:bg-gray-50'}`}>
                          {Object.values(row as object).map((val, j) => (
                            <td key={j} className={`py-3 px-4 ${themeParam === 'dark' ? 'text-slate-300' : 'text-gray-700'} whitespace-nowrap`}>
                              {String(val ?? 'NULL')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className={`${themeParam === 'dark' ? 'text-slate-400' : 'text-gray-500'} text-center py-4`}>No data found</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function PresentationPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <PresentationContent />
    </Suspense>
  );
}
