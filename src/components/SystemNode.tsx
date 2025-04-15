import React from 'react';
import { motion } from 'framer-motion';

type ColorType = 'emerald' | 'violet' | 'amber' | 'sky' | 'rose';

const colorMap = {
  emerald: { shadow: 'rgba(16, 185, 129, 0.6)', border: '#10b981' },
  violet: { shadow: 'rgba(139, 92, 246, 0.6)', border: '#8b5cf6' },
  amber: { shadow: 'rgba(245, 158, 11, 0.6)', border: '#f59e0b' },
  sky: { shadow: 'rgba(14, 165, 233, 0.6)', border: '#0ea5e9' },
  rose: { shadow: 'rgba(244, 63, 94, 0.6)', border: '#f43f5e' }
};

interface SystemNodeProps {
  title: string;
  icon: React.ReactNode;
  className?: string;
  color?: ColorType;
}

export const SystemNode: React.FC<SystemNodeProps> = ({ 
  title, 
  icon,
  className = '',
  color = 'emerald'
}) => {
  return (
    <motion.div 
      className={`relative flex flex-col items-center justify-center rounded-lg border bg-white p-4 cursor-pointer ${className}`}
      style={{ zIndex: 20 }}
      initial={{ 
        borderColor: '#1e293b',
        boxShadow: '0 0 0 rgba(0,0,0,0)'
      }}
      whileHover={{ 
        scale: 1.05,
        borderColor: colorMap[color].border,
        boxShadow: `0 0 24px ${colorMap[color].shadow}`,
      }}
      transition={{
        duration: 0.2,
        scale: {
          type: "spring",
          stiffness: 300
        }
      }}
    >
      <motion.div 
        className="text-black"
        whileHover={{ 
          scale: 1.1,
          rotate: 5
        }}
        transition={{
          duration: 0.2
        }}
      >
        {icon}
      </motion.div>
      <div className="mt-2 text-sm font-medium text-black">
        {title}
      </div>
    </motion.div>
  );
};