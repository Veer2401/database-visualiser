'use client';

import React from 'react';
import { BaseEdge, EdgeProps, getSmoothStepPath } from 'reactflow';

interface RelationshipEdgeData {
  sourceColumn?: string;
  targetColumn?: string;
}

export default function RelationshipEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  markerStart,
}: EdgeProps<RelationshipEdgeData>) {
  // Use smooth step path with rounded corners (borderRadius: 8)
  // When source and target are horizontally aligned, this renders as a completely straight horizontal line
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 8,
    offset: 20,
  });

  return (
    <>
      <defs>
        {/* ER One Marker (Single Tick '|' on the referenced / PK side) */}
        <marker
          id="erd-one"
          viewBox="0 0 10 12"
          refX="5"
          refY="6"
          markerWidth="8"
          markerHeight="10"
          orient="auto-start-reverse"
        >
          <line
            x1="5"
            y1="1"
            x2="5"
            y2="11"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </marker>

        {/* ER Many Marker (Crow's Foot / Fork '<o' on the referencing / FK side) */}
        <marker
          id="erd-many"
          viewBox="0 0 14 12"
          refX="11"
          refY="6"
          markerWidth="11"
          markerHeight="9"
          orient="auto-start-reverse"
        >
          {/* Small ring circle */}
          <circle
            cx="4"
            cy="6"
            r="2"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="1.75"
          />
          {/* Crow's foot prongs */}
          <line
            x1="12"
            y1="1.5"
            x2="6"
            y2="6"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="6"
            x2="6"
            y2="6"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="10.5"
            x2="6"
            y2="6"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </marker>
      </defs>

      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          strokeWidth: 2,
          stroke: '#000000',
          strokeDasharray: 'none',
        }}
        markerStart={markerStart || 'url(#erd-one)'}
        markerEnd={markerEnd || 'url(#erd-many)'}
      />
    </>
  );
}
