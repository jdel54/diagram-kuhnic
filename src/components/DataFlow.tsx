import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ColorType = 'emerald' | 'violet' | 'amber' | 'sky' | 'rose';

interface DataFlowProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
  phase?: number;
  color?: ColorType;
  controlPoint1?: { x: number; y: number };
  controlPoint2?: { x: number; y: number };
  groupPhase?: number;
}

export const DataFlow: React.FC<DataFlowProps> = ({ 
  start, 
  end, 
  phase = 0, 
  color = 'emerald',
  controlPoint1,
  controlPoint2,
  groupPhase = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const pathD = controlPoint1 && controlPoint2
    ? `M ${start.x} ${start.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${end.x} ${end.y}`
    : `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

  const totalDuration = 40;
  const groupDuration = 8;
  const animationDuration = 8; // Full phase duration
  const groupDelay = groupPhase * 8;
  const phaseDelay = phase * 1;
  
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <defs>
        <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path
        d={pathD}
        stroke="#1e293b"
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
        opacity={0.2}
      />
      <motion.path
        d={pathD}
        stroke="#0ea5e9"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: [0, 1, 1],
          opacity: [0, isHovered ? 0.9 : 0.8, 0]
        }}
        transition={{
          duration: animationDuration,
          delay: groupDelay + phaseDelay,
          repeat: Infinity,
          repeatDelay: totalDuration - animationDuration,
          ease: "linear",
          times: [0, 0.2, 1] // Quickly draw the line and maintain it
        }}
        style={{
          filter: 'url(#glow-blue)'
        }}
      />
    </svg>
  );
};