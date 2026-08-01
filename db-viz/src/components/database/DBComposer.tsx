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
  X,
  Send,
  Wand2,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Sparkles,
  Database,
  Table2,
  MessageSquare,
  Trash2,
  Plus,
  Clock,
} from 'lucide-react';
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
      return <Sparkles className="w-3.5 h-3.5" />;
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
    appendMessage,
    updateMessage,
    deleteSession,
    isLoading: isSessionsLoading,
  } = useComposerSessions(userId, selectedDatabaseId);

  // Local UI state
  const [inputValue, setInputValue] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [expandedActions, setExpandedActions] = useState<Record<string, boolean>>({});

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

    // Persist user + pending assistant turn into Firestore
    await appendMessage(targetSessionId, userMsg);
    await appendMessage(targetSessionId, pendingAssistantMsg);

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
    appendMessage,
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
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={props.onOpen}
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all border font-medium text-sm ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-white shadow-black/40 border-slate-600'
              : 'bg-gray-900 hover:bg-black text-white shadow-gray-900/25 border-gray-800'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
            <Wand2 className="w-3.5 h-3.5 text-white" />
          </div>
          <span>Schema Pilot</span>
          <span className="text-[10px] bg-white/15 text-white px-2 py-0.5 rounded-full font-mono font-medium">⌘K</span>
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 560, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 560, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full z-50 flex"
            style={{ width: 540 }}
          >
            {/* ─── Glass background ──────────────────────────────── */}
            <div
              className={`absolute inset-0 ${
                isDark
                  ? 'bg-slate-950/95 border-l border-slate-800'
                  : 'bg-white/95 border-l border-gray-200'
              } backdrop-blur-xl`}
            />

            <div className="relative flex h-full w-full overflow-hidden">
              {/* ──────────────────────────────────────────────────────────── */}
              {/* LEFT PANEL: Sessions Manager (~170px)                     */}
              {/* ──────────────────────────────────────────────────────────── */}
              <div
                className={`w-[170px] flex flex-col border-r h-full flex-shrink-0 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-gray-50/90 border-gray-200'
                }`}
              >
                {/* Session Manager Header */}
                <div className={`p-3 border-b flex items-center justify-between ${
                  isDark ? 'border-slate-800' : 'border-gray-200'
                }`}>
                  <span className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-gray-500'
                  }`}>
                    Sessions
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNewSession}
                    disabled={isCreatingSession}
                    className={`p-1.5 rounded-lg border transition-all flex items-center justify-center ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                        : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-300'
                    }`}
                    title="Start new chat session (+)"
                  >
                    {isCreatingSession ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </motion.button>
                </div>

                {/* Session List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                  {isSessionsLoading ? (
                    /* Skeletons */
                    <div className="space-y-2 py-2 px-1">
                      {[1, 2, 3].map(i => (
                        <div
                          key={i}
                          className={`h-10 rounded-lg animate-pulse ${
                            isDark ? 'bg-slate-800/60' : 'bg-gray-200/60'
                          }`}
                        />
                      ))}
                    </div>
                  ) : sessions.length === 0 ? (
                    <div className={`text-center py-6 text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                      No chats yet
                    </div>
                  ) : (
                    sessions.map(session => {
                      const isActive = session.id === activeSessionId;
                      return (
                        <motion.div
                          key={session.id}
                          whileHover={{ x: 1 }}
                          onClick={() => setActiveSessionId(session.id)}
                          className={`group relative flex flex-col px-2.5 py-2 rounded-xl text-left cursor-pointer transition-all border ${
                            isActive
                              ? isDark
                                ? 'bg-slate-800 text-white border-slate-700 shadow-sm'
                                : 'bg-white text-gray-900 border-gray-300 shadow-sm font-medium'
                              : isDark
                                ? 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border-transparent'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 w-full">
                            <span className="text-xs truncate flex-1 font-medium">
                              {session.title || 'New Chat'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSession(session.id);
                              }}
                              className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-opacity ${
                                isDark
                                  ? 'hover:bg-slate-700 text-slate-400 hover:text-red-400'
                                  : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'
                              }`}
                              title="Delete chat session"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          <span className={`text-[10px] mt-0.5 flex items-center gap-1 ${
                            isActive
                              ? isDark ? 'text-slate-400' : 'text-gray-500'
                              : isDark ? 'text-slate-600' : 'text-gray-400'
                          }`}>
                            <Clock className="w-2.5 h-2.5 opacity-60" />
                            {formatRelativeTime(session.updatedAt)}
                          </span>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* ──────────────────────────────────────────────────────────── */}
              {/* RIGHT PANEL: Chat Messages & Input                          */}
              {/* ──────────────────────────────────────────────────────────── */}
              <div className="flex-1 flex flex-col h-full min-w-0">
                {/* ─── Header ─────────────────────────────────────── */}
                <div
                  className={`flex items-center justify-between px-4 py-3 border-b ${
                    isDark ? 'border-slate-800' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isDark
                            ? 'bg-slate-800 border border-slate-700 shadow-md'
                            : 'bg-gray-900 shadow-md'
                        }`}
                      >
                        <Wand2 className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full border-2 border-slate-950" />
                    </div>
                    <div className="min-w-0">
                      <h2
                        className={`text-xs font-semibold tracking-tight truncate ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {activeSession?.title || 'DB Composer'}
                      </h2>
                      <p
                        className={`text-[10px] ${
                          isDark ? 'text-slate-500' : 'text-gray-400'
                        } font-medium uppercase tracking-wider`}
                      >
                        Schema Pilot
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isDark
                          ? 'hover:bg-slate-800 text-slate-500 hover:text-slate-300'
                          : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* ─── Chat Area ──────────────────────────────────── */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {/* Welcome state */}
                  {messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center h-full gap-5 py-6"
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          isDark
                            ? 'bg-slate-800/80 border border-slate-700 shadow-md'
                            : 'bg-gray-100 border border-gray-200 shadow-sm'
                        }`}
                      >
                        <Sparkles
                          className={`w-7 h-7 ${
                            isDark ? 'text-slate-200' : 'text-gray-800'
                          }`}
                        />
                      </div>
                      <div className="text-center space-y-1.5">
                        <h3
                          className={`text-sm font-semibold ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          What would you like to build?
                        </h3>
                        <p
                          className={`text-xs leading-relaxed max-w-[240px] ${
                            isDark ? 'text-slate-500' : 'text-gray-400'
                          }`}
                        >
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
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => {
                              setInputValue(suggestion);
                              inputRef.current?.focus();
                            }}
                            className={`text-left px-3 py-2 rounded-xl text-xs transition-all ${
                              isDark
                                ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 hover:border-slate-700'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <span className="opacity-50 mr-1.5">→</span>
                            {suggestion}
                          </motion.button>
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
                        /* ── User bubble ──────────────────────────── */
                        <div className="max-w-[88%]">
                          <div className={`rounded-2xl rounded-tr-md px-3.5 py-2 text-xs shadow-md ${
                            isDark
                              ? 'bg-slate-800 text-white border border-slate-700'
                              : 'bg-gray-900 text-white shadow-gray-900/10'
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                        /* ── Assistant bubble ─────────────────────── */
                        <div className="max-w-[94%] space-y-2">
                          {/* Status indicator */}
                          {msg.status === 'pending' ? (
                            <div
                              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl rounded-tl-md ${
                                isDark ? 'bg-slate-900 border border-slate-800' : 'bg-gray-50 border border-gray-200'
                              }`}
                            >
                              <Loader2
                                className={`w-3.5 h-3.5 animate-spin ${
                                  isDark ? 'text-slate-400' : 'text-gray-600'
                                }`}
                              />
                              <span
                                className={`text-xs ${
                                  isDark ? 'text-slate-400' : 'text-gray-500'
                                }`}
                              >
                                Thinking...
                              </span>
                            </div>
                          ) : msg.status === 'error' ? (
                            <div
                              className={`px-3.5 py-2.5 rounded-2xl rounded-tl-md border ${
                                isDark
                                  ? 'bg-red-950/30 border-red-900/50 text-red-300'
                                  : 'bg-red-50 border-red-200 text-red-600'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 mb-1">
                                <XCircle className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">Error</span>
                              </div>
                              <p className="text-xs">{msg.content}</p>
                            </div>
                          ) : (
                            <>
                              {/* Summary text */}
                              <div
                                className={`px-3.5 py-2.5 rounded-2xl rounded-tl-md text-xs ${
                                  isDark
                                    ? 'bg-slate-900 border border-slate-800 text-slate-200'
                                    : 'bg-gray-50 border border-gray-200 text-gray-800'
                                }`}
                              >
                                {msg.content}
                              </div>

                              {/* Collapsible actions panel */}
                              {msg.actions && msg.actions.length > 0 && !msg.actions.every(a => a.type === 'EXPLAIN') && (
                                <div
                                  className={`rounded-xl overflow-hidden border ${
                                    isDark ? 'border-slate-800 bg-slate-900/50' : 'border-gray-200 bg-gray-50/50'
                                  }`}
                                >
                                  <button
                                    onClick={() => toggleActions(msg.id)}
                                    className={`w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-medium transition-colors ${
                                      isDark
                                        ? 'text-slate-400 hover:bg-slate-800/50'
                                        : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                                  >
                                    <span className="flex items-center gap-1.5">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
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
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <div
                                          className={`px-3 pb-2 space-y-1 border-t ${
                                            isDark ? 'border-slate-800' : 'border-gray-200'
                                          }`}
                                        >
                                          {msg.actions
                                            .filter(a => a.type !== 'EXPLAIN')
                                            .map((action, idx) => (
                                              <div
                                                key={idx}
                                                className={`flex items-center gap-2 py-1 text-[11px] ${
                                                  isDark ? 'text-slate-400' : 'text-gray-500'
                                                }`}
                                              >
                                                <span className="text-emerald-500">
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

                              {/* EXPLAIN content (rendered inline) */}
                              {msg.actions
                                ?.filter(a => a.type === 'EXPLAIN')
                                .map((a, i) => (
                                  <div
                                    key={i}
                                    className={`px-3.5 py-2.5 rounded-xl text-xs border ${
                                      isDark
                                        ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                                        : 'bg-gray-100 border-gray-200 text-gray-800'
                                    }`}
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

                {/* ─── Input Area ─────────────────────────────────── */}
                <div
                  className={`px-3 pb-3 pt-2.5 border-t ${
                    isDark ? 'border-slate-800' : 'border-gray-200'
                  }`}
                >
                  <div
                    className={`flex items-end gap-2 rounded-xl border px-3 py-2 transition-colors ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 focus-within:border-slate-600'
                        : 'bg-white border-gray-200 focus-within:border-gray-800'
                    }`}
                  >
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Describe your database..."
                      rows={1}
                      className={`flex-1 resize-none bg-transparent text-xs outline-none py-0.5 ${
                        isDark
                          ? 'text-white placeholder:text-slate-600'
                          : 'text-gray-900 placeholder:text-gray-400'
                      }`}
                      style={{ maxHeight: 110 }}
                      disabled={isPending}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={isPending || !inputValue.trim()}
                      className={`p-1.5 rounded-lg transition-all ${
                        isPending || !inputValue.trim()
                          ? isDark
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                          : isDark
                            ? 'bg-slate-100 hover:bg-white text-slate-900 shadow-sm'
                            : 'bg-gray-900 hover:bg-black text-white shadow-md shadow-gray-900/20'
                      }`}
                    >
                      {isPending ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                    </motion.button>
                  </div>
                  <p
                    className={`text-[10px] mt-1.5 text-center ${
                      isDark ? 'text-slate-600' : 'text-gray-400'
                    }`}
                  >
                    AI will apply changes directly to your canvas
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
