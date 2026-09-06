'use client';

/**
 * DBComposer — Cursor-style AI Sidebar for structured database schema generation & session management.
 *
 * Features:
 * - Multi-session persistence in Firestore via useComposerSessions
 * - Two-panel layout: Left session manager + Right chat thread
 * - Instant "+" new chat creation & trash session deletion
 * - Real-time canvas mutations via useComposerActions
 * - Collapsible "Actions Applied" detail panel
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Database,
  Table2,
  MessageSquare,
  Trash2,
  Plus,
  Clock,
  Minus,
  Wand2,
  Sparkles,
} from 'lucide-react';

// Prevent Turbopack HMR cache errors in active browser sessions
const _hmrCompat = [Wand2, Sparkles];
import type { ComposerAction, ComposerChatMessage, ComposerSession } from '@/types/composer';
import { useComposerActions, type UseComposerActionsParams } from '@/hooks/useComposerActions';
import { useComposerSessions } from '@/hooks/useComposerSessions';
import { v4 as uuidv4 } from 'uuid';

// ─── Props ─────────────────────────────────────────────────────────────────
export interface DBComposerProps extends UseComposerActionsParams {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  theme?: {
    navbar?: string;
    text?: string;
    textSecondary?: string;
    modal?: string;
    button?: string;
    buttonSecondary?: string;
    bg?: string;
  };
}

// ─── Relative time formatter ───────────────────────────────────────────────
function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// ─── Action summary label ──────────────────────────────────────────────────
function actionLabel(action: ComposerAction): string {
  switch (action.type) {
    case 'CREATE_DATABASE':
      return `Created database "${action.databaseName}" with ${action.tables?.length || 0} tables`;
    case 'ADD_TABLE':
      return `Added table "${action.tableName}" (${action.columns.length} columns)`;
    case 'ADD_COLUMN':
      return `Added column "${action.column.name}" to "${action.tableName}"`;
    case 'ADD_RELATIONSHIP':
      return `Linked ${action.fromTable}.${action.fromColumn} → ${action.toTable}.${action.toColumn}`;
    case 'DELETE_TABLE':
      return `Dropped table "${action.tableName}"`;
    case 'RENAME_TABLE':
      return `Renamed "${action.oldName}" → "${action.newName}"`;
    case 'EXECUTE_SQL':
      return `Executed ${action.sql?.length || 0} SQL queries`;
    case 'EXPLAIN':
      return action.message.slice(0, 80) + (action.message.length > 80 ? '…' : '');
  }
}

function actionIcon(type: ComposerAction['type']) {
  switch (type) {
    case 'CREATE_DATABASE':
      return <Database className="w-3.5 h-3.5" />;
    case 'ADD_TABLE':
    case 'DELETE_TABLE':
    case 'RENAME_TABLE':
      return <Table2 className="w-3.5 h-3.5" />;
    default:
      return <Bot className="w-3.5 h-3.5" />;
  }
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function DBComposer(props: DBComposerProps) {
  const { isOpen, onClose, theme, userId, selectedDatabaseId, ...actionParams } = props;
  const { executeActions } = useComposerActions({ userId, selectedDatabaseId, ...actionParams });

  // Hook for Firestore-persisted sessions
  const {
    sessions,
    activeSession,
    activeSessionId,
    setActiveSessionId,
    createNewSession,
    appendMessages,
    updateMessage,
    deleteSession,
    isLoading: isSessionsLoading,
  } = useComposerSessions(userId, selectedDatabaseId);

  // Local UI state
  const [inputValue, setInputValue] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [expandedActions, setExpandedActions] = useState<Record<string, boolean>>({});
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Active messages derived from current active session
  const messages = useMemo(() => {
    return activeSession?.messages || [];
  }, [activeSession]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when sidebar opens or active session changes
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, activeSessionId]);

  // Build canvas context string for the AI
  const canvasContext = useMemo(() => {
    if (!actionParams.tables || actionParams.tables.length === 0) return undefined;
    return actionParams.tables
      .map(t => {
        const cols = t.columns
          .map(c => {
            let desc = `${c.name} ${c.dataType}`;
            if (c.isPrimaryKey) desc += ' PK';
            if (c.isForeignKey) desc += ' FK';
            if (c.isNotNull) desc += ' NOT NULL';
            return desc;
          })
          .join(', ');
        return `Table "${t.name}" (${cols})`;
      })
      .join('\n');
  }, [actionParams.tables]);

  // Build chat history array for Gemini multi-turn API
  const chatHistory = useMemo(() => {
    return messages
      .filter(m => m.status === 'done')
      .map(m => ({ role: m.role, content: m.content }));
  }, [messages]);

  // ── New Session Handler ───────────────────────────────────────────────
  const handleNewSession = useCallback(async () => {
    if (isCreatingSession) return;
    setIsCreatingSession(true);
    try {
      await createNewSession();
      setInputValue('');
    } finally {
      setIsCreatingSession(false);
    }
  }, [createNewSession, isCreatingSession]);

  // ── Send Message Handler ──────────────────────────────────────────────
  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isPending) return;

    // Guarantee an active session exists
    let targetSessionId = activeSessionId;
    if (!targetSessionId) {
      targetSessionId = await createNewSession();
    }

    // 1. Create and append user message
    const userMsgId = uuidv4();
    const userMsg: ComposerChatMessage = {
      id: userMsgId,
      role: 'user',
      content: text,
      timestamp: Date.now(),
      status: 'done',
    };

    // 2. Create and append pending assistant message
    const assistantMsgId = uuidv4();
    const pendingAssistantMsg: ComposerChatMessage = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      status: 'pending',
    };

    setInputValue('');
    setIsPending(true);

    // Persist user + pending assistant turn into Firestore atomically
    await appendMessages(targetSessionId, [userMsg, pendingAssistantMsg]);

    try {
      // 3. Call API in composer mode
      const response = await fetch('/api/chat/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          mode: 'composer',
          chatHistory,
          canvasContext,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        await updateMessage(targetSessionId, assistantMsgId, {
          content: data.error || 'Failed to get response from AI.',
          status: 'error',
        });
        setIsPending(false);
        return;
      }

      const actions: ComposerAction[] = data.actions || [];
      const summary: string = data.summary || 'Actions completed.';

      // 4. Execute actions on the React Flow canvas + Firestore
      let execResult;
      if (actions.length > 0 && !actions.every(a => a.type === 'EXPLAIN')) {
        execResult = await executeActions(actions);
      }

      const finalStatus = execResult && !execResult.success ? 'error' : 'done';
      const finalSummary =
        execResult && !execResult.success ? `${summary} (Note: ${execResult.summary})` : summary;

      // 5. Update assistant message with final content, actions, and status
      await updateMessage(targetSessionId, assistantMsgId, {
        content: finalSummary,
        actions,
        status: finalStatus,
      });

      // Auto-expand actions panel
      setExpandedActions(prev => ({ ...prev, [assistantMsgId]: true }));
    } catch (err: any) {
      await updateMessage(targetSessionId, assistantMsgId, {
        content: err.message || 'Network error.',
        status: 'error',
      });
    } finally {
      setIsPending(false);
    }
  }, [
    inputValue,
    isPending,
    activeSessionId,
    createNewSession,
    appendMessages,
    chatHistory,
    canvasContext,
    executeActions,
    updateMessage,
  ]);

  // ── Key Handler ────────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  // ── Toggle Action Expansion ───────────────────────────────────────────
  const toggleActions = useCallback((msgId: string) => {
    setExpandedActions(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  }, []);

  // ── Auto-resize Textarea ─────────────────────────────────────────────
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, []);

  // Dark mode detection
  const isDark = theme?.navbar?.includes('slate') || theme?.bg?.includes('slate');

  return (
    <>
      {/* Floating Trigger Button when closed */}
      {!isOpen && props.onOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={props.onOpen}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black text-white hover:bg-gray-900 shadow-2xl border border-white/10 font-medium text-xs transition-all cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-white" />
          </div>
          <span style={{ fontFamily: 'var(--font-geist-sans)' }}>Schema Pilot</span>
          <span className="text-[10px] bg-white/15 text-white/80 px-2 py-0.5 rounded-full font-mono">⌘K</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed z-50 flex flex-col rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden backdrop-blur-2xl bg-gray-950/95"
            style={{
              width: 390,
              top: '80px',
              bottom: '16px',
              right: '16px',
              height: 'calc(100vh - 96px)',
              maxHeight: 'calc(100vh - 96px)',
              background: 'linear-gradient(145deg, #1e1e1e 0%, #121212 100%)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
            }}
          >
            <div className="relative flex flex-col h-full w-full overflow-hidden">
              {/* Top Bar with Branding & Controls */}
              <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/[0.08] flex-shrink-0 select-none">
                {/* Left: History & New Session */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsHistoryOpen(prev => !prev)}
                    className={`p-1.5 rounded-lg text-xs transition-all ${
                      isHistoryOpen
                        ? 'bg-white/15 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                    title="Session History"
                  >
                    <Clock className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNewSession}
                    disabled={isCreatingSession}
                    className="p-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all disabled:opacity-40"
                    title="New Session"
                  >
                    {isCreatingSession ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Center: Schema Pilot label */}
                <div className="flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-white" />
                  <span className="text-xs font-normal text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                    Schema Pilot
                  </span>
                </div>

                {/* Right: Minimize/Close */}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                  title="Close Composer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* ──────────────────────────────────────────────────────────── */}
              {/* SESSION HISTORY DROPDOWN (opt-in, slide-down)               */}
              {/* ──────────────────────────────────────────────────────────── */}
              <AnimatePresence>
                {isHistoryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', damping: 26, stiffness: 340 }}
                    className={`overflow-hidden border-b flex-shrink-0 ${
                      isDark ? 'border-slate-800' : 'border-gray-200'
                    }`}
                  >
                    <div
                      className={`px-3 pt-2 pb-2 ${
                        isDark ? 'bg-slate-900/60' : 'bg-gray-50/80'
                      }`}
                    >
                      {/* Dropdown header */}
                      <div className="flex items-center justify-between mb-2 px-1">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                          isDark ? 'text-slate-500' : 'text-gray-400'
                        }`}>
                          Session History
                        </span>
                        <span className={`text-[10px] tabular-nums ${
                          isDark ? 'text-slate-600' : 'text-gray-300'
                        }`}>
                          {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'}
                        </span>
                      </div>

                      {/* Session entries */}
                      <div className="space-y-0.5 max-h-[220px] overflow-y-auto">
                        {isSessionsLoading ? (
                          <div className="space-y-1.5 py-1 px-1">
                            {[1, 2, 3].map(i => (
                              <div
                                key={i}
                                className={`h-9 rounded-lg animate-pulse ${
                                  isDark ? 'bg-slate-800/60' : 'bg-gray-200/60'
                                }`}
                              />
                            ))}
                          </div>
                        ) : sessions.length === 0 ? (
                          <div className={`text-center py-5 text-xs ${
                            isDark ? 'text-slate-500' : 'text-gray-400'
                          }`}>
                            No sessions yet. Start a new chat!
                          </div>
                        ) : (
                          sessions.map(session => {
                            const isActive = session.id === activeSessionId;
                            return (
                              <motion.div
                                key={session.id}
                                whileHover={{ x: 2 }}
                                onClick={() => {
                                  setActiveSessionId(session.id);
                                  setIsHistoryOpen(false);
                                }}
                                className={`group flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-all ${
                                  isActive
                                    ? isDark
                                      ? 'bg-slate-800 text-white'
                                      : 'bg-white text-gray-900 shadow-sm'
                                    : isDark
                                      ? 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                    isActive
                                      ? 'bg-emerald-400'
                                      : isDark ? 'bg-slate-700' : 'bg-gray-300'
                                  }`} />
                                  <span className="text-xs truncate font-medium">
                                    {session.title || 'New Chat'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                                  <span className={`text-[10px] tabular-nums ${
                                    isDark ? 'text-slate-600' : 'text-gray-400'
                                  }`}>
                                    {formatRelativeTime(session.updatedAt)}
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteSession(session.id);
                                    }}
                                    className={`opacity-0 group-hover:opacity-100 p-0.5 rounded transition-opacity ${
                                      isDark
                                        ? 'hover:bg-slate-700 text-slate-500 hover:text-red-400'
                                        : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'
                                    }`}
                                    title="Delete session"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ──────────────────────────────────────────────────────────── */}
              {/* CHAT AREA: Messages & Input (full-width)                    */}
              {/* ──────────────────────────────────────────────────────────── */}
              <div className="flex-1 flex flex-col min-h-0">

                {/* ─── Chat Area ──────────────────────────────────── */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
                  {/* Welcome state */}
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center h-full gap-4 py-6"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shadow-md">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center space-y-1">
                        <h3 className="text-sm font-normal text-white" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                          What would you like to build?
                        </h3>
                        <p className="text-xs font-light text-gray-400 max-w-[240px] leading-relaxed" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                          Describe your database schema. Changes apply directly to your canvas.
                        </p>
                      </div>

                      {/* Suggestion chips */}
                      <div className="flex flex-col gap-2 w-full px-1">
                        {[
                          'Create a car dealership database with cars, owners, and services tables',
                          'Build a student management system with grades and courses',
                          'Add a payments table with a foreign key to users',
                        ].map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setInputValue(suggestion);
                              inputRef.current?.focus();
                            }}
                            className="text-left px-3 py-2.5 rounded-xl text-xs transition-all bg-white/[0.03] hover:bg-white/[0.07] text-gray-300 border border-white/[0.08] hover:border-white/20"
                            style={{ fontFamily: 'var(--font-geist-sans)' }}
                          >
                            <span className="opacity-40 mr-1.5">→</span>
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Messages */}
                  {messages.map(msg => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'user' ? (
                        /* User bubble */
                        <div className="max-w-[88%]">
                          <div className="rounded-2xl rounded-tr-sm px-4 py-2.5 text-xs bg-white text-black font-normal shadow-md" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                        /* Assistant bubble */
                        <div className="max-w-[94%] space-y-2">
                          {msg.status === 'pending' ? (
                            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.08] text-gray-400 text-xs">
                              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                              <span style={{ fontFamily: 'var(--font-geist-sans)' }}>Composing schema...</span>
                            </div>
                          ) : msg.status === 'error' ? (
                            <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm border border-red-500/20 bg-red-950/20 text-red-300 text-xs">
                              <div className="flex items-center gap-1.5 mb-1 text-red-400">
                                <XCircle className="w-3.5 h-3.5" />
                                <span className="font-medium">Error</span>
                              </div>
                              <p>{msg.content}</p>
                            </div>
                          ) : (
                            <>
                              {/* Summary text */}
                              <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm text-xs bg-white/[0.05] border border-white/[0.08] text-gray-200 font-light leading-relaxed" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                {msg.content}
                              </div>

                              {/* Collapsible actions panel */}
                              {msg.actions && msg.actions.length > 0 && !msg.actions.every(a => a.type === 'EXPLAIN') && (
                                <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-white/[0.02]">
                                  <button
                                    onClick={() => toggleActions(msg.id)}
                                    className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-medium text-gray-400 hover:bg-white/[0.05] transition-colors"
                                  >
                                    <span className="flex items-center gap-1.5">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                      {msg.actions.filter(a => a.type !== 'EXPLAIN').length} actions applied
                                    </span>
                                    {expandedActions[msg.id] ? (
                                      <ChevronDown className="w-3.5 h-3.5" />
                                    ) : (
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    )}
                                  </button>

                                  <AnimatePresence>
                                    {expandedActions[msg.id] && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="px-3 pb-2 space-y-1 border-t border-white/[0.08]">
                                          {msg.actions
                                            .filter(a => a.type !== 'EXPLAIN')
                                            .map((action, idx) => (
                                              <div
                                                key={idx}
                                                className="flex items-center gap-2 py-1 text-[11px] text-gray-400"
                                              >
                                                <span className="text-emerald-400">
                                                  {actionIcon(action.type)}
                                                </span>
                                                <span className="truncate">{actionLabel(action)}</span>
                                              </div>
                                            ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )}

                              {/* EXPLAIN content */}
                              {msg.actions
                                ?.filter(a => a.type === 'EXPLAIN')
                                .map((a, i) => (
                                  <div
                                    key={i}
                                    className="px-3.5 py-2.5 rounded-xl text-xs border border-white/[0.08] bg-white/[0.03] text-gray-300 font-light"
                                  >
                                    <MessageSquare className="w-3.5 h-3.5 inline mr-1.5 opacity-60" />
                                    {a.type === 'EXPLAIN' ? a.message : ''}
                                  </div>
                                ))}
                            </>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="px-3 pb-3 pt-2 border-t border-white/[0.08]">
                  <div className="flex items-end gap-2 rounded-xl border border-white/[0.08] bg-[#161616] px-3 py-2 focus-within:border-white/20 transition-colors">
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Describe your schema changes..."
                      rows={1}
                      className="flex-1 resize-none bg-transparent text-xs outline-none py-0.5 text-white placeholder:text-gray-500 font-light"
                      style={{ maxHeight: 110, fontFamily: 'var(--font-geist-sans)' }}
                      disabled={isPending}
                    />
                    <button
                      onClick={handleSend}
                      disabled={isPending || !inputValue.trim()}
                      className="p-1.5 rounded-lg bg-white text-black hover:bg-gray-200 disabled:bg-white/10 disabled:text-gray-600 transition-all shrink-0"
                    >
                      {isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] mt-1.5 text-center text-gray-500 font-light" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                    AI will apply schema mutations directly to your canvas
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
