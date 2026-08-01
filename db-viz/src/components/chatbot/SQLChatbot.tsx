'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Copy, Check, Loader2, Play, Trash2 } from 'lucide-react';
import { findMatchingIntent, SQLIntent } from '@/data/sqlKnowledgeBase';
import { authFetch } from '@/lib/api-client';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ChatMessage {
    id: string;
    type: 'user' | 'bot';
    content: string;
    sql?: string[];
    timestamp: Date;
    executed?: boolean;
}

interface SQLChatbotProps {
    theme?: {
        navbar?: string;
        text?: string;
        textSecondary?: string;
        modal?: string;
    };
    onExecuteSQL?: (sqlStatements: string[]) => Promise<void>;
    savedMessages?: ChatMessage[];
    onMessagesChange?: (messages: ChatMessage[]) => void;
    activeDatabaseName?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

const hasExecutableSQL = (sql?: string[]): boolean => {
    if (!sql || sql.length === 0) return false;
    return sql.some(s =>
        /^\s*(CREATE\s+TABLE|INSERT|UPDATE|DELETE|ALTER|DROP\s+TABLE|TRUNCATE)/i.test(s)
    );
};

const splitSQLStatements = (raw: string): string[] => {
    const statements: string[] = [];
    let current = '';
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < raw.length; i++) {
        const ch = raw[i];
        if (inString) {
            current += ch;
            if (ch === stringChar && raw[i - 1] !== '\\') {
                inString = false;
            }
        } else if (ch === '\'' || ch === '"') {
            inString = true;
            stringChar = ch;
            current += ch;
        } else if (ch === ';') {
            const trimmed = current.trim();
            if (trimmed) statements.push(trimmed);
            current = '';
        } else {
            current += ch;
        }
    }
    const last = current.trim();
    if (last) statements.push(last);
    return statements;
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function SQLChatbot({
    theme,
    onExecuteSQL,
    savedMessages,
    onMessagesChange,
    activeDatabaseName,
}: SQLChatbotProps) {
    const WELCOME: ChatMessage = {
        id: 'welcome',
        type: 'bot',
        content:
            "⚡ **AI Composer Ready**\n\nI act as a Cursor-like Composer for your database. Tell me what you want to build:\n\n• *\"Create a car dealership database with cars and sales tables\"*\n• *\"Build a student management system with 3 sample records\"*\n• *\"Add an orders table with a foreign key to users\"*\n\nI will generate the SQL and automatically render the tables onto your interactive canvas!",
        timestamp: new Date(),
    };

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
    const [inputValue, setInputValue] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [executingId, setExecutingId] = useState<string | null>(null);
    const [initialised, setInitialised] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load saved messages once
    useEffect(() => {
        if (!initialised && savedMessages && savedMessages.length > 0) {
            setMessages(savedMessages);
            setInitialised(true);
        } else if (!initialised) {
            setInitialised(true);
        }
    }, [savedMessages, initialised]);

    // Persist messages on change
    useEffect(() => {
        if (initialised && onMessagesChange) {
            onMessagesChange(messages);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages, initialised]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus();
    }, [isOpen]);

    const addMessages = useCallback((...msgs: ChatMessage[]) => {
        setMessages(prev => [...prev, ...msgs]);
    }, []);

    // Execute SQL in workflow
    const handleExecuteInWorkflow = useCallback(
        async (messageId: string, sql: string[]) => {
            if (!onExecuteSQL || executingId) return;
            setExecutingId(messageId);
            try {
                await onExecuteSQL(sql);
                setMessages(prev =>
                    prev.map(m =>
                        m.id === messageId ? { ...m, executed: true } : m
                    )
                );
                addMessages({
                    id: `confirm-${Date.now()}`,
                    type: 'bot',
                    content: '✅ SQL executed successfully! Changes are reflected in the workflow.',
                    timestamp: new Date(),
                });
            } catch (err) {
                console.error('Execute in workflow error:', err);
                addMessages({
                    id: `err-${Date.now()}`,
                    type: 'bot',
                    content: `❌ Error executing SQL: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`,
                    timestamp: new Date(),
                });
            } finally {
                setExecutingId(null);
            }
        },
        [onExecuteSQL, executingId, addMessages]
    );

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            id: `u-${Date.now()}`,
            type: 'user',
            content: inputValue.trim(),
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        const currentInput = inputValue.trim();
        setInputValue('');

        // Check if user typed "yes" to execute last pending SQL
        if (/^(yes|yeah|yep|sure|ok|okay|y|do it|go ahead)$/i.test(currentInput)) {
            const lastBot = [...messages].reverse().find(
                m => m.type === 'bot' && hasExecutableSQL(m.sql) && !m.executed
            );
            if (lastBot && onExecuteSQL) {
                await handleExecuteInWorkflow(lastBot.id, lastBot.sql!);
                return;
            }
        }

        // Rule-based matching first
        const matchedIntent: SQLIntent | null = findMatchingIntent(currentInput);

        if (matchedIntent) {
            const botSql = matchedIntent.response.sql;
            const allStatements = botSql
                ? botSql.flatMap(s => splitSQLStatements(s))
                : undefined;

            setTimeout(() => {
                addMessages({
                    id: `b-${Date.now()}`,
                    type: 'bot',
                    content: matchedIntent.response.explanation,
                    sql: allStatements,
                    timestamp: new Date(),
                });
            }, 300);
        } else {
            // AI Composer via Direct Gemini API
            setIsLoading(true);
            try {
                const response = await authFetch('/api/chat/gemini', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: currentInput,
                        contextSchema: activeDatabaseName ? `Active Database: ${activeDatabaseName}` : undefined
                    }),
                });
                const data = await response.json();

