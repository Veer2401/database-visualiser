'use client';

import React, { useEffect, useRef } from 'react';

interface NoiseBackgroundProps {
  children: React.ReactNode;
  containerClassName?: string;
  gradientColors?: string[];
}

export function NoiseBackground({
  children,
  containerClassName = '',
  gradientColors = [
    'rgb(255, 100, 150)',
    'rgb(100, 150, 255)',
    'rgb(255, 200, 100)',
  ],
}: NoiseBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gradientRef = useRef<string[]>(gradientColors);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Animation state
    let animationFrameId: number;
    let time = 0;

    const drawNoise = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      const colors = gradientRef.current;
      
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
      });

      // Fill with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add noise
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 30; // Noise intensity
        data[i] += noise;     // R
        data[i + 1] += noise; // G
        data[i + 2] += noise; // B
      }

      ctx.putImageData(imageData, 0, 0);

      // Animate gradient colors
      time += 0.001;
      const shift = Math.sin(time) * 0.1;
      
      // Update gradient colors for next frame
      gradientRef.current = colors.map((color, index) => {
        const offset = (shift + index / colors.length) % 1;
        return colors[Math.floor(offset * colors.length)];
      });

      animationFrameId = requestAnimationFrame(drawNoise);
    };

    drawNoise();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
