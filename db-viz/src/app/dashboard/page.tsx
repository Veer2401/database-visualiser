'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,
  MarkerType,
  NodeChange,
  applyNodeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

// Firebase
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  Timestamp,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Components
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Terminal from '@/components/layout/Terminal';

import dynamic from 'next/dynamic';

const CreateDatabaseModal = dynamic(() => import('@/components/database/CreateDatabaseModal'), { ssr: false });
const UpgradePlanModal = dynamic(() => import('@/components/common/UpgradePlanModal'), { ssr: false });
const CreateTableModal = dynamic(() => import('@/components/database/CreateTableModal'), { ssr: false });
const EditTableModal = dynamic(() => import('@/components/database/EditTableModal'), { ssr: false });
const InsertDataModal = dynamic(() => import('@/components/database/InsertDataModal'), { ssr: false });
const UpdateDataModal = dynamic(() => import('@/components/database/UpdateDataModal'), { ssr: false });
const DeleteDataModal = dynamic(() => import('@/components/database/DeleteDataModal'), { ssr: false });
const SelectDataModal = dynamic(() => import('@/components/database/SelectDataModal'), { ssr: false });
const DropModal = dynamic(() => import('@/components/database/DropModal'), { ssr: false });
const CreateChoiceModal = dynamic(() => import('@/components/database/CreateChoiceModal'), { ssr: false });
const ForeignKeyModal = dynamic(() => import('@/components/database/ForeignKeyModal'), { ssr: false });
const ExportModal = dynamic(() => import('@/components/database/ExportModal'), { ssr: false });
const ImportModal = dynamic(() => import('@/components/database/ImportModal'), { ssr: false });
const SQLChatbot = dynamic(() => import('@/components/chatbot/SQLChatbot'), { ssr: false });
const DBComposer = dynamic(() => import('@/components/database/DBComposer'), { ssr: false });
const QueryResultsPanel = dynamic(() => import('@/components/database/QueryResultsPanel'), { ssr: false });

import TableNode from '@/components/database/TableNode';
import RelationshipEdge from '@/components/database/RelationshipEdge';
import { ChatMessage } from '@/components/chatbot/SQLChatbot';

// Hooks and Types
import { useAuth } from '@/hooks/useAuth';
import { useWorkflowLayouts } from '@/hooks/useWorkflowLayouts';
import {
  Database as DatabaseType,
  Table as TableType,
  Column,
  TerminalLog,
  Relationship,
} from '@/types/database';

// SQL Parser
import {
  parseSQLFile,
  validateSQL,
  generateDatabaseName,
  extractTableName,
} from '@/lib/sql-parser';

// FK helpers for 3NF compliance
import { getFKTableName, getFKColumnName } from '@/lib/fk-helpers';