                let sqlQueries: string[] = data.sql_statements || [];

                if (sqlQueries.length === 0 && data.success && data.explanation) {
                    const codeBlockRegex = /```(?:sql)?\s*([\s\S]*?)```/gi;
                    let match;
                    while ((match = codeBlockRegex.exec(data.explanation)) !== null) {
                        const sqlContent = match[1].trim();
                        if (
                            sqlContent &&
                            /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TRUNCATE|GRANT|REVOKE|USE|SHOW|DESCRIBE|EXPLAIN|WITH)\b/i.test(sqlContent)
                        ) {
                            sqlQueries.push(sqlContent);
                        }
                    }
                }

                // Split into individual executable statements
                sqlQueries = sqlQueries.flatMap(s => splitSQLStatements(s));

                const botMsgId = `b-${Date.now()}`;
                const finalSql = sqlQueries.length > 0 ? sqlQueries : undefined;

                addMessages({
                    id: botMsgId,
                    type: 'bot',
                    content: data.success
                        ? data.explanation || "Database schema instructions processed."
                        : (data.error || "I'm sorry, I couldn't process your request right now. Please try again."),
                    sql: finalSql,
                    timestamp: new Date(),
                });

                // Auto-execute SQL statements on the Canvas (Cursor-like composer feature)
                if (data.auto_execute && finalSql && finalSql.length > 0 && onExecuteSQL) {
                    setExecutingId(botMsgId);
                    try {
                        await onExecuteSQL(finalSql);
                        setMessages(prev =>
                            prev.map(m => (m.id === botMsgId ? { ...m, executed: true } : m))
                        );
                    } catch (execErr) {
                        console.error('Failed auto-executing Composer SQL:', execErr);
                    } finally {
                        setExecutingId(null);
                    }
                }
            } catch (error) {
                console.error('Gemini AI API error:', error);
                addMessages({
                    id: `b-${Date.now()}`,
                    type: 'bot',
                    content: "I'm having trouble connecting to the Gemini AI service. Please verify your internet connection or GEMINI_API_KEY.",
                    timestamp: new Date(),
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClearChat = () => {
        setMessages([WELCOME]);
    };

    const copyToClipboard = (sql: string[], messageId: string) => {
        navigator.clipboard.writeText(sql.join(';\n'));
        setCopiedId(messageId);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const quickQuestions = [
        'Create users table',
        'How to JOIN tables?',
        'What is foreign key?',
        'SELECT with WHERE',
    ];

    const handleQuickQuestion = (question: string) => {
        setInputValue(question);
        setTimeout(() => handleSend(), 100);
    };

    const isDark = theme?.navbar?.includes('slate');

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
                    isOpen ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
            </motion.button>

            {/* Chat Popup */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-48px)] rounded-2xl shadow-2xl overflow-hidden ${
                            isDark ? 'bg-slate-900 border border-slate-700' : 'bg-white border border-gray-200'
                        }`}
                        style={{
                            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
                            maxHeight: 'calc(100vh - 150px)',
                        }}
                    >
                        {/* Header */}
                        <div className={`p-4 border-b ${isDark ? 'border-slate-700 bg-slate-800' : 'border-gray-100 bg-gray-50'}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-blue-600' : 'bg-gray-900'}`}>
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className={`font-semibold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                            AI Composer
                                            <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">Composer</span>
                                        </h3>
                                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`} style={{ fontFamily: 'var(--font-geist-sans)' }}>
                                            {activeDatabaseName ? `DB: ${activeDatabaseName} • Auto Canvas` : 'Cursor Auto-Canvas Mode'}
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleClearChat}
                                    className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-200 text-gray-400'}`}
                                    title="Clear chat"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            className={`p-4 overflow-y-auto ${isDark ? 'bg-slate-900' : 'bg-white'}`}
                            style={{ height: '350px' }}
                        >
                            <div className="space-y-4">
                                {messages.map(message => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                                            message.type === 'user' ? 'bg-black' : isDark ? 'bg-slate-700' : 'bg-gray-100'
                                        }`}>
                                            {message.type === 'user' ? (
                                                <User className="w-4 h-4 text-white" />
                                            ) : (
                                                <Bot className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-gray-600'}`} />
                                            )}
                                        </div>

                                        <div className={`flex-1 min-w-0 ${message.type === 'user' ? 'text-right' : ''}`}>
                                            <div
                                                className={`inline-block p-3 rounded-xl max-w-full text-left ${
                                                    message.type === 'user'
                                                        ? 'bg-black text-white'
                                                        : isDark ? 'bg-slate-800 text-slate-200' : 'bg-gray-100 text-gray-800'
                                                }`}
                                                style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                                            >
                                                <p className="text-sm whitespace-pre-wrap" style={{ fontFamily: 'var(--font-geist-sans)', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                                                    {message.content}
                                                </p>

                                                {message.sql && message.sql.length > 0 && (
                                                    <div className="mt-3">
                                                        <div className={`relative rounded-lg overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-gray-900'}`}>
                                                            <div className="flex items-center justify-between px-3 py-2 border-b border-gray-700">
                                                                <span className="text-xs text-gray-400">
                                                                    SQL ({message.sql.length} statement{message.sql.length > 1 ? 's' : ''})
                                                                </span>
                                                                <button
                                                                    onClick={() => copyToClipboard(message.sql!, message.id)}
                                                                    className="text-gray-400 hover:text-white transition-colors"
                                                                >
                                                                    {copiedId === message.id ? (
                                                                        <Check className="w-4 h-4 text-green-400" />
                                                                    ) : (
                                                                        <Copy className="w-4 h-4" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                            <pre className="p-3 overflow-x-auto text-sm">
                                                                <code className="text-green-400">{message.sql.join(';\n')}</code>
                                                            </pre>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Execute in Workflow Button */}
                                                {message.type === 'bot' && hasExecutableSQL(message.sql) && !message.executed && onExecuteSQL && (
                                                    <div className="mt-3 pt-2 border-t border-gray-600/30">
                                                        <p className={`text-xs mb-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                                                            Run this SQL in your workflow?
                                                        </p>
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={() => handleExecuteInWorkflow(message.id, message.sql!)}
                                                            disabled={executingId === message.id}
                                                            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded-lg transition-colors disabled:opacity-50"
                                                        >
                                                            {executingId === message.id ? (
                                                                <Loader2 className="w-3 h-3 animate-spin" />
                                                            ) : (
                                                                <Play className="w-3 h-3" />
                                                            )}
                                                            {executingId === message.id ? 'Executing...' : 'Yes, Execute in Workflow'}
                                                        </motion.button>
                                                    </div>
                                                )}

                                                {message.type === 'bot' && message.executed && (
                                                    <div className="mt-2 flex items-center gap-1 text-green-500 text-xs">
                                                        <Check className="w-3 h-3" />
                                                        <span>Executed in workflow</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Quick Questions */}
                        {messages.length <= 2 && (
                            <div className={`px-4 pb-2 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                                <p className={`text-xs mb-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Quick questions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickQuestions.map(q => (
                                        <button
                                            key={q}
                                            onClick={() => handleQuickQuestion(q)}
                                            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                                                isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                            style={{ fontFamily: 'var(--font-geist-sans)' }}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className={`p-4 border-t ${isDark ? 'border-slate-700 bg-slate-800' : 'border-gray-100 bg-gray-50'}`}>
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={e => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask about SQL..."
                                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        isDark ? 'bg-slate-700 text-white placeholder-slate-400 border-slate-600' : 'bg-white text-gray-900 placeholder-gray-400 border-gray-200'
                                    } border`}
                                    style={{ fontFamily: 'var(--font-geist-sans)' }}
                                />
                                <motion.button
                                    whileHover={{ scale: isLoading ? 1 : 1.05 }}
                                    whileTap={{ scale: isLoading ? 1 : 0.95 }}
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isLoading}
                                    className={`p-2.5 rounded-xl transition-all ${
                                        inputValue.trim() && !isLoading
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : isDark ? 'bg-slate-700 text-slate-500' : 'bg-gray-200 text-gray-400'
                                    }`}
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}