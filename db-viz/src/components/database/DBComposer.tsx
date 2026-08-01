'use client';

/**
 * DBComposer — AI Sidebar for structured database schema generation.
 *
 * A Cursor-like sidebar that:
 * 1. Takes natural language prompts
 * 2. Sends them to Gemini in "composer" mode → structured ComposerAction[]
 * 3. Executes actions on the React Flow canvas + Firestore via useComposerActions
 * 4. Shows a rich chat history with collapsible action summaries
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
} from 'lucide-react';
import type { ComposerAction, ComposerChatMessage } from '@/types/composer';
import type { Column } from '@/types/database';
import { useComposerActions, type UseComposerActionsParams } from '@/hooks/useComposerActions';
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
  const { isOpen, onClose, theme, ...actionParams } = props;
  const { executeActions } = useComposerActions(actionParams);

  // Chat state
  const [messages, setMessages] = useState<ComposerChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [expandedActions, setExpandedActions] = useState<Record<string, boolean>>({});

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when sidebar opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

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

  // Build chat history for multi-turn
  const chatHistory = useMemo(() => {
    return messages
      .filter(m => m.status === 'done')
      .map(m => ({ role: m.role, content: m.content }));
  }, [messages]);

  // ── Send message ──────────────────────────────────────────────────────
  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isPending) return;

    // Add user message
    const userMsg: ComposerChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      status: 'done',
    };

    // Add pending assistant message
    const assistantId = uuidv4();
    const pendingMsg: ComposerChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      status: 'pending',
    };

    setMessages(prev => [...prev, userMsg, pendingMsg]);
    setInputValue('');
    setIsPending(true);

    try {
      // Call API in composer mode
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
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantId
              ? { ...m, content: data.error || 'Failed to get response.', status: 'error' as const }
              : m
          )
        );
        setIsPending(false);
        return;
      }

      const actions: ComposerAction[] = data.actions || [];
      const summary: string = data.summary || 'Actions completed.';

      // Execute the actions on the canvas
      let execResult;
      if (actions.length > 0 && !actions.every(a => a.type === 'EXPLAIN')) {
        execResult = await executeActions(actions);
      }

      const finalStatus = (execResult && !execResult.success) ? ('error' as const) : ('done' as const);
      const finalSummary = (execResult && !execResult.success)
        ? `${summary} (Note: ${execResult.summary})`
        : summary;

      // Update assistant message with results
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: finalSummary, actions, status: finalStatus }
            : m
        )
      );

      // Auto-expand the actions panel for this message
      setExpandedActions(prev => ({ ...prev, [assistantId]: true }));
    } catch (err: any) {
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: err.message || 'Network error.', status: 'error' as const }
            : m
        )
      );
    } finally {
      setIsPending(false);
    }
  }, [inputValue, isPending, chatHistory, canvasContext, executeActions]);

  // ── Key handler ───────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  // ── Clear chat ────────────────────────────────────────────────────────
  const handleClear = useCallback(() => {
    setMessages([]);
    setExpandedActions({});
  }, []);

  // ── Toggle action expansion ───────────────────────────────────────────
  const toggleActions = useCallback((msgId: string) => {
    setExpandedActions(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  }, []);

  // ── Auto-resize textarea ─────────────────────────────────────────────
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize
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
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full z-50 flex flex-col"
            style={{ width: 400 }}
          >
          {/* ─── Glass background ──────────────────────────────── */}
          <div
            className={`absolute inset-0 ${
              isDark
                ? 'bg-slate-950/95 border-l border-slate-800'
                : 'bg-white/95 border-l border-gray-200'
            } backdrop-blur-xl`}
          />

          <div className="relative flex flex-col h-full">
            {/* ─── Header ─────────────────────────────────────── */}
            <div
              className={`flex items-center justify-between px-5 py-4 border-b ${
                isDark ? 'border-slate-800' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isDark
                        ? 'bg-slate-800 border border-slate-700 shadow-md'
                        : 'bg-gray-900 shadow-md'
                    }`}
                  >
                    <Wand2 className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
                </div>
                <div>
                  <h2
                    className={`text-sm font-semibold tracking-tight ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    DB Composer
                  </h2>
                  <p
                    className={`text-[11px] ${
                      isDark ? 'text-slate-500' : 'text-gray-400'
                    } font-medium uppercase tracking-wider`}
                  >
                    Schema Pilot
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClear}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark
                      ? 'hover:bg-slate-800 text-slate-500 hover:text-slate-300'
                      : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
                  }`}
                  title="Clear chat"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className={`p-2 rounded-lg transition-colors ${
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
                  className="flex flex-col items-center justify-center h-full gap-6 py-8"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      isDark
                        ? 'bg-slate-800/80 border border-slate-700 shadow-md'
                        : 'bg-gray-100 border border-gray-200 shadow-sm'
                    }`}
                  >
                    <Sparkles
                      className={`w-8 h-8 ${
                        isDark ? 'text-slate-200' : 'text-gray-800'
                      }`}
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <h3
                      className={`text-base font-semibold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      What would you like to build?
                    </h3>
                    <p
                      className={`text-xs leading-relaxed max-w-[260px] ${
                        isDark ? 'text-slate-500' : 'text-gray-400'
                      }`}
                    >
                      Describe your database in natural language. I&apos;ll generate the schema
                      and render it on your canvas.
                    </p>
                  </div>

                  {/* Suggestion chips */}
                  <div className="flex flex-col gap-2 w-full px-2">
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
                        className={`text-left px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                          isDark
                            ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 hover:border-slate-700'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-500 border border-gray-200 hover:border-gray-300'
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
                    <div className="max-w-[85%]">
                      <div className={`rounded-2xl rounded-tr-md px-4 py-2.5 text-sm shadow-md ${
                        isDark
                          ? 'bg-slate-800 text-white border border-slate-700'
                          : 'bg-gray-900 text-white shadow-gray-900/10'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    /* ── Assistant bubble ─────────────────────── */
                    <div className="max-w-[92%] space-y-2">
                      {/* Status indicator */}
                      {msg.status === 'pending' ? (
                        <div
                          className={`flex items-center gap-2 px-4 py-3 rounded-2xl rounded-tl-md ${
                            isDark ? 'bg-slate-900 border border-slate-800' : 'bg-gray-50 border border-gray-200'
                          }`}
                        >
                          <Loader2
                            className={`w-4 h-4 animate-spin ${
                              isDark ? 'text-slate-400' : 'text-gray-600'
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              isDark ? 'text-slate-400' : 'text-gray-500'
                            }`}
                          >
                            Thinking...
                          </span>
                        </div>
                      ) : msg.status === 'error' ? (
                        <div
                          className={`px-4 py-3 rounded-2xl rounded-tl-md border ${
                            isDark
                              ? 'bg-red-950/30 border-red-900/50 text-red-300'
                              : 'bg-red-50 border-red-200 text-red-600'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <XCircle className="w-4 h-4" />
                            <span className="text-xs font-medium">Error</span>
                          </div>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      ) : (
                        <>
                          {/* Summary text */}
                          <div
                            className={`px-4 py-3 rounded-2xl rounded-tl-md text-sm ${
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
                                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
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
                                            className={`flex items-center gap-2 py-1.5 text-xs ${
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
                                className={`px-4 py-3 rounded-xl text-sm border ${
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
              className={`px-4 pb-4 pt-3 border-t ${
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
                  className={`flex-1 resize-none bg-transparent text-sm outline-none py-1 ${
                    isDark
                      ? 'text-white placeholder:text-slate-600'
                      : 'text-gray-900 placeholder:text-gray-400'
                  }`}
                  style={{ maxHeight: 120 }}
                  disabled={isPending}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isPending || !inputValue.trim()}
                  className={`p-2 rounded-lg transition-all ${
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
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
              <p
                className={`text-[10px] mt-2 text-center ${
                  isDark ? 'text-slate-600' : 'text-gray-400'
                }`}
              >
                AI will apply changes directly to your canvas
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
