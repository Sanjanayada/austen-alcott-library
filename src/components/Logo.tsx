import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = '', size = 120 }: LogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_12px_rgba(197,168,92,0.35)] animate-pulse-slow"
      >
        {/* Decorative circle ornament behind */}
        <circle
          cx="100"
          cy="100"
          r="92"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="opacity-40"
        />
        <circle
          cx="100"
          cy="100"
          r="86"
          stroke="url(#goldGradient)"
          strokeWidth="0.5"
          className="opacity-20"
        />

        {/* Interlocking 'AA' Letters Path */}
        <g transform="translate(10, 5)">
          {/* Left 'A' */}
          <path
            d="M 65,150 L 95,45 L 105,45 L 135,150"
            stroke="url(#goldGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right 'A' intersecting & offset */}
          <path
            d="M 45,150 L 75,45 L 85,45 L 115,150"
            stroke="url(#goldGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mix-blend-lighten"
          />

          {/* Intertwined elegant loops in the middle (the cursive ribbon) */}
          <path
            d="M 40,110 C 65,110 70,85 90,85 C 110,85 115,110 140,110 C 130,125 110,120 90,105 C 70,120 50,125 40,110 Z"
            fill="url(#goldGradient)"
            className="opacity-95"
          />

          {/* Golden Serif Seraph embellishments */}
          <path
            d="M 35,150 L 55,150 M 55,150 M 125,150 L 145,150 M 25,150 L 155,150"
            stroke="url(#goldGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>

        {/* Definitions for rich gold radial and linear gradients */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBA6B" />
            <stop offset="30%" stopColor="#C5A85C" />
            <stop offset="70%" stopColor="#EAD297" />
            <stop offset="100%" stopColor="#9B7F34" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
