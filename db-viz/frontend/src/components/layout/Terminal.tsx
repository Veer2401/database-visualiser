'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus, Maximize2, ChevronUp, ChevronDown } from 'lucide-react';
import { TerminalLog } from '@/types/database';

interface TerminalProps {
  logs: TerminalLog[];
  onCommand: (command: string) => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export default function Terminal({
  logs,
  onCommand,
  isMinimized,
  onToggleMinimize,
}: TerminalProps) {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logs.length > 0) {
      logsEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }
  }, [logs.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setCommandHistory((prev) => [...prev, input.trim()]);
      setInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle command history navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
    // Handle Enter key - execute if semicolon is present or Enter in form submission
    else if (e.key === 'Enter') {
      const currentInput = input.trim();
      // Auto-execute if input ends with semicolon
      if (currentInput.endsWith(';')) {
        e.preventDefault();
        // Remove trailing semicolon and execute
        const queryToExecute = currentInput.slice(0, -1).trim();
        if (queryToExecute) {
          onCommand(queryToExecute);
          setCommandHistory((prev) => [...prev, currentInput]);
          setInput('');
          setHistoryIndex(-1);
        }
      }
      // Otherwise, let the form handle it normally (for single-line Enter behavior)
    }
  };

  const getLogColor = (type: TerminalLog['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="bg-gray-900/95 backdrop-blur-2xl border-t border-gray-700/50 flex flex-col shadow-2xl shadow-gray-900/20"
      style={{ height: isMinimized ? '48px' : '220px' }}
    >
      {/* Terminal Header */}
      <motion.div 
        className="flex items-center justify-between px-4 py-2.5 bg-gray-800/90 backdrop-blur-xl border-b border-gray-700/50"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300" style={{ fontFamily: 'var(--font-geist-sans)' }}>SQL Terminal</span>
            <span className="text-xs text-gray-400 bg-gray-700/60 px-2 py-0.5 rounded-md" style={{ fontFamily: 'var(--font-geist-sans)' }}>PostgreSQL</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(55, 65, 81, 0.8)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleMinimize}
            className="p-1.5 rounded-md text-gray-400 hover:text-white transition-colors"
          >
            {isMinimized ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Terminal Content */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex-1 overflow-hidden flex flex-col"
          >
            {/* Logs Area */}
            <div
              className="flex-1 overflow-y-auto p-4 font-mono text-sm"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Welcome Message */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-white mb-2"
              >
                <p className="text-gray-300 text-sm">Connected to PostgreSQL</p>
                <p className="text-gray-500 text-xs mt-1">Type SQL or &apos;help&apos;</p>
              </motion.div>

              {/* Logs */}
              {logs.map((log, index) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex gap-2 mb-1"
                >
                  <span className="text-gray-600">[{formatTimestamp(log.timestamp)}]</span>
                  <span className={getLogColor(log.type)}>{log.message}</span>
                </motion.div>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="flex items-center px-4 pb-3 gap-2">
              <span className="text-gray-400 font-mono text-sm">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder:text-gray-600"
                placeholder="enter SQL command"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
