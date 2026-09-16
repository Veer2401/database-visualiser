import React, { useId } from 'react';

interface SchemaViewLogoProps {
  size?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string; // Optional custom stroke color, defaults to the #57C258 -> #38AA78 gradient
  strokeWidth?: number;
}

/**
 * Official Schema View Brand Logo
 * 4-tiered isometric database layer stack with mathematically balanced perspective.
 */
export default function SchemaViewLogo({
  size = 24,
  width,
  height,
  className = '',
  color,
  strokeWidth = 5.6,
}: SchemaViewLogoProps) {
  const autoId = useId();
  const gradId = `sv-logo-grad-${autoId.replace(/:/g, '')}`;
  const resolvedWidth = width ?? size;
  const resolvedHeight = height ?? (typeof size === 'number' ? Math.round(size * 0.92) : size);

  return (
    <svg
      width={resolvedWidth}
      height={resolvedHeight}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Schema View Logo"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#57C258" />
          <stop offset="100%" stopColor="#38AA78" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke={color ?? `url(#${gradId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Top Rhombus Layer */}
        <path d="M 50 21.5 L 92 32.9 L 50 44.3 L 8 32.9 Z" />
        {/* Layer 2 */}
        <path d="M 29 38.6 L 8 44.3 L 50 55.7 L 92 44.3 L 71 38.6" />
        {/* Layer 3 */}
        <path d="M 29 50.0 L 8 55.7 L 50 67.1 L 92 55.7 L 71 50.0" />
        {/* Layer 4 (Base) */}
        <path d="M 29 61.4 L 8 67.1 L 50 78.5 L 92 67.1 L 71 61.4" />
      </g>
    </svg>
  );
}
