"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalCard {
  id: number;
  command: string;
  lines: {
    prefix: string;
    text: string;
    color: string;
  }[];
}

export const ThreeDMarquee = ({
  terminals,
  className,
}: {
  terminals: TerminalCard[];
  className?: string;
}) => {
  return (
    <div className={cn("w-full mx-auto max-w-3xl py-12", className)}>
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Interactive SQL Terminal</h2>
      <p className="text-center text-gray-500 mb-10 max-w-xl mx-auto">
        Experience a real MySQL workflow: create tables, insert data, run queries, and see results instantly. Our built-in terminal supports syntax highlighting, command history, and more.
      </p>
      <div className="flex flex-wrap justify-center gap-8">
        {terminals.map((query) => (
          <motion.div
            key={query.id}
            className="bg-[#0F172A] rounded-xl p-4 shadow-2xl border border-gray-800 w-[350px] max-w-full"
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Terminal window controls */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="ml-2 text-xs text-gray-500 font-mono">mysql terminal</span>
            </div>
            {/* Terminal content */}
            <div className="font-mono text-sm min-h-[100px]">
              {query.lines.map((line, idx) => (
                <p key={idx} className={line.color}>
                  {line.prefix && <span className="text-gray-500">{line.prefix} </span>}
                  {line.text}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
