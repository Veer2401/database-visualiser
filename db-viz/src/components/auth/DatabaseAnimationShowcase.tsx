'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, GitBranch, Terminal, Key, CheckCircle2, ArrowRight } from 'lucide-react';

const queries = [
  {
    sql: 'SELECT u.email, count(o.id) AS total_orders\nFROM users u\nJOIN orders o ON u.id = o.user_id\nGROUP BY u.id;',
    latency: '0.4ms',
    rows: '3 rows returned',
  },
  {
    sql: 'SELECT p.name, sum(oi.quantity) AS sold\nFROM products p\nJOIN order_items oi ON p.id = oi.product_id\nGROUP BY p.id\nORDER BY sold DESC;',
    latency: '0.6ms',
    rows: '5 rows returned',
  },
  {
    sql: 'CREATE TABLE payments (\n  id SERIAL PRIMARY KEY,\n  order_id INT REFERENCES orders(id),\n  amount DECIMAL(10,2) NOT NULL\n);',
    latency: '1.2ms',
    rows: 'Table created in 3NF',
  },
];

export default function DatabaseAnimationShowcase() {
  const [activeQueryIdx, setActiveQueryIdx] = useState(0);
  const [packetTrigger, setPacketTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQueryIdx((prev) => (prev + 1) % queries.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const packetInterval = setInterval(() => {
      setPacketTrigger((prev) => prev + 1);
    }, 2400);
    return () => clearInterval(packetInterval);
  }, []);

  const activeQuery = queries[activeQueryIdx];

  return (
    <div className="hidden lg:flex flex-1 relative bg-[#090a0f] text-white overflow-hidden items-center justify-center p-8 xl:p-12 border-l border-zinc-800/80 select-none lg:h-screen lg:sticky lg:top-0">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="showcase-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#71717a" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#showcase-dots)" />
        </svg>
      </div>

      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        {/* Database Canvas Container */}
        <div className="relative w-full rounded-2xl bg-zinc-950/70 border border-zinc-800/80 p-6 shadow-2xl backdrop-blur-xl">
          {/* Canvas Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-800/70 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="text-zinc-400 font-mono text-[11px] ml-2">ecommerce_production.db</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 font-mono text-[10px] border border-zinc-800">
              <GitBranch className="w-3 h-3 text-zinc-400" />
              <span>3 Tables · 2 FKs</span>
            </div>
          </div>

          {/* Connected Tables & Straight Connectors Overlay */}
          <div className="relative grid grid-cols-2 gap-8 items-start py-2">
            {/* SVG Connection Lines Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
              style={{ filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.4))' }}
            >
              <defs>
                <linearGradient id="fkLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>

              {/* Straight Horizontal Line: users.id (Row 1 right) -> orders.user_id (Row 2 left) */}
              {/* Note: Row 1 is id (y ~ 44), Row 2 in orders is user_id (y ~ 72). A crisp orthogonal step line: */}
              <path
                d="M 230 46 H 265 V 74 H 300"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* ERD Markers */}
              {/* One marker on users (vertical line) */}
              <line x1="233" y1="41" x2="233" y2="51" stroke="#3b82f6" strokeWidth="2" />
              {/* Many marker on orders (crows foot) */}
              <path d="M 292 69 L 299 74 L 292 79" fill="none" stroke="#3b82f6" strokeWidth="2" />

              {/* Animated Glowing Packet Flow */}
              <motion.circle
                key={packetTrigger}
                r="3.5"
                fill="#60a5fa"
                initial={{ cx: 230, cy: 46, opacity: 0 }}
                animate={{
                  cx: [230, 265, 265, 300],
                  cy: [46, 46, 74, 74],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
            </svg>

            {/* Table 1: users (Parent Table on Left) */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl bg-zinc-900/90 border border-zinc-700/80 shadow-lg overflow-hidden text-xs"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-black border-b border-zinc-800">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <Database className="w-3.5 h-3.5 text-zinc-300" />
                  <span>users</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">PRIORITY 1</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-zinc-800/60 font-mono text-[11px]">
                <div className="flex items-center justify-between px-3 py-1.5 bg-blue-500/10 text-blue-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-amber-400 text-black text-[8px] font-bold flex items-center justify-center">
                      PK
                    </span>
                    <span className="font-semibold text-white">id</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">INT</span>
                </div>

                <div className="flex items-center justify-between px-3 py-1.5 text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-zinc-800 text-zinc-400 text-[8px] font-bold flex items-center justify-center">
                      UQ
                    </span>
                    <span>email</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">VARCHAR</span>
                </div>

                <div className="flex items-center justify-between px-3 py-1.5 text-zinc-400">
                  <span>role</span>
                  <span className="text-[10px] text-zinc-500">ENUM</span>
                </div>

                <div className="flex items-center justify-between px-3 py-1.5 text-zinc-400">
                  <span>created_at</span>
                  <span className="text-[10px] text-zinc-500">TIMESTAMP</span>
                </div>
              </div>
            </motion.div>

            {/* Table 2: orders (Derived Child Table on Right) */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-xl bg-zinc-900/90 border border-zinc-700/80 shadow-lg overflow-hidden text-xs"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-black border-b border-zinc-800">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <Database className="w-3.5 h-3.5 text-zinc-300" />
                  <span>orders</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">CHILD</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-zinc-800/60 font-mono text-[11px]">
                <div className="flex items-center justify-between px-3 py-1.5 text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-amber-400 text-black text-[8px] font-bold flex items-center justify-center">
                      PK
                    </span>
                    <span className="font-semibold text-white">id</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">INT</span>
                </div>

                {/* Highlighted Foreign Key Row */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-blue-500/15 text-blue-300 border-l-2 border-blue-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-blue-500 text-white text-[8px] font-bold flex items-center justify-center">
                      FK
                    </span>
                    <span className="font-semibold text-white">user_id</span>
                  </div>
                  <span className="text-[10px] text-blue-300 font-bold">INT → users</span>
                </div>

                <div className="flex items-center justify-between px-3 py-1.5 text-zinc-400">
                  <span>total_amount</span>
                  <span className="text-[10px] text-zinc-500">DECIMAL</span>
                </div>

                <div className="flex items-center justify-between px-3 py-1.5 text-zinc-400">
                  <span>status</span>
                  <span className="text-[10px] text-zinc-500">VARCHAR</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* SQL Terminal Animation Card — Fixed Size to prevent layout shifting */}
          <div className="mt-5 pt-4 border-t border-zinc-800/80">
            <div className="rounded-xl bg-black/95 border border-zinc-800 p-4 font-mono text-xs shadow-inner h-[150px] flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800 text-[10px] text-zinc-500 shrink-0">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-zinc-300 font-semibold tracking-wide">SQL Terminal</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    {activeQuery.latency}
                  </span>
                  <span className="text-zinc-400 font-mono">{activeQuery.rows}</span>
                </div>
              </div>

              {/* Animated Query text area with locked fixed height */}
              <div className="flex-1 relative w-full overflow-hidden mt-2">
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={activeQueryIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="text-zinc-300 text-[11px] leading-relaxed overflow-x-auto whitespace-pre font-mono absolute inset-0 select-text"
                  >
                    <span className="text-emerald-400 font-bold">$ </span>
                    {activeQuery.sql}
                  </motion.pre>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights beneath preview */}
        <div className="grid grid-cols-3 gap-3 w-full mt-5">
          <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/80 text-center">
            <p className="text-xs font-semibold text-white">Priority Tiers</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Left-to-right hierarchy</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/80 text-center">
            <p className="text-xs font-semibold text-white">Straight Lines</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Orthogonal FK routing</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/80 text-center">
            <p className="text-xs font-semibold text-white">Schema Pilot</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Instant AI generation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
