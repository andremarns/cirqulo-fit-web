"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface XPAnimationProps {
  amount: number;
  onComplete?: () => void;
}

export function XPAnimation({ amount, onComplete }: XPAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 0 }}
      animate={{ opacity: 1, scale: 1, y: -50 }}
      exit={{ opacity: 0, scale: 0.5, y: -100 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
    >
      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg">
        <span className="font-bold text-lg">+{amount} XP</span>
      </div>
    </motion.div>
  );
}
