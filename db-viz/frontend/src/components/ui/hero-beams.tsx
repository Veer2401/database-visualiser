"use client";
import React from "react";
import { motion } from "framer-motion";

interface BeamProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
  duration: number;
}

const Beam = ({ startX, startY, endX, endY, delay, duration }: BeamProps) => {
  // Calculate angle for the beam
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        width: `${length}%`,
        height: "2px",
        transformOrigin: "0% 50%",
        transform: `rotate(${angle}deg)`,
      }}
    >
      {/* Main beam with gradient trail */}
      <motion.div
        className="absolute h-full w-full"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: [0, 0.3, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: duration,
          delay: delay,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeOut",
        }}
        style={{
          transformOrigin: "0% 50%",
          background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.4) 80%, transparent 100%)",
          borderRadius: "2px",
        }}
      />
      {/* Bright head of the beam */}
      <motion.div
        className="absolute h-[3px] w-[20px] -top-[0.5px] rounded-full"
        initial={{ left: "0%", opacity: 0 }}
        animate={{ 
          left: ["0%", "30%"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: duration,
          delay: delay,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeOut",
        }}
        style={{
          background: "linear-gradient(90deg, transparent, #000, #000)",
          boxShadow: "0 0 4px rgba(0,0,0,0.3)",
        }}
      />
    </motion.div>
  );
};

export const HeroBeams = () => {
  // Beams going in multiple directions from outside the text area
  // Mix of diagonal, horizontal, and various angles
  const beams: BeamProps[] = [
    // Top-left area - various directions
    { startX: 18, startY: 22, endX: 2, endY: 5, delay: 0, duration: 1.5 },        // diagonal to corner
    { startX: 12, startY: 35, endX: 2, endY: 38, delay: 0.8, duration: 1.3 },     // mostly horizontal left
    { startX: 22, startY: 18, endX: 25, endY: 3, delay: 1.6, duration: 1.4 },     // mostly vertical up
    
    // Top-right area - various directions
    { startX: 82, startY: 22, endX: 98, endY: 5, delay: 0.3, duration: 1.5 },     // diagonal to corner
    { startX: 88, startY: 35, endX: 98, endY: 32, delay: 1.1, duration: 1.3 },    // mostly horizontal right
    { startX: 78, startY: 18, endX: 75, endY: 3, delay: 1.9, duration: 1.4 },     // mostly vertical up
    
    // Bottom-left area - various directions
    { startX: 18, startY: 78, endX: 2, endY: 95, delay: 0.5, duration: 1.5 },     // diagonal to corner
    { startX: 12, startY: 65, endX: 2, endY: 62, delay: 1.3, duration: 1.3 },     // mostly horizontal left
    { startX: 22, startY: 82, endX: 25, endY: 97, delay: 2.1, duration: 1.4 },    // mostly vertical down
    
    // Bottom-right area - various directions
    { startX: 82, startY: 78, endX: 98, endY: 95, delay: 0.7, duration: 1.5 },    // diagonal to corner
    { startX: 88, startY: 65, endX: 98, endY: 68, delay: 1.5, duration: 1.3 },    // mostly horizontal right
    { startX: 78, startY: 82, endX: 75, endY: 97, delay: 2.3, duration: 1.4 },    // mostly vertical down
    
    // Additional cross-direction beams for more variety
    { startX: 15, startY: 50, endX: 2, endY: 45, delay: 2.5, duration: 1.2 },     // left side, slight up
    { startX: 85, startY: 50, endX: 98, endY: 55, delay: 2.8, duration: 1.2 },    // right side, slight down
    { startX: 45, startY: 15, endX: 40, endY: 2, delay: 3.0, duration: 1.2 },     // top side, slight left
    { startX: 55, startY: 85, endX: 60, endY: 98, delay: 3.3, duration: 1.2 },    // bottom side, slight right
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {beams.map((beam, index) => (
        <Beam key={index} {...beam} />
      ))}
    </div>
  );
};
