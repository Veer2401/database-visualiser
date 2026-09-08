"use client";

import { motion } from "framer-motion";
import { Database, Table, GitBranch } from "lucide-react";

export function AnimatedPreview() {
  return (
    <div className="relative w-full max-w-5xl mx-auto h-[500px] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="text-gray-400">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Database Card */}
      <motion.div
        initial={{ x: -100, y: 50, opacity: 0 }}
        animate={{ 
          x: [0, 20, 0],
          y: [50, 30, 50],
          opacity: 1,
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute left-[10%] top-[20%] w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        <div className="bg-blue-600 px-4 py-3 flex items-center gap-2">
          <Database className="w-4 h-4 text-white" />
          <span className="text-white font-semibold text-sm">Users</span>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-amber-400 rounded" />
            <span className="text-gray-700">id (INT)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-gray-200 rounded" />
            <span className="text-gray-700">email (VARCHAR)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-gray-200 rounded" />
            <span className="text-gray-700">name (VARCHAR)</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Table Card */}
      <motion.div
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ 
          x: [0, -15, 0],
          y: [100, 80, 100],
          opacity: 1,
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute right-[15%] top-[30%] w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
      >
        <div className="bg-emerald-600 px-4 py-3 flex items-center gap-2">
          <Table className="w-4 h-4 text-white" />
          <span className="text-white font-semibold text-sm">Orders</span>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-amber-400 rounded" />
            <span className="text-gray-700">id (INT)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-blue-500 rounded" />
            <span className="text-gray-700">user_id (FK)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-gray-200 rounded" />
            <span className="text-gray-700">total (DECIMAL)</span>
          </div>
        </div>
      </motion.div>

      {/* Connection Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.line
          x1="25%"
          y1="35%"
          x2="75%"
          y2="45%"
          stroke="#3B82F6"
          strokeWidth="2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.circle
          r="4"
          fill="#3B82F6"
          initial={{ opacity: 0 }}
          animate={{ 
            cx: ["25%", "75%"],
            cy: ["35%", "45%"],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            delay: 1
          }}
        />
      </svg>

      {/* Floating Relationship Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          delay: 1.5
        }}
        className="absolute left-1/2 top-[40%] -translate-x-1/2"
      >
        <GitBranch className="w-8 h-8 text-blue-500" />
      </motion.div>
    </div>
  );
}
