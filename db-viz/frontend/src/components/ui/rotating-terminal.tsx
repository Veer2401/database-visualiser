"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const terminalQueries = [
  {
    id: 1,
    command: "CREATE TABLE users",
    lines: [
      { prefix: "postgres=>", text: "CREATE TABLE users (", color: "text-gray-200" },
      { prefix: "", text: "  id SERIAL PRIMARY KEY,", color: "text-gray-200" },
      { prefix: "", text: "  name VARCHAR(255) NOT NULL,", color: "text-gray-200" },
      { prefix: "", text: "  email VARCHAR(255) UNIQUE", color: "text-gray-200" },
      { prefix: "", text: ");", color: "text-gray-200" },
      { prefix: "", text: "Query OK, 0 rows affected (0.02 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 2,
    command: "SELECT * FROM users",
    lines: [
      { prefix: "postgres=>", text: "SELECT * FROM users WHERE status = 'active';", color: "text-gray-200" },
      { prefix: "", text: "+----+----------+------------------+--------+", color: "text-gray-400" },
      { prefix: "", text: "| id | name     | email            | status |", color: "text-gray-400" },
      { prefix: "", text: "+----+----------+------------------+--------+", color: "text-gray-400" },
      { prefix: "", text: "|  1 | John Doe | john@example.com | active |", color: "text-gray-200" },
      { prefix: "", text: "+----+----------+------------------+--------+", color: "text-gray-400" },
      { prefix: "", text: "1 row in set (0.00 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 3,
    command: "INSERT INTO orders",
    lines: [
      { prefix: "postgres=>", text: "INSERT INTO orders (user_id, product_id, total)", color: "text-gray-200" },
      { prefix: "", text: "VALUES (1, 42, 299.99);", color: "text-gray-200" },
      { prefix: "", text: "", color: "text-gray-200" },
      { prefix: "", text: "Query OK, 1 row affected (0.01 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 4,
    command: "ALTER TABLE products",
    lines: [
      { prefix: "postgres=>", text: "ALTER TABLE products", color: "text-gray-200" },
      { prefix: "", text: "ADD COLUMN stock INT DEFAULT 0,", color: "text-gray-200" },
      { prefix: "", text: "ADD INDEX idx_stock (stock);", color: "text-gray-200" },
      { prefix: "", text: "", color: "text-gray-200" },
      { prefix: "", text: "Query OK, 0 rows affected (0.05 sec)", color: "text-green-500" },
    ],
  },
  {
    id: 5,
    command: "JOIN query",
    lines: [
      { prefix: "postgres=>", text: "SELECT u.name, COUNT(o.id) as orders", color: "text-gray-200" },
      { prefix: "", text: "FROM users u", color: "text-gray-200" },
      { prefix: "", text: "LEFT JOIN orders o ON u.id = o.user_id", color: "text-gray-200" },
      { prefix: "", text: "GROUP BY u.id;", color: "text-gray-200" },
      { prefix: "", text: "3 rows in set (0.01 sec)", color: "text-green-500" },
    ],
  },
];

export const RotatingTerminal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % terminalQueries.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate position for each card in the stack
  const getCardStyle = (index: number) => {
    const diff = (index - currentIndex + terminalQueries.length) % terminalQueries.length;
    
    // Cards stack: current on top, others behind with offset
    if (diff === 0) {
      // Front card
      return {
        zIndex: 50,
        scale: 1,
        y: 0,
        x: 0,
        opacity: 1,
        rotateX: 0,
      };
    } else if (diff === 1 || diff === terminalQueries.length - 1) {
      // Cards immediately behind (left and right peek)
      const direction = diff === 1 ? 1 : -1;
      return {
        zIndex: 40,
        scale: 0.92,
        y: 12,
        x: direction * 15,
        opacity: 0.7,
        rotateX: 0,
      };
    } else if (diff === 2 || diff === terminalQueries.length - 2) {
      // Cards further behind
      const direction = diff === 2 ? 1 : -1;
      return {
        zIndex: 30,
        scale: 0.84,
        y: 24,
        x: direction * 25,
        opacity: 0.4,
        rotateX: 0,
      };
    } else {
      // Hidden cards
      return {
        zIndex: 10,
        scale: 0.76,
        y: 36,
        x: 0,
        opacity: 0,
        rotateX: 0,
      };
    }
  };

  return (
    <div className="relative h-[280px] w-full" style={{ perspective: "1000px" }}>
      {/* Stacked cards */}
      <div className="relative w-full h-full flex items-center justify-center">
        {terminalQueries.map((query, index) => {
          const style = getCardStyle(index);
          return (
            <motion.div
              key={query.id}
              className="absolute w-full max-w-md"
              animate={{
                zIndex: style.zIndex,
                scale: style.scale,
                y: style.y,
                x: style.x,
                opacity: style.opacity,
                rotateX: style.rotateX,
              }}
              transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1],
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="bg-[#0F172A] rounded-xl p-4 shadow-2xl border border-gray-800">
                {/* Terminal window controls */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="ml-2 text-xs text-gray-500 font-mono">mysql terminal</span>
                </div>

                {/* Terminal content */}
                <div className="font-mono text-sm min-h-[140px]">
                  {query.lines.map((line, idx) => (
                    <p key={idx} className={line.color}>
                      {line.prefix && <span className="text-gray-500">{line.prefix} </span>}
                      {line.text}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Indicator dots */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {terminalQueries.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-gray-800 w-4"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
