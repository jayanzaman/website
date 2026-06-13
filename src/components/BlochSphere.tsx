// src/components/BlochSphere.tsx
'use client';

import React from 'react';

interface BlochSphereProps {
  state: 'excited' | 'superposition' | 'ground';
  width?: number;
  height?: number;
  className?: string;
}

export default function BlochSphere({
  state,
  width = 200,
  height = 200,
  className = '',
}: BlochSphereProps) {
  // Center is (100, 100), Radius is 80
  const cx = 100;
  const cy = 100;
  const r = 80;

  // Determine vector endpoint based on state
  let vx = cx;
  let vy = cy - r; // Default to Ground (straight up)

  if (state === 'excited') {
    // Excited state pointing at an angle (45 degrees polar, 45 degrees azimuthal)
    vx = 156;
    vy = 56;
  } else if (state === 'superposition') {
    // Superposition state pointing to the equator (90 degrees polar, 30 degrees azimuthal)
    vx = 169;
    vy = 78;
  } else if (state === 'ground') {
    // Ground state pointing straight up (theta = 0)
    vx = 100;
    vy = 20;
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-sumi"
      >
        {/* Outer Sphere Boundary */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          stroke="var(--sumi)"
          strokeWidth="1"
          fill="none"
        />

        {/* Equator - Back (Dashed) */}
        <path
          d={`M ${cx - r} ${cy} A ${r} 24 0 0 1 ${cx + r} ${cy}`}
          stroke="var(--sumi-3)"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
        />

        {/* Equator - Front (Solid) */}
        <path
          d={`M ${cx - r} ${cy} A ${r} 24 0 0 0 ${cx + r} ${cy}`}
          stroke="var(--sumi)"
          strokeWidth="1"
          fill="none"
        />

        {/* Faint Axes */}
        {/* Z-Axis (Vertical) */}
        <line
          x1={cx}
          y1={cy - r}
          x2={cx}
          y2={cy + r}
          stroke="var(--paper-edge)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        {/* X-Axis (Horizontal) */}
        <line
          x1={cx - r}
          y1={cy}
          x2={cx + r}
          y2={cy}
          stroke="var(--paper-edge)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        {/* Y-Axis (Diagonal depth) */}
        <line
          x1={43}
          y1={157}
          x2={157}
          y2={43}
          stroke="var(--paper-edge)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />

        {/* Labels for States */}
        <text
          x={cx}
          y={cy - r - 8}
          textAnchor="middle"
          fill="var(--sumi)"
          className="font-mono text-[11px] select-none"
        >
          |0⟩
        </text>
        <text
          x={cx}
          y={cy + r + 16}
          textAnchor="middle"
          fill="var(--sumi)"
          className="font-mono text-[11px] select-none"
        >
          |1⟩
        </text>

        {/* Qubit State Vector (Pora Mati accent) */}
        <line
          x1={cx}
          y1={cy}
          x2={vx}
          y2={vy}
          stroke="var(--vermilion)"
          strokeWidth="1.5"
        />
        {/* Terminating Vector Dot */}
        <circle
          cx={vx}
          cy={vy}
          r="4"
          fill="var(--vermilion)"
        />
      </svg>
    </div>
  );
}
