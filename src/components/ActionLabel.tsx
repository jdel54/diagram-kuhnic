import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionLabelProps {
  text: string;
  isVisible: boolean;
  color?: string;
}

export const ActionLabel: React.FC<ActionLabelProps> = ({ text, isVisible, color = '#1e293b' }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <div 
            className="px-3 py-1.5 rounded-full text-xs font-medium shadow-sm bg-white/95 border"
            style={{ color, borderColor: color }}
          >
            {text}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 