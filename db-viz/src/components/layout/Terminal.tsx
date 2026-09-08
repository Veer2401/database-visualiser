'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
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
    } else if (e.key === 'Enter') {
      const currentInput = input.trim();
      if (currentInput.endsWith(';')) {
        e.preventDefault();
        const queryToExecute = currentInput.slice(0, -1).trim();
        if (queryToExecute) {
          onCommand(queryToExecute);
          setCommandHistory((prev) => [...prev, currentInput]);
          setInput('');
          setHistoryIndex(-1);
        }
      }
    }
  };

  const getLogColor = (type: TerminalLog['type']) => {
    switch (type) {
      case 'success':
        return 'text-emerald-400';
      case 'error':
        return 'text-red-400';
      case 'warning':
        return 'text-amber-400';
      default:
        return 'text-gray-300';
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
    <div
      className="bg-gray-950 border-t border-white/[0.08] flex flex-col transition-all duration-200 shadow-2xl"
      style={{ height: isMinimized ? '40px' : '200px' }}
    >
      {/* Header bar matching Landing Page terminal preview */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#121212] border-b border-white/[0.08] shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-mono text-gray-400">terminal.sql</span>
          <span className="text-[10px] text-gray-500 font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 hidden sm:inline">
            PostgreSQL
          </span>
        </div>

        <button
          onClick={onToggleMinimize}
          className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={isMinimized ? "Expand terminal" : "Minimize terminal"}
        >
          {isMinimized ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Terminal Content */}
      <AnimatePresence>
        {!isMinimized && (
          <div className="flex-1 overflow-hidden flex flex-col bg-gray-950">
            {/* Logs Area */}
            <div
              className="flex-1 overflow-y-auto p-3.5 font-mono text-xs space-y-1"
              onClick={() => inputRef.current?.focus()}
            >
              {logs.length === 0 && (
                <div className="text-gray-500 text-xs">
                  <p>Connected to PostgreSQL instance. Type SQL commands or queries.</p>
                </div>
              )}

              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-gray-600 shrink-0">[{formatTimestamp(log.timestamp)}]</span>
                  <span className={getLogColor(log.type)}>{log.message}</span>
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>

            {/* Input Prompt */}
            <form onSubmit={handleSubmit} className="flex items-center px-3.5 pb-2.5 gap-2 shrink-0">
              <span className="text-gray-500 font-mono text-xs select-none">postgres&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-gray-600"
                placeholder="SELECT * FROM table; (end with semicolon or press Enter)"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
