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
    <div className="hidden lg:flex flex-1 relative bg-[#eaedeb] text-[#07110b] overflow-hidden items-center justify-center p-8 xl:p-12 border-l border-[#dce1de] select-none lg:h-screen lg:sticky lg:top-0">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="showcase-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#a4ada7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#showcase-dots)" />
        </svg>
      </div>

      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#38AA78]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#57C258]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        {/* Database Canvas Container */}
        <div className="relative w-full rounded-2xl bg-white/90 border border-[#dce1de] p-6 shadow-[0_16px_40px_rgba(7,17,11,0.06)] backdrop-blur-xl">
          {/* Canvas Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#eaedeb] text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-[#565c59] font-mono text-[11px] ml-2">ecommerce_production.db</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#f0f3f1] text-[#07110b] font-mono text-[10px] border border-[#dce1de]">
              <GitBranch className="w-3 h-3 text-[#38AA78]" />
              <span>3 Tables · 2 FKs</span>
            </div>
          </div>

          {/* Connected Tables & Straight Connectors Overlay */}
          <div className="relative grid grid-cols-2 gap-8 items-start py-2">
            {/* SVG Connection Lines Overlay */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
              style={{ filter: 'drop-shadow(0 0 4px rgba(56, 170, 120, 0.4))' }}
            >
              {/* Straight Horizontal Line: users.id -> orders.user_id */}
              <path
                d="M 220 46 H 255 V 74 H 288"
                fill="none"
                stroke="#38AA78"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* ERD Markers */}
              <line x1="223" y1="41" x2="223" y2="51" stroke="#38AA78" strokeWidth="2" />
              <path d="M 280 69 L 287 74 L 280 79" fill="none" stroke="#38AA78" strokeWidth="2" />

              {/* Animated Glowing Packet Flow */}
              <motion.circle
                key={packetTrigger}
                r="3.5"
                fill="#57C258"
                initial={{ cx: 220, cy: 46, opacity: 0 }}
                animate={{
                  cx: [220, 255, 255, 288],
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
              className="rounded-xl bg-white border border-[#dce1de] shadow-sm overflow-hidden text-xs"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#041c15] text-white">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <Database className="w-3.5 h-3.5 text-[#57C258]" />
                  <span className="font-mono">users</span>
                </div>
                <span className="text-[9px] text-white/50 font-mono">PRIORITY 1</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#f0f3f1] font-mono text-[11px]">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#57C258]/10 text-[#07110b]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-[#38AA78] text-white text-[8px] font-bold flex items-center justify-center">
                      PK
                    </span>
                    <span className="font-semibold text-[#07110b]">id</span>
                  </div>
                  <span className="text-[10px] text-[#565c59]">INT</span>
                </div>

                <div className="flex items-center justify-between px-3 py-1.5 text-[#565c59]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-[#eaedeb] text-[#565c59] text-[8px] font-bold flex items-center justify-center">
                      UQ
                    </span>
                    <span>email</span>
                  </div>
                  <span className="text-[10px] text-[#858b8c]">VARCHAR</span>
                </div>

                <div className="flex items-center justify-between px-3 py-1.5 text-[#565c59]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-[#eaedeb] text-[#858b8c] text-[8px] flex items-center justify-center font-bold">
                      ·
                    </span>
                    <span>created_at</span>
                  </div>
                  <span className="text-[10px] text-[#858b8c]">TIMESTAMP</span>
                </div>
              </div>
            </motion.div>

            {/* Table 2: orders (Child Table on Right) */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-xl bg-white border border-[#dce1de] shadow-sm overflow-hidden text-xs"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#041c15] text-white">
                <div className="flex items-center gap-1.5 font-semibold text-white">
                  <Database className="w-3.5 h-3.5 text-[#57C258]" />
                  <span className="font-mono">orders</span>
                </div>
                <span className="text-[9px] text-white/50 font-mono">PRIORITY 2</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#f0f3f1] font-mono text-[11px]">
                <div className="flex items-center justify-between px-3 py-1.5 text-[#565c59]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-[#38AA78] text-white text-[8px] font-bold flex items-center justify-center">
                      PK
                    </span>
                    <span className="font-semibold text-[#07110b]">id</span>
                  </div>
                  <span className="text-[10px] text-[#858b8c]">INT</span>
                </div>

                <div className="flex items-center justify-between px-3 py-1.5 bg-[#38AA78]/10 text-[#07110b]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-[#041c15] text-white text-[8px] font-bold flex items-center justify-center">
                      FK
                    </span>
                    <span className="font-semibold text-[#07110b]">user_id</span>
                  </div>
                  <span className="text-[10px] text-[#38AA78]">users(id)</span>
                </div>

                <div className="flex items-center justify-between px-3 py-1.5 text-[#565c59]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-[#eaedeb] text-[#858b8c] text-[8px] flex items-center justify-center font-bold">
                      $
                    </span>
                    <span>total_amount</span>
                  </div>
                  <span className="text-[10px] text-[#858b8c]">DECIMAL</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Table 3: items preview */}
          <div className="mt-4 pt-4 border-t border-[#eaedeb] flex items-center justify-between text-[11px] text-[#565c59]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#57C258]" />
              <span>Real-time Foreign Key integrity verification</span>
            </div>
            <span className="font-mono text-[10px] text-[#38AA78] bg-[#38AA78]/10 px-2 py-0.5 rounded-full font-medium">
              3NF Validated
            </span>
          </div>
        </div>

        {/* Dynamic SQL Terminal Execution Card */}
        <div className="w-full mt-5 rounded-2xl bg-[#041c15] border border-white/10 p-5 shadow-[0_12px_30px_rgba(4,28,21,0.2)] text-white">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#57C258]" />
              <span className="font-mono text-[11px] text-white/80">Interactive Query Execution</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[10px] font-mono text-[#57C258] bg-[#57C258]/10 px-2 py-0.5 rounded border border-[#57C258]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#57C258] animate-pulse" />
                {activeQuery.latency}
              </span>
            </div>
          </div>

          {/* Animated SQL Script */}
          <div className="font-mono text-[11.5px] leading-relaxed min-h-[58px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQueryIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="whitespace-pre-line text-white/70"
              >
                {activeQuery.sql.split('\n').map((line, i) => (
                  <div key={i}>
                    {line.startsWith('SELECT') || line.startsWith('FROM') || line.startsWith('JOIN') || line.startsWith('CREATE') || line.startsWith('GROUP') || line.startsWith('ORDER') ? (
                      <span>
                        <span className="text-[#57C258] font-bold">{line.split(' ')[0]}</span>{' '}
                        {line.substring(line.indexOf(' ') + 1)}
                      </span>
                    ) : (
                      line
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10.5px] text-white/40 font-mono">
            <span>Result: {activeQuery.rows}</span>
            <span className="text-[#38AA78]">PostgreSQL 16 Compatible</span>
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div className="w-full mt-5 grid grid-cols-3 gap-3">
          {[
            { label: 'Auto Normalization', sub: '3NF Assured' },
            { label: 'Instant SQL Export', sub: 'DOCX · PDF · DDL' },
            { label: 'Live Schema Sync', sub: 'Zero Latency' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/70 border border-[#dce1de] text-center"
            >
              <p className="text-[11px] font-bold text-[#07110b]">{item.label}</p>
              <p className="text-[10px] text-[#565c59] mt-0.5">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
