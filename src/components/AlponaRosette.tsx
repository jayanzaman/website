// src/components/AlponaRosette.tsx
'use client';

import React from 'react';

interface AlponaRosetteProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string; // Optional custom stroke color
}

export default function AlponaRosette({
  width = 100,
  height = 100,
  className = '',
  color = 'var(--vermilion)',
}: AlponaRosetteProps) {
  const cx = 100;
  const cy = 100;

  // Generate 8 radiating petals (ellipses offset from center and rotated)
  const petals = Array.from({ length: 8 }).map((_, i) => {
    const angle = i * 45;
    return (
      <ellipse
        key={`petal-${i}`}
        cx={cx + 26} // Offset along the horizontal line (so it touches center and extends out)
        cy={cy}
        rx="26" // Petal length radius
        ry="8"  // Petal width radius
        transform={`rotate(${angle}, ${cx}, ${cy})`}
        stroke={color}
        strokeWidth="1"
        fill="none"
      />
    );
  });

  // Generate 8 tiny dots at the outer tip of each petal
  const tips = Array.from({ length: 8 }).map((_, i) => {
    const angle = i * 45;
    return (
      <circle
        key={`tip-${i}`}
        cx={cx + 52} // Tip of the petal (cx + 2 * rx)
        cy={cy}
        r="1.5"
        transform={`rotate(${angle}, ${cx}, ${cy})`}
        fill={color}
      />
    );
  });

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Faint Drafting Guidelines (for technical/architectural aesthetic) */}
        <circle
          cx={cx}
          cy={cy}
          r="52"
          stroke="var(--paper-edge)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />
        <circle
          cx={cx}
          cy={cy}
          r="26"
          stroke="var(--paper-edge)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />
        <line
          x1="30"
          y1={cy}
          x2="170"
          y2={cy}
          stroke="var(--paper-edge)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />
        <line
          x1={cx}
          y1="30"
          x2={cx}
          y2="170"
          stroke="var(--paper-edge)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />

        {/* 8 Radiating Ellipses (Petals) */}
        {petals}

        {/* Outer dots at the tips of the petals */}
        {tips}

        {/* Two Concentric Circles at the center */}
        <circle
          cx={cx}
          cy={cy}
          r="10"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx={cx}
          cy={cy}
          r="5"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />

        {/* Single Center Dot */}
        <circle
          cx={cx}
          cy={cy}
          r="2"
          fill={color}
        />
      </svg>
    </div>
  );
}