// Icons
import { Upload, ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';
import { authFetch } from '@/lib/api-client';

// Node and Edge types for React Flow
const nodeTypes = {
  tableNode: TableNode,
};

const edgeTypes = {
  relationshipEdge: RelationshipEdge,
};

// Theme definitions (moved outside component to prevent re-creation)
const THEMES = {
  light: {
    bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
    navbar: 'bg-white/95 border-gray-200',
    sidebar: 'bg-white border-gray-200',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    button: 'bg-gray-900 hover:bg-gray-800 text-white',
    buttonSecondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900',
    modal: 'bg-white',
    input: 'bg-white border-gray-300 text-gray-900',
  },
  dark: {
    bg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    navbar: 'bg-slate-900/95 border-slate-700',
    sidebar: 'bg-slate-900 border-slate-700',
    text: 'text-white',
    textSecondary: 'text-slate-300',
    button: 'bg-slate-100 hover:bg-white text-slate-900',
    buttonSecondary: 'bg-slate-700 hover:bg-slate-600 text-white',
    modal: 'bg-slate-800',
    input: 'bg-slate-900 border-slate-600 text-white',
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();

  useEffect(() => {
    router.prefetch('/settings');
    router.prefetch('/profile');
    router.prefetch('/login');
  }, [router]);

  // Track intentional logout to prevent redirect to login
  const isLoggingOut = useRef(false);

  // Theme State
  const [currentTheme, setCurrentTheme] = useState<string>('light');

  // Mobile Sidebar State
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // UI State

  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [isCreateChoiceModalOpen, setIsCreateChoiceModalOpen] = useState(false);
  const [isCreateDbModalOpen, setIsCreateDbModalOpen] = useState(false);
  const [isCreateTableModalOpen, setIsCreateTableModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<'database' | 'table'>('database');
  const [isEditTableModalOpen, setIsEditTableModalOpen] = useState(false);
  const [isInsertDataModalOpen, setIsInsertDataModalOpen] = useState(false);
  const [isUpdateDataModalOpen, setIsUpdateDataModalOpen] = useState(false);
  const [isDeleteDataModalOpen, setIsDeleteDataModalOpen] = useState(false);
  const [isSelectDataModalOpen, setIsSelectDataModalOpen] = useState(false);
  const [isDropModalOpen, setIsDropModalOpen] = useState(false);
  const [isForeignKeyModalOpen, setIsForeignKeyModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [editingTableId, setEditingTableId] = useState<string | null>(null);

  // Workflow ref for export
  const workflowRef = useRef<HTMLDivElement>(null);
  const [queryResults, setQueryResults] = useState<{ results: unknown[]; query: string } | null>(null);

  // Data State
  const [databases, setDatabases] = useState<DatabaseType[]>([]);
  const [tables, setTables] = useState<TableType[]>([]);
  const [allTables, setAllTables] = useState<TableType[]>([]); // All tables for sidebar counts
  const [selectedDatabaseId, setSelectedDatabaseId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDatabaseId) {
      router.prefetch(`/terminal-mode?db=${selectedDatabaseId}`);
      router.prefetch(`/presentation?db=${selectedDatabaseId}&theme=${currentTheme}`);
    }
  }, [router, selectedDatabaseId, currentTheme]);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([]);

  // Chatbot state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatbotDbId, setChatbotDbId] = useState<string | null>(null);
  const [chatbotDbName, setChatbotDbName] = useState<string | null>(null);
  const [chatLoaded, setChatLoaded] = useState(false);

  // DB Composer sidebar state
  const [isComposerOpen, setIsComposerOpen] = useState(false);

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
    databaseId: selectedDatabaseId,
  });

  // Helper function to calculate optimal table position (side by side)
  const calculateTablePosition = useCallback(
    (databaseId: string): { x: number; y: number } => {
      const dbTables = tables.filter((t) => t.databaseId === databaseId);
      
      if (dbTables.length === 0) {
        // First table: start at default position
        return { x: 100, y: 100 };
      }

      // Find the rightmost table
      const rightmostTable = dbTables.reduce((max, table) => {
        return table.position.x > max.position.x ? table : max;
      });

      // Place next table 350px to the right (TABLE_WIDTH + SPACING)
      // Align to the same Y level
      return {
        x: rightmostTable.position.x + 350,
        y: rightmostTable.position.y,
      };
    },
    [tables]
  );

  // Calculate grid positions for multiple tables (no state dependency)
  const calculateGridPositions = useCallback(
    (count: number, startIndex: number = 0): Array<{ x: number; y: number }> => {
      const positions: Array<{ x: number; y: number }> = [];
      const TABLE_WIDTH = 300;
      const SPACING = 50;
      const COLS_PER_ROW = 4;
      const ROW_HEIGHT = 350;
      
      for (let i = 0; i < count; i++) {
        const col = (startIndex + i) % COLS_PER_ROW;
        const row = Math.floor((startIndex + i) / COLS_PER_ROW);
        
        positions.push({
          x: 100 + col * (TABLE_WIDTH + SPACING),
          y: 100 + row * ROW_HEIGHT,
        });
      }
      
      return positions;
    },
    []
  );

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('dbviz-theme');
    if (savedTheme && THEMES[savedTheme as keyof typeof THEMES]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // ⌘K / ⌘I / Ctrl+K / Ctrl+I keyboard shortcut to toggle DB Composer
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;
      const key = e.key ? e.key.toLowerCase() : '';
      const code = e.code ? e.code.toLowerCase() : '';

      if (isCmdOrCtrl && (key === 'k' || key === 'i' || code === 'keyk' || code === 'keyi')) {
        e.preventDefault();
        e.stopPropagation();
        setIsComposerOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler, { capture: true });
    return () => window.removeEventListener('keydown', handler, { capture: true });
  }, []);

  // Theme change handler
  const handleThemeChange = useCallback((themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('dbviz-theme', themeId);
  }, []);

  // Handle logout with redirect to home
  const handleLogout = useCallback(async () => {
    isLoggingOut.current = true;
    await logout();
    router.push('/');
  }, [logout, router]);

  // Auth redirect (only if not logged in initially, not after logout)
  useEffect(() => {
    if (!authLoading && !user && !isLoggingOut.current) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Persist selected database to localStorage
  useEffect(() => {
    if (selectedDatabaseId) {
      localStorage.setItem('dbviz-selected-database', selectedDatabaseId);
    }
  }, [selectedDatabaseId]);

  // Firebase: Load chat messages on mount
  useEffect(() => {
    if (!user || chatLoaded) return;

    const loadChat = async () => {
      try {
        const chatRef = doc(db, 'chatHistory', user.uid);
        const unsub = onSnapshot(chatRef, (snap) => {
          if (snap.exists()) {
            const data = snap.data();
              const SCHEMA_PILOT_WELCOME = "⚡ **Schema Pilot Ready**\n\nI am Schema Pilot, your AI database copilot. Tell me what you want to build:\n\n• *\"Create a car dealership database with cars and sales tables\"*\n• *\"Build a student management system with 3 sample records\"*\n• *\"Add an orders table with a foreign key to users\"*\n\nI will generate the SQL and automatically render the tables onto your interactive canvas!";

              const loaded: ChatMessage[] = data.messages.map((m: Record<string, unknown>) => {
                let content = m.content as string;
                if (m.id === 'welcome' || (typeof content === 'string' && (content.includes('AI Composer') || content.includes('Cursor-like')))) {
                  content = SCHEMA_PILOT_WELCOME;
                }
                return {
                  id: m.id as string,
                  type: m.type as 'user' | 'bot',
                  content,
                  sql: m.sql as string[] | undefined,
                  executed: m.executed as boolean | undefined,
                  timestamp: m.timestamp instanceof Timestamp
                    ? (m.timestamp as Timestamp).toDate()
                    : new Date(m.timestamp as string),
                };
              });
              setChatMessages(loaded);
            if (data.activeDatabaseId) {
              setChatbotDbId(data.activeDatabaseId);
            }
            if (data.activeDatabaseName) {
              setChatbotDbName(data.activeDatabaseName);
            }
          }
          setChatLoaded(true);
        });
        return unsub;
      } catch (err) {
        console.error('Error loading chat history:', err);
        setChatLoaded(true);
      }
    };

    loadChat();
  }, [user, chatLoaded]);

  // Save chat messages to Firebase
  const handleChatMessagesChange = useCallback(
    async (msgs: ChatMessage[]) => {
      if (!user) return;
      try {
        // Serialize messages for Firebase (no undefined values)
        const serialized = msgs.map(m => {
          const obj: Record<string, unknown> = {
            id: m.id,
            type: m.type,
            content: m.content,
            timestamp: m.timestamp instanceof Date ? Timestamp.fromDate(m.timestamp) : m.timestamp,
          };
          if (m.sql && m.sql.length > 0) obj.sql = m.sql;
          if (m.executed) obj.executed = true;
          return obj;
        });
        await setDoc(doc(db, 'chatHistory', user.uid), {
          messages: serialized,
          activeDatabaseId: chatbotDbId || null,
          activeDatabaseName: chatbotDbName || null,
          updatedAt: Timestamp.now(),
        }, { merge: true });
      } catch (err) {
        console.error('Error saving chat history:', err);
      }
    },
    [user, chatbotDbId, chatbotDbName]
  );

  // Firebase: Subscribe to databases
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'databases'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbs: DatabaseType[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        dbs.push({
          id: doc.id,
          name: data.name,
          userId: data.userId,
          db_password_hash: data.db_password_hash,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        });
      });
      setDatabases(dbs);

      // Restore previously selected database from localStorage, or auto-select first
      setSelectedDatabaseId((current) => {
        if (current) return current; // Already selected, don't change

        // Try to restore from localStorage
        const savedDbId = localStorage.getItem('dbviz-selected-database');
        if (savedDbId && dbs.find(d => d.id === savedDbId)) {
          return savedDbId;
        }

        // Otherwise select first database
        if (dbs.length > 0) {
          return dbs[0].id;
        }
        return null;
      });
    });

    return () => unsubscribe();
  }, [user]);

  // Firebase: Subscribe to ALL tables for the user (for sidebar counts)
  useEffect(() => {
    if (!user) {
      setAllTables([]);
      return;
    }

    // Get all database IDs for this user
    const dbIds = databases.map((d) => d.id);
    if (dbIds.length === 0) {
      setAllTables([]);
      return;
    }

    // Subscribe to all tables for all user databases
    const unsubscribes: (() => void)[] = [];
    const tablesByDb: Record<string, TableType[]> = {};

    dbIds.forEach((dbId) => {
      const q = query(collection(db, 'tables'), where('databaseId', '==', dbId));
      const unsub = onSnapshot(q, (snapshot) => {
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
        tablesByDb[dbId] = tbls;
        // Combine all tables from all databases
        const allTablesArray = Object.values(tablesByDb).flat();
        setAllTables(allTablesArray);
      });
      unsubscribes.push(unsub);
    });

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [user, databases]);

  // Firebase: Subscribe to tables for selected database (for workflow canvas)
  useEffect(() => {
    if (!selectedDatabaseId) {
      setTables([]);
      return;
    }

    const q = query(collection(db, 'tables'), where('databaseId', '==', selectedDatabaseId));
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
  }, [selectedDatabaseId]);

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

  // Handle node position changes (for immediate visual updates)
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  // Handle node drag stop - save position when drag ends
  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      console.log('[Dashboard] Node drag stopped:', node.id, 'Position:', node.position);
      saveTablePosition(node.id, node.position);
    },
    [saveTablePosition]
  );

  // Add terminal log
  const addLog = useCallback((type: TerminalLog['type'], message: string) => {
    setTerminalLogs((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type,
        message,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Plan limits checks
  const handleOpenCreateDatabase = useCallback(() => {
    if (databases.length >= 3) {
      setUpgradeReason('database');
      setIsUpgradeModalOpen(true);
    } else {
      setIsCreateDbModalOpen(true);
    }
  }, [databases.length]);

  const handleOpenCreateTable = useCallback(() => {
    if (tables.length >= 10) {
      setUpgradeReason('table');
      setIsUpgradeModalOpen(true);
    } else {
      setIsCreateTableModalOpen(true);
    }
  }, [tables.length]);

  // Create database
  const handleCreateDatabase = useCallback(
    async (name: string) => {
      if (!user) return;

      try {
        // First, create the database/schema in PostgreSQL with user isolation
        const postgresResponse = await authFetch('/api/database/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        });
        const postgresResult = await postgresResponse.json();

        if (!postgresResult.success) {
          addLog('error', `PostgreSQL Error: ${postgresResult.error}`);
          return;
        }

        // If PostgreSQL creation successful, save to Firebase (no password)
        const dbId = uuidv4();

        await setDoc(doc(db, 'databases', dbId), {
          name,
          userId: user.uid,
          db_password_hash: '',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });

        addLog('success', `Database '${name}' created successfully in PostgreSQL`);
        setSelectedDatabaseId(dbId);
        setIsCreateDbModalOpen(false);
      } catch (error) {
        console.error('Error creating database:', error);
        addLog('error', `Failed to create database '${name}'`);
      }
    },
    [user, addLog]
  );

  // Delete database
  const handleDeleteDatabase = useCallback(
    async (databaseId: string) => {
      if (!user) return;

      try {
        const dbToDelete = databases.find((d) => d.id === databaseId);
        const dbName = dbToDelete?.name;

        if (dbName) {
          // First, drop the schema in PostgreSQL with user isolation
          const postgresResponse = await authFetch('/api/database/drop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: dbName }),
          });
          const postgresResult = await postgresResponse.json();

          if (!postgresResult.success) {
            // Log warning but continue with Firebase deletion
            addLog('warning', `PostgreSQL: ${postgresResult.error}`);
          }
        }

        // Delete all tables in the database from Firebase
        const tablesToDelete = tables.filter((t) => t.databaseId === databaseId);
        for (const table of tablesToDelete) {
          await deleteDoc(doc(db, 'tables', table.id));
        }

        await deleteDoc(doc(db, 'databases', databaseId));

        if (selectedDatabaseId === databaseId) {
          setSelectedDatabaseId(null);
        }

        addLog('success', `Database '${dbName}' dropped successfully`);
      } catch (error) {
        console.error('Error deleting database:', error);
        addLog('error', 'Failed to delete database');
      }
    },
    [user, databases, tables, selectedDatabaseId, addLog]
  );

  // ── Helper: sync PostgreSQL tables → Firebase for a given database ────────────
  const syncTablesToFirebase = useCallback(
    async (actualDbName: string, firebaseDbId: string) => {
      if (!user) return;

      const showTablesResponse = await authFetch('/api/query/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ database: actualDbName, query: 'SHOW TABLES' }),
      });
      const showTablesResult = await showTablesResponse.json();

      if (!showTablesResult.success || !showTablesResult.results) return;

      const pgTableNames: string[] = showTablesResult.results.map(
        (row: Record<string, string>) => Object.values(row)[0]
      );

      // Get existing Firebase tables for this database so we don't duplicate
      const existingTablesSnap = await getDocs(
        query(collection(db, 'tables'), where('databaseId', '==', firebaseDbId))
      );
      const existingNames = new Set<string>();
      const existingTables: Array<{ name: string; position: { x: number; y: number } }> = [];
      
      existingTablesSnap.forEach(d => {
        const data = d.data();
        existingNames.add(data.name);
        existingTables.push({ 
          name: data.name, 
          position: data.position || { x: 100, y: 100 } 
        });
      });

      // Collect new tables to be added
      const newTables: Array<{ name: string; columns: Column[] }> = [];

      for (let i = 0; i < pgTableNames.length; i++) {
        const tableName = pgTableNames[i];
        if (existingNames.has(tableName)) continue; // Already in Firebase

        const descResponse = await authFetch('/api/table/describe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ database: actualDbName, table: tableName }),
        });
        const descResult = await descResponse.json();

        if (!descResult.success) {
          // Skip tables that can't be described (might not exist or access denied)
          console.warn(`Could not describe table '${tableName}':`, descResult.error);
          continue;
        }

        if (descResult.columns) {
          const columns: Column[] = descResult.columns.map(
            (col: { Field: string; Type: string; Null: string; Key: string; Default: string | null; Extra: string }) => {
              const column: Record<string, unknown> = {
                id: uuidv4(),
                name: col.Field,
                dataType: col.Type.toUpperCase().replace(/\(.*\)/, '').trim(),
                isPrimaryKey: col.Key === 'PRI',
                isForeignKey: col.Key === 'MUL',
                isNotNull: col.Null === 'NO',
                isUnique: col.Key === 'UNI',
                isAutoIncrement: (col.Extra || '').includes('auto_increment'),
              };
              if (col.Default !== null && col.Default !== undefined) {
                column.defaultValue = col.Default;
              }
              return column as unknown as Column;
            }
          );

          newTables.push({ name: tableName, columns });
        }
      }

      // Calculate grid positions for new tables
      const totalTableCount = existingTables.length + newTables.length;
      const gridPositions = calculateGridPositions(totalTableCount);
      
      // Add new tables with calculated positions
      for (let i = 0; i < newTables.length; i++) {
        const tableData = newTables[i];
        const positionIndex = existingTables.length + i;
        const position = gridPositions[positionIndex];

        const tableId = uuidv4();
        await setDoc(doc(db, 'tables', tableId), {
          name: tableData.name,
          databaseId: firebaseDbId,
          columns: tableData.columns,
          position,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });

        addLog('success', `Table '${tableData.name}' synced to workflow`);
      }
    },
    [user, addLog, calculateGridPositions]
  );

  // ── Execute SQL from chatbot → terminal → workflow ───────────────────────
  const handleExecuteSQL = useCallback(
    async (sqlStatements: string[]) => {
      if (!user) throw new Error('Not authenticated');

      let dbId = chatbotDbId;
      let dbName = chatbotDbName;
      let actualDbName: string;

      // If no active chatbot database yet, check if user is creating one
      if (!dbId) {
        // Look for CREATE DATABASE statement in the SQL
        let createDbStatement = '';
        let extractedDbName = '';

        for (const sql of sqlStatements) {
          const trimmed = sql.trim();
          if (/^CREATE\s+DATABASE/i.test(trimmed)) {
            createDbStatement = trimmed;
            // Extract database name from "CREATE DATABASE <name>"
            const match = trimmed.match(/CREATE\s+DATABASE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
            if (match && match[1]) {
              extractedDbName = match[1];
            }
            break;
          }
        }

        // Use extracted name if available, otherwise generate one
        dbName = extractedDbName || `chatbot_db_${Date.now().toString(36)}`;

        const dbResponse = await authFetch('/api/database/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: dbName }),
        });
        const dbResult = await dbResponse.json();

        if (!dbResult.success) {
          addLog('error', `Error: ${dbResult.error}`);
          throw new Error(dbResult.error);
        }

        dbId = uuidv4();
        await setDoc(doc(db, 'databases', dbId), {
          name: dbName,
          userId: user.uid,
          db_password_hash: '',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });

        actualDbName = dbName;
        setChatbotDbId(dbId);
        setChatbotDbName(dbName);

        // Persist chatbot DB info immediately (state won't be in closure yet)
        await setDoc(doc(db, 'chatHistory', user.uid), {
          activeDatabaseId: dbId,
          activeDatabaseName: dbName,
          updatedAt: Timestamp.now(),
        }, { merge: true });

        addLog('success', `Database '${dbName}' created from chatbot`);
      } else {
        // Use existing chatbot database
        const existingDb = databases.find(d => d.id === dbId);
        if (!existingDb) {
          throw new Error('Chatbot database not found. It may have been deleted.');
        }
        actualDbName = existingDb.name;
      }

      // Execute each SQL statement
      for (const sql of sqlStatements) {
        const trimmed = sql.trim();
        if (!trimmed) continue;
        if (/^CREATE\s+DATABASE/i.test(trimmed)) continue; // Skip CREATE DATABASE

        const execResponse = await authFetch('/api/query/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ database: actualDbName, query: trimmed }),
        });
        const execResult = await execResponse.json();

        if (!execResult.success) {
          addLog('warning', `SQL: ${execResult.error}`);
        } else {
          addLog('success', `Executed: ${trimmed.substring(0, 80)}${trimmed.length > 80 ? '...' : ''}`);
        }
      }

// Sync tables from PostgreSQL → Firebase (handles new tables only, skips existing)
      await syncTablesToFirebase(actualDbName, dbId);

      // Switch workflow to the chatbot database
      setSelectedDatabaseId(dbId);
      addLog('success', `Workflow showing '${dbName}'`);
    },
    [user, chatbotDbId, chatbotDbName, databases, addLog, syncTablesToFirebase]
  );

  // Create table
  const handleCreateTable = useCallback(
    async (name: string, columns: Column[]) => {
      if (!selectedDatabaseId) return;

      try {
        const selectedDatabase = databases.find((d) => d.id === selectedDatabaseId);
        const databaseName = selectedDatabase?.name;

        if (!databaseName) {
          addLog('error', 'No database selected');
          return;
        }

        // Check if table already exists in PostgreSQL
        const checkResponse = await authFetch('/api/query/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            database: databaseName,
            query: `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = current_schema() AND table_name = '${name.toLowerCase()}'`,
          }),
        });
        const checkResult = await checkResponse.json();

        if (checkResult.success && checkResult.results && checkResult.results.length > 0) {
          const count = Number(checkResult.results[0].count);
          if (count > 0) {
            addLog('error', `Table '${name}' already exists. Use DROP TABLE \`${name}\` to remove it first.`);
            return;
          }
        }

        // First, create the table in PostgreSQL
        const pgColumns = columns.map((col) => {
          const fkTableName = col.isForeignKey ? getFKTableName(col.foreignKeyReference, tables) : null;
          const fkColumnName = col.isForeignKey ? getFKColumnName(col.foreignKeyReference, tables) : null;
          
          return {
            name: col.name,
            dataType: col.dataType,
            isPrimaryKey: col.isPrimaryKey,
            isNotNull: col.isNotNull,
            isUnique: col.isUnique,
            isAutoIncrement: col.isAutoIncrement,
            defaultValue: col.defaultValue,
            isForeignKey: col.isForeignKey,
            foreignKeyReference: col.foreignKeyReference && fkTableName && fkColumnName ? {
              tableName: fkTableName,
              columnName: fkColumnName,
            } : undefined,
          };
        });

        const response = await authFetch('/api/table/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            database: databaseName,
            tableName: name,
            columns: pgColumns,
          }),
        });
        const result = await response.json();

        if (!result.success) {
          addLog('error', `Error: ${result.error}`);
          return;
        }

        // If PostgreSQL creation successful, save to Firebase
        const tableId = uuidv4();

        // Calculate position for new table
        const position = calculateTablePosition(selectedDatabaseId);

        await setDoc(doc(db, 'tables', tableId), {
          name,
          databaseId: selectedDatabaseId,
          columns,
          position,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });

        addLog('success', `Table '${name}' created successfully in PostgreSQL`);

        // Log foreign key relationships
        columns.forEach((col) => {
          if (col.isForeignKey && col.foreignKeyReference) {
            const fkTableName = getFKTableName(col.foreignKeyReference, tables);
            const fkColumnName = getFKColumnName(col.foreignKeyReference, tables);
            if (fkTableName && fkColumnName) {
              addLog(
                'info',
                `Foreign key linked: ${name}.${col.name} → ${fkTableName}.${fkColumnName}`
              );
            }
          }
        });

        setIsCreateTableModalOpen(false);
      } catch (error) {
        console.error('Error creating table:', error);
        addLog('error', `Failed to create table '${name}'`);
      }
    },
    [selectedDatabaseId, databases, tables, addLog]
  );

  // Delete table
  const handleDeleteTable = useCallback(
    async (tableId: string) => {
      try {
        const tableToDelete = tables.find((t) => t.id === tableId);
        const tableName = tableToDelete?.name;
        const databaseId = tableToDelete?.databaseId;
        const selectedDatabase = databases.find((d) => d.id === databaseId);
        const databaseName = selectedDatabase?.name;

        if (tableName && databaseName) {
          // First, drop the table in PostgreSQL
          const response = await authFetch('/api/query/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              database: databaseName,
              query: `DROP TABLE "${tableName}"`,
            }),
          });
          const result = await response.json();

          if (!result.success) {
            // Log warning but continue with Firebase deletion
            addLog('warning', `PostgreSQL: ${result.error}`);
          }
        }

        await deleteDoc(doc(db, 'tables', tableId));

        if (selectedTableId === tableId) {
          setSelectedTableId(null);
        }

        addLog('success', `Table '${tableName}' dropped successfully`);
      } catch (error) {
        console.error('Error deleting table:', error);
        addLog('error', 'Failed to delete table');
      }
    },
    [tables, databases, selectedTableId, addLog]
  );

  // Handle edit table
  const handleEditTable = useCallback(
    (tableId: string) => {
      setEditingTableId(tableId);
      setIsEditTableModalOpen(true);
    },
    []
  );

  // Update table columns
  const handleUpdateTable = useCallback(
    async (tableId: string, columns: Column[]) => {
      try {
        const table = tables.find((t) => t.id === tableId);
        if (!table) {
          addLog('error', 'Table not found');
          return;
        }

        const tableName = table.name;
        const selectedDatabase = databases.find((d) => d.id === table.databaseId);
        const databaseName = selectedDatabase?.name;

        if (!databaseName) {
          addLog('error', 'Database not found');
          return;
        }

        // Get the old columns to compare
        const oldColumns = table.columns;
        const oldColumnNames = new Set(oldColumns.map((c) => c.name));
        const newColumnNames = new Set(columns.map((c) => c.name));

        // Identify added columns
        const addedColumns = columns.filter((c) => !oldColumnNames.has(c.name));

        // Identify removed columns
        const removedColumns = oldColumns.filter((c) => !newColumnNames.has(c.name));

        // Identify modified columns (same name but different properties)
        const modifiedColumns = columns.filter((newCol) => {
          const oldCol = oldColumns.find((c) => c.name === newCol.name);
          if (!oldCol) return false;
          return (
            oldCol.dataType !== newCol.dataType ||
            oldCol.isNotNull !== newCol.isNotNull ||
            oldCol.isUnique !== newCol.isUnique ||
            oldCol.defaultValue !== newCol.defaultValue
          );
        });

        // Execute ALTER TABLE commands for each change
        const alterCommands: string[] = [];

        // Add new columns
        for (const col of addedColumns) {
          let colDef = `ADD COLUMN "${col.name}" ${col.dataType}`;
          if (col.isNotNull) colDef += ' NOT NULL';
          if (col.isUnique) colDef += ' UNIQUE';
          if (col.defaultValue) colDef += ` DEFAULT '${col.defaultValue}'`;
          alterCommands.push(colDef);
        }

        // Drop removed columns
        for (const col of removedColumns) {
          alterCommands.push(`DROP COLUMN "${col.name}"`);
        }

        // Modify existing columns
        for (const col of modifiedColumns) {
          let colDef = `ALTER COLUMN "${col.name}" TYPE ${col.dataType}`;
          if (col.isNotNull) colDef += ' NOT NULL';
          if (col.isUnique) colDef += ' UNIQUE';
          if (col.defaultValue) colDef += ` DEFAULT '${col.defaultValue}'`;
          alterCommands.push(colDef);
        }

        // If there are changes, execute with schema sync
        if (alterCommands.length > 0) {
          const alterQuery = `ALTER TABLE "${tableName}" ${alterCommands.join(', ')}`;
          
          // Use schema-aware execution to automatically sync to Firebase and canvas
          const result = await executeQueryWithSchemaSync(databaseName, alterQuery);
          
          if (!result.success) {
            addLog('error', `Failed to alter table: ${result.error}`);
            return;
          }
        }

        // Close modal - Firebase listener will sync the updated table
        setIsEditTableModalOpen(false);
        setEditingTableId(null);
        addLog('success', `Table '${tableName}' updated successfully`);
      } catch (error) {
        console.error('Error updating table:', error);
        addLog('error', 'Failed to update table');
      }
    },
    [tables, databases, addLog]
  );

  // Add foreign key to existing table
  const handleAddForeignKey = useCallback(
    async (
      sourceTableId: string,
      sourceColumnId: string,
      targetTableId: string,
      targetColumnId: string
    ) => {
      const sourceTable = tables.find((t) => t.id === sourceTableId);
      const targetTable = tables.find((t) => t.id === targetTableId);
      const sourceColumn = sourceTable?.columns.find((c) => c.id === sourceColumnId);
      const targetColumn = targetTable?.columns.find((c) => c.id === targetColumnId);
      const selectedDatabase = databases.find((d) => d.id === selectedDatabaseId);
      const databaseName = selectedDatabase?.name;

      if (!sourceTable || !targetTable || !sourceColumn || !targetColumn || !databaseName) {
        throw new Error('Invalid table or column selection');
      }

      try {
        // Add the foreign key constraint in PostgreSQL directly
        // PostgreSQL will return proper errors if tables don't exist
        const constraintName = `fk_${sourceTable.name}_${sourceColumn.name}`;
        const alterQuery = `ALTER TABLE "${sourceTable.name}" ADD CONSTRAINT "${constraintName}" FOREIGN KEY ("${sourceColumn.name}") REFERENCES "${targetTable.name}"("${targetColumn.name}")`;

        console.log('Adding FK with query:', alterQuery);

        const response = await authFetch('/api/query/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            database: databaseName,
            query: alterQuery,
          }),
        });

        const result = await response.json();
        console.log('FK operation result:', result);

        if (!result.success) {
          throw new Error(result.error || 'Failed to add foreign key in PostgreSQL');
        }

        // Update Firebase with the foreign key reference
        const updatedColumns = sourceTable.columns.map((col) => {
          if (col.id === sourceColumnId) {
            return {
              ...col,
              isForeignKey: true,
              foreignKeyReference: {
                tableId: targetTableId,
                tableName: targetTable.name,
                columnId: targetColumnId,
                columnName: targetColumn.name,
              },
            };
          }
          return col;
        });

        await updateDoc(doc(db, 'tables', sourceTableId), {
          columns: updatedColumns,
          updatedAt: Timestamp.now(),
        });

        // Auto-position source table to the right of target table for straight FK line
        // Position 400px to the right and align vertically
        const newPosition = {
          x: targetTable.position.x + 400,
          y: targetTable.position.y,
        };

        await updateDoc(doc(db, 'tables', sourceTableId), {
          position: newPosition,
          updatedAt: Timestamp.now(),
        });

        addLog(
          'success',
          `Foreign key added: ${sourceTable.name}.${sourceColumn.name} → ${targetTable.name}.${targetColumn.name}`
        );
      } catch (error) {
        console.error('Error adding foreign key:', error);
        throw error;
      }
    },
    [tables, databases, selectedDatabaseId, addLog]
  );

  // Remove foreign key from existing table
  const handleRemoveForeignKey = useCallback(
    async (tableId: string, columnId: string) => {
      const table = tables.find((t) => t.id === tableId);
      const column = table?.columns.find((c) => c.id === columnId);
      const selectedDatabase = databases.find((d) => d.id === selectedDatabaseId);
      const databaseName = selectedDatabase?.name;

      if (!table || !column || !databaseName) {
        throw new Error('Invalid table or column');
      }

      try {
        // Remove the foreign key constraint from PostgreSQL
        const constraintName = `fk_${table.name}_${column.name}`;
        const alterQuery = `ALTER TABLE "${table.name}" DROP CONSTRAINT "${constraintName}"`;

        const response = await authFetch('/api/query/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            database: databaseName,
            query: alterQuery,
          }),
        });

        const result = await response.json();

        // Even if PostgreSQL fails (constraint might have different name), update Firebase
        if (!result.success) {
          addLog('warning', `PostgreSQL: ${result.error}. Updating workflow...`);
        }

        // Update Firebase to remove the foreign key reference
        const updatedColumns = table.columns.map((col) => {
          if (col.id === columnId) {
            const { foreignKeyReference, ...rest } = col;
            return {
              ...rest,
              isForeignKey: false,
            };
          }
          return col;
        });

        await updateDoc(doc(db, 'tables', tableId), {
          columns: updatedColumns,
          updatedAt: Timestamp.now(),
        });

        addLog('success', `Foreign key removed from ${table.name}.${column.name}`);
      } catch (error) {
        console.error('Error removing foreign key:', error);
        throw error;
      }
    },
    [tables, databases, selectedDatabaseId, addLog]
  );

  // Handle SQL file import
  const handleSQLImport = useCallback(
    async (sqlContent: string, fileName: string) => {
      if (!user?.uid) {
        addLog('error', 'User ID not found');
        throw new Error('User ID not found');
      }

      try {
        // Validate SQL content
        if (!validateSQL(sqlContent)) {
          throw new Error('SQL file is empty or contains no valid statements');
        }

        addLog('info', `🔄 Parsing SQL file: ${fileName}`);

        // Parse the SQL file
        const parsedSQL = parseSQLFile(sqlContent);

        if (!parsedSQL.createTableStatements || parsedSQL.createTableStatements.length === 0) {
          throw new Error('No CREATE TABLE statements found in the SQL file');
        }

        addLog(
          'info',
          `📊 Found ${parsedSQL.createTableStatements.length} table(s) to import`
        );

        // Determine database name
        let targetDatabaseId: string;
        let targetDatabaseName: string;

        if (parsedSQL.databaseName) {
          // Database name found in SQL file (from CREATE DATABASE statement)
          targetDatabaseName = parsedSQL.databaseName;
          const existingDb = databases.find(
            (d) => d.name.toLowerCase() === targetDatabaseName.toLowerCase()
          );

          if (existingDb) {
            targetDatabaseId = existingDb.id;
            addLog('info', `📁 Using existing database: ${targetDatabaseName}`);
          } else {
            // Create the database from SQL
            addLog('info', `📁 Creating database: ${targetDatabaseName}`);
            const dbResponse = await authFetch('/api/database/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: targetDatabaseName,
              }),
            });

            const dbResult = await dbResponse.json();

            if (!dbResult.success) {
              throw new Error(`Failed to create database: ${dbResult.error}`);
            }

            // Add database to Firestore
            const newDb: DatabaseType = {
              id: uuidv4(),
              name: targetDatabaseName,
              userId: user.uid,
              db_password_hash: '',
              createdAt: new Date(Timestamp.now().toMillis()),
              updatedAt: new Date(Timestamp.now().toMillis()),
            };

            await setDoc(doc(db, 'databases', newDb.id), {
              ...newDb,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            });
            targetDatabaseId = newDb.id;
            addLog('success', `✅ Database created: ${targetDatabaseName}`);
          }
        } else {
          // No database name in SQL, use selected or create new
          if (!selectedDatabaseId) {
            const generatedDbName = generateDatabaseName(fileName);
            targetDatabaseName = generatedDbName;

            addLog('info', `📁 Creating database: ${generatedDbName}`);
            const dbResponse = await authFetch('/api/database/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: generatedDbName,
              }),
            });

            const dbResult = await dbResponse.json();

            if (!dbResult.success) {
              throw new Error(`Failed to create database: ${dbResult.error}`);
            }

            const newDb: DatabaseType = {
              id: uuidv4(),
              name: generatedDbName,
              userId: user.uid,
              db_password_hash: '',
              createdAt: new Date(Timestamp.now().toMillis()),
              updatedAt: new Date(Timestamp.now().toMillis()),
            };

            await setDoc(doc(db, 'databases', newDb.id), {
              ...newDb,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now(),
            });
            targetDatabaseId = newDb.id;
            addLog('success', `✅ Database created: ${generatedDbName}`);
          } else {
            targetDatabaseId = selectedDatabaseId;
            targetDatabaseName = databases.find((d) => d.id === selectedDatabaseId)?.name || 'database';
            addLog('info', `📁 Using selected database: ${targetDatabaseName}`);
          }
        }

        const actualDatabaseName = databases.find((d) => d.id === targetDatabaseId)?.name || targetDatabaseName;

        // Create tables by executing the CREATE TABLE statements
        for (const tableStatement of parsedSQL.createTableStatements) {
          addLog('info', `📋 Creating table: ${tableStatement.tableName}`);

          // Execute CREATE TABLE statement in PostgreSQL
          const createResponse = await authFetch('/api/query/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              database: actualDatabaseName,
              query: tableStatement.sql,
            }),
          });

          const createResult = await createResponse.json();

          if (!createResult.success) {
            addLog('warning', `⚠️ CREATE TABLE warning: ${createResult.error}`);
          } else {
            addLog('success', `✅ Table created: ${tableStatement.tableName}`);
          }
        }

        // Execute INSERT statements
        if (parsedSQL.insertStatements && parsedSQL.insertStatements.length > 0) {
          addLog('info', `📝 Executing ${parsedSQL.insertStatements.length} INSERT statement(s)`);

          for (const insertStmt of parsedSQL.insertStatements) {
            const insertResponse = await authFetch('/api/query/execute', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                database: actualDatabaseName,
                query: insertStmt.sql,
              }),
            });

            const insertResult = await insertResponse.json();

            if (!insertResult.success) {
              addLog('warning', `⚠️ INSERT warning: ${insertResult.error}`);
            }
          }

          addLog('success', `✅ Data inserted successfully`);
        }

        // Execute any other statements (like procedures, functions, triggers, etc.)
        if (parsedSQL.otherStatements && parsedSQL.otherStatements.length > 0) {
          addLog('info', `🔧 Executing ${parsedSQL.otherStatements.length} additional statement(s)`);

          for (const stmt of parsedSQL.otherStatements) {
            try {
              const response = await authFetch('/api/query/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  database: actualDatabaseName,
                  query: stmt.sql,
                }),
              });

              const result = await response.json();

              if (!result.success) {
                addLog('warning', `⚠️ Statement executed with warning: ${result.error}`);
              }
            } catch (err) {
              addLog('warning', `⚠️ Could not execute additional statement`);
            }
          }
        }

        // Sync tables from PostgreSQL to Firebase (after all tables are created)
        addLog('info', `🔄 Syncing tables to workflow...`);
        await syncTablesToFirebase(actualDatabaseName, targetDatabaseId);

        // Set the imported database as selected
        setSelectedDatabaseId(targetDatabaseId);
        addLog('success', `🎉 Import completed successfully!`);
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        addLog('error', `❌ Import failed: ${errorMsg}`);
        throw error;
      }
    },
    [user, selectedDatabaseId, databases, addLog, setSelectedDatabaseId, syncTablesToFirebase]
  );

  // Execute query helper for modals
  const executeQuery = useCallback(
    async (database: string, query: string): Promise<{ success: boolean; results?: unknown[]; error?: string }> => {
      try {
        const response = await authFetch('/api/query/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ database, query }),
        });
        const result = await response.json();

        if (result.success) {
          addLog('success', `Query executed: ${query.substring(0, 50)}${query.length > 50 ? '...' : ''}`);
          if (result.formattedOutput) {
            result.formattedOutput.forEach((line: string) => addLog('info', line));
          }
        } else {
          addLog('error', result.error || 'Query failed');
        }

        return result;
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : 'Query execution failed';
        addLog('error', errMsg);
        return { success: false, error: errMsg };
      }
    },
    [addLog]
  );

  // Execute query with automatic schema synchronization to Firebase/Canvas
  const executeQueryWithSchemaSync = useCallback(
    async (database: string, query: string): Promise<{ success: boolean; results?: unknown[]; error?: string }> => {
      // First execute the query
      const result = await executeQuery(database, query);
      if (!result.success) return result;

      // Then, check if this query changes the schema and sync to Firebase
      const upperQuery = query.toUpperCase().trim();
      const currentDatabaseName = database;

      try {
        // Handle CREATE TABLE - add to Firebase
        if (upperQuery.startsWith('CREATE TABLE')) {
          const match = query.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
          if (match && match[1] && selectedDatabaseId) {
            const tableName = match[1];
            
            // Fetch table structure from PostgreSQL using the proper endpoint
            const describeResponse = await authFetch('/api/table/describe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                database: currentDatabaseName,
                table: tableName,
              }),
            });
            const describeResult = await describeResponse.json();

            if (describeResult.success && Array.isArray(describeResult.columns)) {
              const columns = describeResult.columns.map((col: any) => {
                const column: Column = {
                  id: uuidv4(),
                  name: col.Field,
                  dataType: col.Type.toUpperCase().replace(/\(.*\)/, '').trim(),
                  isPrimaryKey: col.Key === 'PRI',
                  isNotNull: col.Null === 'NO',
                  isUnique: col.Key === 'UNI',
                  defaultValue: col.Default,
                  isForeignKey: col.Key === 'MUL',
                };
                return column;
              });

              const tableId = uuidv4();
              const position = calculateTablePosition(selectedDatabaseId);

              await setDoc(doc(db, 'tables', tableId), {
                name: tableName,
                databaseId: selectedDatabaseId,
                columns,
                position,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
              });

              addLog('success', `Table '${tableName}' added to canvas`);
            }
          }
        }
        // Handle DROP TABLE - remove from Firebase
        else if (upperQuery.startsWith('DROP TABLE')) {
          const match = query.match(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
          if (match && match[1]) {
            const tableName = match[1];
            const tableToDelete = tables.find((t) =>
              t.name.toLowerCase() === tableName.toLowerCase() &&
              t.databaseId === selectedDatabaseId
            );

            if (tableToDelete) {
              await deleteDoc(doc(db, 'tables', tableToDelete.id));
              if (selectedTableId === tableToDelete.id) {
                setSelectedTableId(null);
              }
              addLog('info', `Table '${tableName}' removed from workflow`);
            }
          }
        }
        // Handle ALTER TABLE - update schema in Firebase
        else if (upperQuery.startsWith('ALTER TABLE')) {
          const match = query.match(/ALTER\s+TABLE\s+[`"]?(\w+)[`"]?/i);
          if (match && match[1] && selectedDatabaseId) {
            const tableName = match[1];
            const tableToUpdate = tables.find((t) =>
              t.name.toLowerCase() === tableName.toLowerCase() &&
              t.databaseId === selectedDatabaseId
            );

            if (tableToUpdate) {
              // Use the proper table/describe endpoint for PostgreSQL
              const describeResponse = await authFetch('/api/table/describe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  database: currentDatabaseName,
                  table: tableName,
                }),
              });
              const describeResult = await describeResponse.json();

              if (describeResult.success && Array.isArray(describeResult.columns)) {
                const updatedColumns = describeResult.columns.map((col: any) => {
                  const existingColumn = tableToUpdate.columns.find((c) => c.name === col.Field);
                  
                  const column: Column = {
                    id: existingColumn?.id || uuidv4(),
                    name: col.Field,
                    dataType: col.Type.toUpperCase().replace(/\(.*\)/, '').trim(),
                    isPrimaryKey: col.Key === 'PRI',
                    isNotNull: col.Null === 'NO',
                    isUnique: col.Key === 'UNI',
                    defaultValue: col.Default,
                    isForeignKey: col.Key === 'MUL',
                  };

                  return column;
                });

                await updateDoc(doc(db, 'tables', tableToUpdate.id), {
                  columns: updatedColumns,
                  updatedAt: Timestamp.now(),
                });

                addLog('success', `Table '${tableName}' structure updated on canvas`);
              }
            }
          }
        }
      } catch (err) {
        console.error('Error syncing schema:', err);
        // Don't throw - schema sync failure shouldn't prevent query success
      }

      return result;
    },
    [executeQuery, selectedDatabaseId, selectedTableId, tables, addLog, user?.uid]
  );

  // Handle view data from table node arrow button
  const handleViewData = useCallback(
    async (tableId: string, tableName: string) => {
      // Use terminalDbRef which has the ACTUAL prefixed schema name from terminal
      const db = terminalDbRef.current;
      
      if (!db) {
        addLog('error', `No database found in terminalDbRef`);
        console.error('[handleViewData] Database not found in terminalDbRef');
        return;
      }

      console.log('[handleViewData] Executing query with prefixed database:', { dbName: db.name, tableName });

      // Query table data - convert table name to lowercase for PostgreSQL consistency
      const tableNameLower = tableName.toLowerCase();
      const query = `SELECT * FROM "${tableNameLower}"`;

      const result = await executeQuery(db.name, query);

      if (result.success && result.results) {
        addLog('success', `Retrieved ${result.results.length} rows from "${tableNameLower}"`);
        setQueryResults({
          results: result.results,
          query,
        });
      } else {
        addLog('error', result.error || `Failed to retrieve data from "${tableNameLower}"`);
        console.error('[handleViewData] Query failed:', result.error);
      }
    },
    [executeQuery, addLog]
  );

  // Track terminal's current database separately from UI selection
  // This allows USE command to work correctly even with async state updates
  const terminalDbRef = useRef<{ id: string; name: string } | null>(null);

  // Initialize terminal database ref when selected database changes
  useEffect(() => {
    if (selectedDatabaseId && user?.uid) {
      const db = databases.find((d) => d.id === selectedDatabaseId);
      if (db) {
        // Compute prefixed database name (same logic as PostgreSQL uses: user_{first8chars}_{dbName})
        const prefix = `user_${user.uid.substring(0, 8)}_`;
        const prefixedName = `${prefix}${db.name}`;
        terminalDbRef.current = {
          id: db.id,
          name: prefixedName,
        };
        console.log('[Dashboard] Initialized terminalDbRef with prefixed name:', prefixedName);
      }
    }
  }, [selectedDatabaseId, databases, user?.uid]);

  // Convert tables to React Flow nodes with persisted layout positions
  useEffect(() => {
    if (layoutsLoading) {
      console.log('[Dashboard] Waiting for layouts to load...');
      return;
    }

    console.log('[Dashboard] Creating nodes with layouts:', {
      tablesCount: tables.length,
      layoutsCount: Object.keys(workflowLayouts).length,
      layouts: workflowLayouts,
    });

    const newNodes: Node[] = tables.map((table) => {
      // Use saved layout position if available, otherwise use table's default position
      const savedPosition = workflowLayouts[table.id];
      const position = savedPosition || table.position;

      console.log(`[Dashboard] Table ${table.name}: savedPosition=${JSON.stringify(savedPosition)}, using=${JSON.stringify(position)}`);

      return {
        id: table.id,
        type: 'tableNode',
        position,
        data: {
          table: { ...table, columns: [...table.columns] }, // Create new reference to force re-render
          onDelete: handleDeleteTable,
          onViewData: handleViewData,
          isSelected: selectedTableId === table.id,
          theme: THEMES[currentTheme as keyof typeof THEMES] || THEMES.light,
        },
      };
    });
    setNodes(newNodes);
  }, [tables, selectedTableId, handleViewData, handleDeleteTable, currentTheme, workflowLayouts, layoutsLoading]);

  // Handle INSERT data
  const handleInsertData = useCallback(
    async (database: string, table: string, values: Record<string, string>) => {
      const columns = Object.keys(values).filter((k) => values[k] !== '');
      const vals = columns.map((col) => {
        const val = values[col];
        // Check if value is numeric
        if (/^-?\d+(\.\d+)?$/.test(val)) {
          return val;
        }
        return `'${val.replace(/'/g, "''")}'`;
      });

      if (columns.length === 0) {
        throw new Error('At least one value is required');
      }

      const query = `INSERT INTO "${table}" (${columns.map((col) => `"${col}"`).join(', ')}) VALUES (${vals.join(', ')})`;
      const result = await executeQueryWithSchemaSync(database, query);

      if (!result.success) {
        throw new Error(result.error);
      }
    },
    [executeQueryWithSchemaSync]
  );

  // Handle DROP table from modal
  const handleDropTable = useCallback(
    async (database: string, tableName: string) => {
      console.log('[handleDropTable] Input database:', database, 'tableName:', tableName);
      console.log('[handleDropTable] Available databases:', databases.map(d => ({ id: d.id, name: d.name })));
      console.log('[handleDropTable] Available tables (allTables):', allTables.map(t => ({ id: t.id, name: t.name, databaseId: t.databaseId })));
      
      // Find the table in Firebase - use allTables instead of tables
      const tableToDelete = allTables.find((t) => t.name === tableName);
      const dbObject = databases.find((d) => d.name === database);

      console.log('[handleDropTable] tableToDelete found:', !!tableToDelete, tableToDelete);
      console.log('[handleDropTable] dbObject found:', !!dbObject, dbObject);
      console.log('[handleDropTable] Match check:', tableToDelete?.databaseId === dbObject?.id);
      
      if (tableToDelete && dbObject && tableToDelete.databaseId === dbObject.id) {
        // Drop from PostgreSQL
        const dropQuery = `DROP TABLE "${tableName}"`;
        console.log('[handleDropTable] Executing query:', dropQuery, 'in database:', database, 'with userId:', user?.uid);
        const result = await executeQueryWithSchemaSync(database, dropQuery);
        console.log('[handleDropTable] Query result:', result);
        
        if (!result.success) {
          throw new Error(result.error);
        }

        addLog('success', `Table '${tableName}' dropped successfully`);
      } else {
        console.error('[handleDropTable] Table or database not found!', {
          tableFound: !!tableToDelete,
          dbFound: !!dbObject,
          tableDbMatch: tableToDelete?.databaseId === dbObject?.id,
        });
        throw new Error('Table not found');
      }
    },
    [allTables, databases, executeQueryWithSchemaSync, addLog, user?.uid]
  );

  // Handle terminal command - Execute real PostgreSQL queries
  const handleTerminalCommand = useCallback(
    async (command: string) => {
      const upperCommand = command.toUpperCase().trim();
      const trimmedCommand = command.trim();

      // Handle local commands (HELP, CLEAR)
      if (upperCommand === 'HELP' || upperCommand === '\\H') {
        addLog('info', 'Available commands (connected to PostgreSQL):');
        addLog('info', '  SHOW DATABASES    - List all databases');
        addLog('info', '  SHOW TABLES       - List tables in current database');
        addLog('info', '  USE <database>    - Select a database');
        addLog('info', '  DESCRIBE <table>  - Show table structure');
        addLog('info', '  SELECT ...        - Query data');
        addLog('info', '  INSERT ...        - Insert data');
        addLog('info', '  UPDATE ...        - Update data');
        addLog('info', '  DELETE ...        - Delete data');
        addLog('info', '  CREATE TABLE ...  - Create a new table');
        addLog('info', '  DROP TABLE ...    - Drop a table');
        addLog('info', '  CLEAR             - Clear terminal');

        // Show in workflow area
        const helpData = [
          { Command: 'SHOW DATABASES', Description: 'List all databases' },
          { Command: 'SHOW TABLES', Description: 'List tables in current database' },
          { Command: 'USE <database>', Description: 'Select a database' },
          { Command: 'DESCRIBE <table>', Description: 'Show table structure' },
          { Command: 'SELECT ...', Description: 'Query data' },
          { Command: 'INSERT ...', Description: 'Insert data' },
          { Command: 'UPDATE ...', Description: 'Update data' },
          { Command: 'DELETE ...', Description: 'Delete data' },
          { Command: 'CREATE TABLE ...', Description: 'Create a new table' },
          { Command: 'DROP TABLE ...', Description: 'Drop a table' },
          { Command: 'CLEAR', Description: 'Clear terminal' },
        ];
        setQueryResults({
          results: helpData,
          query: 'HELP',
        });
        return;
      }

      if (upperCommand === 'CLEAR' || upperCommand === '\\C') {
        setTerminalLogs([]);
        return;
      }

      // Handle SHOW DATABASES - fetch from PostgreSQL with user filter
      if (upperCommand === 'SHOW DATABASES' || upperCommand === 'SHOW DATABASES;') {
        addLog('info', 'Executing: SHOW DATABASES');

        try {
          const response = await authFetch(`/api/database/list`);
          const result = await response.json();

          if (result.success && result.databases) {
            const postgresDatabases = result.databases;

            if (postgresDatabases.length === 0) {
              addLog('info', '+--------------------+');
              addLog('info', '| Database           |');
              addLog('info', '+--------------------+');
              addLog('info', '+--------------------+');
              addLog('info', 'No databases found');

              setQueryResults({
                results: [],
                query: 'SHOW DATABASES',
              });
            } else {
              addLog('info', '+--------------------+');
              addLog('info', '| Database           |');
              addLog('info', '+--------------------+');
              postgresDatabases.forEach((db: { name: string }) => {
                addLog('info', `| ${db.name.padEnd(18)} |`);
              });
              addLog('info', '+--------------------+');
              addLog('info', `${postgresDatabases.length} row${postgresDatabases.length !== 1 ? 's' : ''} in set`);

              // Show in workflow area
              const dbData = postgresDatabases.map((db: { name: string }) => ({ Database: db.name }));
              setQueryResults({
                results: dbData,
                query: 'SHOW DATABASES',
              });
            }
          } else {
            addLog('error', `Error fetching databases: ${result.error || 'Unknown error'}`);
          }
        } catch (error) {
          addLog('error', 'Failed to fetch databases from PostgreSQL');
          console.error('Error fetching databases:', error);
        }
        return;
      }

      // Handle SHOW TABLES
      if (upperCommand === 'SHOW TABLES' || upperCommand === 'SHOW TABLES;') {
        if (!selectedDatabaseId) {
          addLog('error', 'No database selected. Use "USE <database>" first.');
          return;
        }

        const selectedDatabase = databases.find((d) => d.id === selectedDatabaseId);
        const currentTables = tables.filter((t) => t.databaseId === selectedDatabaseId);

        addLog('info', `Executing: SHOW TABLES from ${selectedDatabase?.name}`);

        if (currentTables.length === 0) {
          addLog('info', 'No tables found in database');
          setQueryResults({
            results: [],
            query: `SHOW TABLES FROM ${selectedDatabase?.name}`,
          });
        } else {
          addLog('info', '+--------------------+');
          addLog('info', `| Tables_in_${selectedDatabase?.name?.padEnd(8)} |`);
          addLog('info', '+--------------------+');
          currentTables.forEach((table) => {
            addLog('info', `| ${table.name.padEnd(18)} |`);
          });
          addLog('info', '+--------------------+');
          addLog('info', `${currentTables.length} row${currentTables.length !== 1 ? 's' : ''} in set`);

          // Show in workflow area
          const tableData = currentTables.map((t) => ({
            [`Tables_in_${selectedDatabase?.name}`]: t.name,
          }));
          setQueryResults({
            results: tableData,
            query: `SHOW TABLES FROM ${selectedDatabase?.name}`,
          });
        }
        return;
      }

      // Handle USE command - changes selected database locally
      if (upperCommand.startsWith('USE ')) {
        const dbName = trimmedCommand.substring(4).trim().replace(';', '');
        const targetDb = databases.find(
          (d) => d.name.toLowerCase() === dbName.toLowerCase()
        );
        if (targetDb) {
          // Update both React state AND the terminal ref immediately
          // This ensures the next query in the terminal uses the correct database
          setSelectedDatabaseId(targetDb.id);
          terminalDbRef.current = {
            id: targetDb.id,
            name: targetDb.name,
          };
          addLog('success', 'Database changed');
        } else {
          addLog('error', `ERROR 1049 (42000): Unknown database '${dbName}'`);
        }
        return;
      }

      // Handle CREATE DATABASE (convert to PostgreSQL CREATE SCHEMA)
      if (/^CREATE\s+DATABASE/i.test(upperCommand)) {
        if (databases.length >= 3) {
          setUpgradeReason('database');
          setIsUpgradeModalOpen(true);
          addLog('error', 'Error: Free plan limit reached. Maximum 3 databases allowed.');
          return;
        }

        const match = trimmedCommand.match(/CREATE\s+DATABASE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
        if (match && match[1]) {
          const dbName = match[1];

          try {
            addLog('info', `Executing: ${trimmedCommand}`);

            // Create schema in PostgreSQL
            const response = await authFetch('/api/database/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: dbName }),
            });

            const result = await response.json();

            if (result.success) {
              addLog('success', `Schema '${dbName}' created successfully`);

              // Create schema in Firebase
              const dbId = uuidv4();
              await setDoc(doc(db, 'databases', dbId), {
                name: dbName,
                userId: user?.uid,
                db_password_hash: '',
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
              });

              // Auto-select the newly created schema
              setSelectedDatabaseId(dbId);
              // Also update terminal ref so subsequent queries use the correct schema
              terminalDbRef.current = {
                id: dbId,
                name: dbName,
              };
              addLog('info', `Schema '${dbName}' added to workflow and selected`);
            } else {
              addLog('error', result.error || 'Failed to create schema');
            }
          } catch (error) {
            console.error('Error creating schema:', error);
            addLog('error', 'Failed to create schema');
          }
          return;
        }
      }

      // Get current database name for queries - use terminal ref as source of truth
      // This is synced immediately when USE is executed, avoiding async state timing issues
      if (!terminalDbRef.current) {
        addLog('error', 'No database selected. Use "USE <database>" first.');
        return;
      }
      const currentDatabaseName = terminalDbRef.current.name;

      // Execute query against PostgreSQL
      try {
        // Check limits before executing CREATE TABLE
        if (/^CREATE\s+TABLE/i.test(upperCommand)) {
          const currentDbId = terminalDbRef.current?.id || selectedDatabaseId;
          const currentTables = allTables.filter((t) => t.databaseId === currentDbId);
          
          if (currentTables.length >= 10) {
            setUpgradeReason('table');
            setIsUpgradeModalOpen(true);
            addLog('error', 'Error: Free plan limit reached. Maximum 10 tables allowed per database.');
            return;
          }
        }

        addLog('info', `Executing: ${trimmedCommand}`);

        const response = await authFetch('/api/query/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            database: currentDatabaseName,
            query: trimmedCommand,
          }),
        });

        const result = await response.json();

        if (result.success) {
          // Log formatted output
          if (result.formattedOutput && Array.isArray(result.formattedOutput)) {
            result.formattedOutput.forEach((line: string) => {
              addLog('success', line);
            });
          } else {
            addLog('success', 'Query executed successfully');
          }

          // If it's a SELECT query and has results, also show in panel
          if (upperCommand.startsWith('SELECT') && result.results && Array.isArray(result.results) && result.results.length > 0) {
            setQueryResults({
              results: result.results,
              query: trimmedCommand,
            });
          }

          // If it's a DESCRIBE query and has results, also show in panel
          if ((upperCommand.startsWith('DESCRIBE') || upperCommand.startsWith('DESC ')) && result.results && Array.isArray(result.results) && result.results.length > 0) {
            setQueryResults({
              results: result.results,
              query: trimmedCommand,
            });
          }

          // Handle schema-changing queries to update UI immediately
          if (/^CREATE\s+TABLE/i.test(upperCommand)) {
            // Extract table name from CREATE TABLE query
            const match = trimmedCommand.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
            if (match && match[1]) {
              const tableName = match[1];
              const dbId = terminalDbRef.current?.id || selectedDatabaseId;

              if (!dbId) {
                addLog('error', 'Error: No database selected. Use "USE <database>" first.');
                return;
              }

              // Fetch table structure from PostgreSQL
              try {
                const describeResponse = await authFetch('/api/table/describe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    database: currentDatabaseName,
                    table: tableName,
                  }),
                });
                const describeResult = await describeResponse.json();

                if (!describeResult.success) {
                  addLog('error', `Failed to describe table '${tableName}': ${describeResult.error || 'Unknown error'}`);
                  return;
                }

                if (!Array.isArray(describeResult.columns) || describeResult.columns.length === 0) {
                  addLog('warning', `Table '${tableName}' has no columns or couldn't be read`);
                  return;
                }

                // Convert PostgreSQL column info to our Column format
                // describeResult.columns already includes key information from the API
                const columns = describeResult.columns.map((col: any) => {
                  const column: Column = {
                    id: uuidv4(),
                    name: col.Field,
                    dataType: col.Type,
                    isPrimaryKey: col.Key === 'PRI',
                    isNotNull: col.Null === 'NO',
                    isUnique: col.Key === 'UNI',
                    defaultValue: col.Default,
                    isForeignKey: col.Key === 'MUL',
                    isAutoIncrement: (col.Extra || '').includes('auto_increment'),
                  };
                  return column;
                });

                // Add table to Firebase
                const tableId = uuidv4();
                const position = calculateTablePosition(dbId);

                const newTable: TableType = {
                  id: tableId,
                  name: tableName,
                  databaseId: dbId,
                  columns,
                  position,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                };

                await setDoc(doc(db, 'tables', tableId), {
                  name: tableName,
                  databaseId: dbId,
                  columns,
                  position,
                  createdAt: Timestamp.now(),
                  updatedAt: Timestamp.now(),
                });

                addLog('info', `Table '${tableName}' added to workflow`);

                // Update React state immediately to show table in canvas
                setTables((prevTables) => [...prevTables, newTable]);

                // Ensure selectedDatabaseId matches so Firebase listener picks up future updates
                if (selectedDatabaseId !== dbId) {
                  setSelectedDatabaseId(dbId);
                }

                // Log foreign key relationships
                columns.forEach((col: Column) => {
                  if (col.isForeignKey && col.foreignKeyReference) {
                    const fkTableName = getFKTableName(col.foreignKeyReference, tables);
                    const fkColumnName = getFKColumnName(col.foreignKeyReference, tables);
                    if (fkTableName && fkColumnName) {
                      addLog('info', `Foreign key linked: ${tableName}.${col.name} → ${fkTableName}.${fkColumnName}`);
                    }
                  }
                });
              } catch (err) {
                console.error('Error syncing table to Firebase:', err);
                addLog('error', `Failed to add table to workflow: ${err instanceof Error ? err.message : 'Unknown error'}`);
              }
            }
          } else if (upperCommand.startsWith('ALTER TABLE')) {
            // Handle ALTER TABLE to update columns live
            const match = trimmedCommand.match(/ALTER\s+TABLE\s+[`"]?(\w+)[`"]?/i);
            if (match && match[1] && selectedDatabaseId) {
              const tableName = match[1];
              const tableToUpdate = tables.find((t) =>
                t.name.toLowerCase() === tableName.toLowerCase() &&
                t.databaseId === selectedDatabaseId
              );

              if (tableToUpdate) {
                // Fetch updated table structure from PostgreSQL
                try {
                  const describeResponse = await authFetch('/api/table/describe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      database: currentDatabaseName,
                      table: tableName,
                    }),
                  });
                  const describeResult = await describeResponse.json();

                  if (describeResult.success && Array.isArray(describeResult.columns)) {
                    // Convert PostgreSQL column info to our Column format
                    // IMPORTANT: Preserve original column IDs to maintain canvas integrity and relationships
                    const updatedColumns = describeResult.columns.map((col: any) => {
                      // Find if this column existed before (match by name)
                      const existingColumn = tableToUpdate.columns.find((c) => c.name === col.Field);
                      
                      const column: Column = {
                        id: existingColumn?.id || uuidv4(), // Keep original ID if exists, new ID only for new columns
                        name: col.Field,
                        dataType: col.Type,
                        isPrimaryKey: col.Key === 'PRI',
                        isNotNull: col.Null === 'NO',
                        isUnique: col.Key === 'UNI',
                        defaultValue: col.Default,
                        isForeignKey: col.Key === 'MUL',
                        isAutoIncrement: (col.Extra || '').includes('auto_increment'),
                      };

                      return column;
                    });

                    // Update table in Firebase
                    await updateDoc(doc(db, 'tables', tableToUpdate.id), {
                      columns: updatedColumns,
                      updatedAt: Timestamp.now(),
                    });

                    addLog('info', `Table '${tableName}' structure updated in workflow`);

                    // Log foreign key relationships
                    updatedColumns.forEach((col: Column) => {
                      if (col.isForeignKey && col.foreignKeyReference) {
                        const fkTableName = getFKTableName(col.foreignKeyReference, tables);
                        const fkColumnName = getFKColumnName(col.foreignKeyReference, tables);
                        if (fkTableName && fkColumnName) {
                          addLog('info', `Foreign key linked: ${tableName}.${col.name} → ${fkTableName}.${fkColumnName}`);
                        }
                      }
                    });
                  }
                } catch (err) {
                  console.error('Error updating table structure:', err);
                }
              }
            }
          } else if (upperCommand.startsWith('DROP TABLE')) {
            // Extract table name from DROP TABLE query
            const match = trimmedCommand.match(/DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
            if (match && match[1]) {
              const tableName = match[1];

              // Find table with case-insensitive matching
              const tableToDelete = tables.find((t) =>
                t.name.toLowerCase() === tableName.toLowerCase() &&
                t.databaseId === selectedDatabaseId
              );

              if (tableToDelete) {
                // Delete from Firebase
                try {
                  await deleteDoc(doc(db, 'tables', tableToDelete.id));
                  if (selectedTableId === tableToDelete.id) {
                    setSelectedTableId(null);
                  }
                  addLog('info', `Table '${tableName}' removed from workflow`);
                } catch (err) {
                  console.error('Error removing table from Firebase:', err);
                  addLog('warning', `Failed to remove table '${tableName}' from workflow`);
                }
              } else {
                addLog('info', `Table '${tableName}' not found in workflow (dropped from PostgreSQL only)`);
              }

              // Small delay to ensure PostgreSQL has committed the DROP
              await new Promise(resolve => setTimeout(resolve, 200));
            }
          } else if (upperCommand.startsWith('DROP DATABASE')) {
            // Extract database name from DROP DATABASE query
            const match = trimmedCommand.match(/DROP\s+DATABASE\s+(?:IF\s+EXISTS\s+)?[`"]?(\w+)[`"]?/i);
            if (match && match[1]) {
              const dbName = match[1];
              const dbToDelete = databases.find((d) => d.name.toLowerCase() === dbName.toLowerCase());

              if (dbToDelete) {
                // Delete all tables in the database from Firebase
                const tablesToDelete = tables.filter((t) => t.databaseId === dbToDelete.id);
                for (const table of tablesToDelete) {
                  await deleteDoc(doc(db, 'tables', table.id));
                }

                // Delete database from Firebase
                await deleteDoc(doc(db, 'databases', dbToDelete.id));

                if (selectedDatabaseId === dbToDelete.id) {
                  setSelectedDatabaseId(null);
                }

                addLog('info', `Database '${dbName}' removed from workflow`);
              }
            }
          } else if (upperCommand.startsWith('INSERT INTO') || upperCommand.startsWith('UPDATE') || upperCommand.startsWith('DELETE FROM')) {
            // For data modification queries, just log success - data will be visible when queried
            addLog('info', 'Data modified successfully');
          }
        } else {
          // Log error
          if (result.formattedOutput && Array.isArray(result.formattedOutput)) {
            result.formattedOutput.forEach((line: string) => {
              addLog('error', line);
            });
          } else {
            addLog('error', result.error || 'Query execution failed');
          }
        }
      } catch (error) {
        console.error('Error executing query:', error);
        addLog('error', 'Failed to execute query. Check if PostgreSQL is running.');
      }
    },
    [databases, selectedDatabaseId, tables, selectedTableId, addLog]
  );

  // Handle quick SQL buttons
  const handleQuickSQL = useCallback(
    (type: 'CREATE' | 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'DROP') => {
      switch (type) {
        case 'CREATE':
          // If no databases exist, automatically create database
          if (databases.length === 0) {
            handleOpenCreateDatabase();
          } else {
            // Show choice modal
            setIsCreateChoiceModalOpen(true);
          }
          break;
        case 'INSERT':
          setIsInsertDataModalOpen(true);
          break;
        case 'SELECT':
          setIsSelectDataModalOpen(true);
          break;
        case 'UPDATE':
          setIsUpdateDataModalOpen(true);
          break;
        case 'DELETE':
          setIsDeleteDataModalOpen(true);
          break;
        case 'DROP':
          setIsDropModalOpen(true);
          break;
      }
    },
    [selectedDatabaseId]
  );

  // Get selected database name
  const selectedDatabaseName = useMemo(() => {
    return databases.find((d) => d.id === selectedDatabaseId)?.name || '';
  }, [databases, selectedDatabaseId]);

  // Get tables for selected database
  const tablesForSelectedDb = useMemo(() => {
    return tables.filter((t) => t.databaseId === selectedDatabaseId);
  }, [tables, selectedDatabaseId]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`h-screen flex flex-col ${THEMES[currentTheme as keyof typeof THEMES]?.bg || THEMES.light.bg}`}
    >
      {/* Navbar */}
      <Navbar
        onPresentationMode={() => {
          if (selectedDatabaseId) {
            router.push(`/presentation?db=${selectedDatabaseId}&theme=${currentTheme}`);
          }
        }}
        onTerminalMode={() => {
          if (selectedDatabaseId) {
            router.push(`/terminal-mode?db=${selectedDatabaseId}`);
          }
        }}
        onMobileMenuToggle={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        onComposerToggle={() => setIsComposerOpen(prev => !prev)}
        isComposerOpen={isComposerOpen}
        showModeButtons={!!selectedDatabaseId}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
        selectedDatabaseName={databases.find(db => db.id === selectedDatabaseId)?.name}
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 flex overflow-hidden relative"
      >
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
                className="md:hidden fixed inset-0 z-30 bg-black/40"
              />

              {/* Mobile Sidebar */}
              <motion.div
                initial={{ x: -260 }}
                animate={{ x: 0 }}
                exit={{ x: -260 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`absolute left-0 top-0 bottom-0 w-60 z-40 ${THEMES[currentTheme as keyof typeof THEMES]?.sidebar || THEMES.light.sidebar} border-r flex flex-col h-full backdrop-blur-xl shadow-lg shadow-gray-200/10`}
              >
                <Sidebar
                  databases={databases}
                  tables={tables}
                  allTables={allTables}
                  selectedDatabaseId={selectedDatabaseId}
                  selectedTableId={selectedTableId}
                  user={user}
                  onSelectDatabase={(dbId) => {
                    setSelectedDatabaseId(dbId);
                    setIsMobileSidebarOpen(false);
                  }}
                  onSelectTable={(tableId) => {
                    setSelectedTableId(tableId);
                    setIsMobileSidebarOpen(false);
                  }}
                  onCreateDatabase={() => {
                    handleOpenCreateDatabase();
                    setIsMobileSidebarOpen(false);
                  }}
                  onCreateTable={() => {
                    handleOpenCreateTable();
                    setIsMobileSidebarOpen(false);
                  }}
                  onDeleteDatabase={handleDeleteDatabase}
                  onDeleteTable={handleDeleteTable}
                  onQuickSQL={handleQuickSQL}
                  onEditTable={handleEditTable}
                  onManageForeignKeys={() => {
                    setIsForeignKeyModalOpen(true);
                    setIsMobileSidebarOpen(false);
                  }}
                  onOpenSettings={() => {
                    router.push('/settings');
                    setIsMobileSidebarOpen(false);
                  }}
                  onViewProfile={() => {
                    router.push('/profile');
                    setIsMobileSidebarOpen(false);
                  }}
                  onTerminalMode={() => {
                    if (selectedDatabaseId) {
                      router.push(`/terminal-mode?db=${selectedDatabaseId}`);
                    }
                    setIsMobileSidebarOpen(false);
                  }}
                  onPresentationMode={() => {
                    if (selectedDatabaseId) {
                      router.push(`/presentation?db=${selectedDatabaseId}&theme=${currentTheme}`);
                    }
                    setIsMobileSidebarOpen(false);
                  }}
                  showModeButtons={!!selectedDatabaseId}
                  onLogout={handleLogout}
                  theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <Sidebar
          databases={databases}
          tables={tables}
          allTables={allTables}
          selectedDatabaseId={selectedDatabaseId}
          selectedTableId={selectedTableId}
          user={user}
          onSelectDatabase={setSelectedDatabaseId}
          onSelectTable={setSelectedTableId}
          onCreateDatabase={() => handleOpenCreateDatabase()}
          onCreateTable={() => handleOpenCreateTable()}
          onDeleteDatabase={handleDeleteDatabase}
          onDeleteTable={handleDeleteTable}
          onQuickSQL={handleQuickSQL}
          onEditTable={handleEditTable}
          onManageForeignKeys={() => setIsForeignKeyModalOpen(true)}
          onOpenSettings={() => router.push('/settings')}
          onViewProfile={() => router.push('/profile')}
          onTerminalMode={() => {
            if (selectedDatabaseId) {
              router.push(`/terminal-mode?db=${selectedDatabaseId}`);
            }
          }}
          onPresentationMode={() => {
            if (selectedDatabaseId) {
              router.push(`/presentation?db=${selectedDatabaseId}&theme=${currentTheme}`);
            }
          }}
          showModeButtons={!!selectedDatabaseId}
          onLogout={handleLogout}
          theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
          isCollapsed={isSidebarCollapsed}
        />

        {/* Toggle Sidebar Button */}
        <div className="relative z-40 hidden md:flex items-center w-0 h-full">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`absolute top-1/2 -translate-y-1/2 w-6 h-16 flex items-center justify-center shadow-md transition-all duration-300 z-50 cursor-pointer ${
              currentTheme === 'dark'
                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50'
            } ${
              isSidebarCollapsed
                ? 'left-0 rounded-r-md border-l-0 border-y border-r'
                : '-left-3 rounded-full border'
            }`}
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col overflow-hidden p-2 sm:p-3 md:p-4">
          {/* React Flow Canvas */}
          <div className="flex-1 relative" ref={workflowRef}>
            {selectedDatabaseId ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="h-full rounded-xl overflow-hidden border border-gray-200 bg-white"
              >
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onNodeDragStop={onNodeDragStop}
                  nodeTypes={nodeTypes}
                  edgeTypes={edgeTypes}
                  fitViewOptions={{
                    padding: 0.2,
                  }}
                  defaultViewport={{ x: 0, y: 0, zoom: 0.75 }}
                  proOptions={{ hideAttribution: true }}
                  className={THEMES[currentTheme as keyof typeof THEMES]?.bg || THEMES.light.bg}
                >
                  <div data-html2canvas-ignore="true">
                    <Controls
                      className="bg-white border border-gray-200 rounded-lg"
                    />
                  </div>
                </ReactFlow>
              </motion.div>
            ) : (
              <div className={`h-full flex items-center justify-center rounded-2xl ${THEMES[currentTheme as keyof typeof THEMES]?.bg || THEMES.light.bg}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="text-center max-w-lg mx-auto px-8"
                >
                  {/* Clean, minimal icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className={`w-14 h-14 ${currentTheme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-gray-100 border-gray-200'} border rounded-xl flex items-center justify-center mx-auto mb-6`}
                  >
                    <svg
                      className={`w-6 h-6 ${currentTheme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`text-2xl font-light ${THEMES[currentTheme as keyof typeof THEMES]?.text || 'text-gray-900'} mb-3`}
                    style={{ fontFamily: 'var(--font-geist-sans)', letterSpacing: '-0.01em' }}
                  >
                    Design your database
                  </motion.h2>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className={`text-sm ${THEMES[currentTheme as keyof typeof THEMES]?.textSecondary || 'text-gray-500'} mb-8 max-w-sm mx-auto leading-relaxed`}
                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                  >
                    Create tables, define columns, and set up relationships visually. Select a database from the sidebar or create a new one.
                  </motion.p>

                  {/* Action button */}
                  <motion.button
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOpenCreateDatabase()}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 ${currentTheme === 'dark' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-900 text-white hover:bg-gray-800'} rounded-lg transition-colors text-sm font-medium`}
                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    New database
                  </motion.button>

                  {/* Keyboard shortcut hint */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={`text-xs ${currentTheme === 'dark' ? 'text-slate-500' : 'text-gray-400'} mt-4`}
                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                  >
                    or select from the sidebar
                  </motion.p>
                </motion.div>
              </div>
            )}

            {/* Table count badge and Export Button */}
            <AnimatePresence>
              {selectedDatabaseId && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-8 right-8 space-y-3 z-10"
                  data-html2canvas-ignore="true"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`${currentTheme === 'dark' ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-gray-300'} backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-md border`}
                  >
                    <p className={`text-[13px] ${THEMES[currentTheme as keyof typeof THEMES]?.textSecondary || 'text-gray-600'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                      <span className={`font-medium ${THEMES[currentTheme as keyof typeof THEMES]?.text || 'text-gray-900'}`}>
                        {selectedDatabaseName}
                      </span>
                      <span className="mx-1.5">·</span>
                      {tablesForSelectedDb.length} {tablesForSelectedDb.length === 1 ? 'table' : 'tables'}
                    </p>
                  </motion.div>

                  {/* Export Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsExportModalOpen(true)}
                    className="w-full bg-black hover:bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-md text-[13px] flex items-center justify-center gap-2 transition-colors"
                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export
                  </motion.button>

                  {/* Import Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsImportModalOpen(true)}
                    className="w-full bg-black hover:bg-gray-900 text-white px-4 py-2.5 rounded-xl shadow-md text-[13px] flex items-center justify-center gap-2 transition-colors"
                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                  >
                    <Upload className="w-4 h-4" />
                    Import
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Query Results Panel */}
            <AnimatePresence>
              {queryResults && (
                <QueryResultsPanel
                  results={queryResults.results}
                  query={queryResults.query}
                  onClose={() => setQueryResults(null)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Terminal */}
          <Terminal
            logs={terminalLogs}
            onCommand={handleTerminalCommand}
            isMinimized={isTerminalMinimized}
            onToggleMinimize={() => setIsTerminalMinimized(!isTerminalMinimized)}
          />
        </div>
      </motion.div>



      {/* Create Choice Modal */}
      <CreateChoiceModal
        isOpen={isCreateChoiceModalOpen}
        onClose={() => setIsCreateChoiceModalOpen(false)}
        onChoose={(choice) => {
          if (choice === 'database') {
            handleOpenCreateDatabase();
          } else {
            handleOpenCreateTable();
          }
        }}
        hasSelectedDatabase={!!selectedDatabaseId}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Create Database Modal */}
      <CreateDatabaseModal
        isOpen={isCreateDbModalOpen}
        onClose={() => setIsCreateDbModalOpen(false)}
        onCreate={handleCreateDatabase}
        existingNames={databases.map((d) => d.name)}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Create Table Modal */}
      <CreateTableModal
        isOpen={isCreateTableModalOpen}
        onClose={() => setIsCreateTableModalOpen(false)}
        onCreate={handleCreateTable}
        existingTables={tablesForSelectedDb}
        databaseName={selectedDatabaseName}
        onInsertData={handleInsertData}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Edit Table Modal */}
      <EditTableModal
        isOpen={isEditTableModalOpen}
        onClose={() => {
          setIsEditTableModalOpen(false);
          setEditingTableId(null);
        }}
        table={tables.find((t) => t.id === editingTableId) || null}
        onUpdate={handleUpdateTable}
        existingTables={tablesForSelectedDb}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Insert Data Modal */}
      <InsertDataModal
        isOpen={isInsertDataModalOpen}
        onClose={() => setIsInsertDataModalOpen(false)}
        databases={databases}
        tables={tables}
        selectedDatabaseId={selectedDatabaseId}
        userId={user?.uid}
        onInsert={handleInsertData}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Update Data Modal */}
      <UpdateDataModal
        isOpen={isUpdateDataModalOpen}
        onClose={() => setIsUpdateDataModalOpen(false)}
        databases={databases}
        tables={tables}
        selectedDatabaseId={selectedDatabaseId}
        userId={user?.uid}
        onExecuteQuery={executeQuery}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Delete Data Modal */}
      <DeleteDataModal
        isOpen={isDeleteDataModalOpen}
        onClose={() => setIsDeleteDataModalOpen(false)}
        databases={databases}
        tables={tables}
        selectedDatabaseId={selectedDatabaseId}
        userId={user?.uid}
        onExecuteQuery={executeQuery}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Select Data Modal */}
      <SelectDataModal
        isOpen={isSelectDataModalOpen}
        onClose={() => setIsSelectDataModalOpen(false)}
        databases={databases}
        tables={tables}
        selectedDatabaseId={selectedDatabaseId}
        userId={user?.uid}
        onExecuteQuery={executeQuery}
        onShowResults={(results, query) => {
          setQueryResults({ results, query });
        }}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Drop Modal */}
      <DropModal
        isOpen={isDropModalOpen}
        onClose={() => setIsDropModalOpen(false)}
        databases={databases}
        tables={allTables}
        selectedDatabaseId={selectedDatabaseId}
        userId={user?.uid}
        onDropDatabase={handleDeleteDatabase}
        onDropTable={handleDropTable}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Foreign Key Modal */}
      <ForeignKeyModal
        isOpen={isForeignKeyModalOpen}
        onClose={() => setIsForeignKeyModalOpen(false)}
        tables={tablesForSelectedDb}
        onAddForeignKey={handleAddForeignKey}
        onRemoveForeignKey={handleRemoveForeignKey}
        databaseName={selectedDatabaseName}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        databaseName={selectedDatabaseName}
        tables={tablesForSelectedDb}
        workflowRef={workflowRef}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Import Modal */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleSQLImport}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />

      {/* Upgrade Plan Modal */}
      <UpgradePlanModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        reason={upgradeReason}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />


      {/* DB Composer Sidebar */}
      <DBComposer
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        onOpen={() => setIsComposerOpen(true)}
        userId={user?.uid}
        databases={databases}
        tables={tables}
        selectedDatabaseId={selectedDatabaseId}
        setSelectedDatabaseId={setSelectedDatabaseId}
        addLog={addLog}
        theme={THEMES[currentTheme as keyof typeof THEMES] || THEMES.light}
      />
    </motion.div>
  );
}