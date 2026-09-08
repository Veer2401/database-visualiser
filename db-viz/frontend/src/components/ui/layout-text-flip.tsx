"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LayoutTextFlip = ({
  text = "Build Amazing",
  words = ["Landing Pages", "Component Blocks", "Page Sections", "3D Shaders"],
  duration = 3000,
}: {
  text: string;
  words: string[];
  duration?: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <>
      <motion.span
        layoutId="subtext"
        className="text-5xl sm:text-6xl lg:text-7xl tracking-tight drop-shadow-lg italic"
        style={{ fontFamily: 'var(--font-instrument-serif)' }}
      >
        {text}
      </motion.span>

      <motion.span
        layout
        className="relative w-fit overflow-visible text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-black inline-block py-3"
        style={{ fontFamily: 'var(--font-geist-sans)' }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)" }}
            animate={{
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{
              duration: 0.5,
            }}
            className="inline-block whitespace-nowrap"
          >
            {words[currentIndex]}.
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};
