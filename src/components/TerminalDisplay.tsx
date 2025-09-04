'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface TerminalLine {
  id: string;
  text: string;
  type?: 'input' | 'output' | 'error' | 'success' | 'warning' | 'info' | 'system';
  delay?: number;
}

interface TerminalDisplayProps {
  lines: TerminalLine[];
  isTyping?: boolean;
  className?: string;
}

export const TerminalDisplay = ({ lines, isTyping = false, className }: TerminalDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  // Directly show lines without complex animation to avoid key conflicts
  useEffect(() => {
    setVisibleLines(lines);
  }, [lines]);

  const getLineColor = (type?: string): string => {
    switch (type) {
      case 'input': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'success': return 'text-green-300';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-cyan-400';
      case 'system': return 'text-blue-400';
      default: return 'text-green-300';
    }
  };

  const getLinePrefix = (type?: string): string => {
    switch (type) {
      case 'input': return 'MU-TH-UR> ';
      case 'error': return '🚨 ';
      case 'success': return '✅ ';
      case 'warning': return '⚠ ';
      case 'system': return '>>> ';
      default: return '';
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        'font-mono text-sm leading-relaxed',
        'overflow-y-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-green-600',
        'h-full max-h-full p-2 md:p-4 bg-black bg-opacity-80',
        'selection:bg-green-400 selection:text-black',
        className
      )}
      style={{
        textShadow: '0 0 10px currentColor',
        background: 'radial-gradient(ellipse at center, rgba(0, 255, 0, 0.1) 0%, rgba(0, 0, 0, 0.9) 70%)',
        minHeight: 0 // Allow flexbox to shrink
      }}
    >
      <AnimatePresence>
        {visibleLines.map((line, index) => (
          <TerminalLine 
            key={line.id} 
            line={line} 
            getLineColor={getLineColor}
            getLinePrefix={getLinePrefix}
            index={index}
          />
        ))}
      </AnimatePresence>
      
      {isTyping && <TypingCursor />}
    </div>
  );
};

interface TerminalLineProps {
  line: TerminalLine;
  getLineColor: (type?: string) => string;
  getLinePrefix: (type?: string) => string;
  index: number;
}

const TerminalLine = ({ line, getLineColor, getLinePrefix, index }: TerminalLineProps) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (line.type === 'input' || line.text.length < 50) {
      // Show immediately for short lines or input
      setDisplayText(line.text);
      setShowCursor(false);
      return;
    }

    // Typing animation for longer output lines
    let currentIndex = 0;
    const typeNextChar = () => {
      if (currentIndex < line.text.length) {
        setDisplayText(line.text.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeNextChar, Math.random() * 20 + 10); // Variable typing speed
      } else {
        setShowCursor(false);
      }
    };

    typeNextChar();
  }, [line.text, line.type]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={clsx(
        getLineColor(line.type),
        'whitespace-pre-wrap break-words',
        line.type === 'error' && 'animate-pulse',
        line.type === 'warning' && 'animate-pulse'
      )}
    >
      <span className="select-none">{getLinePrefix(line.type)}</span>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-green-400 ml-1"
        />
      )}
    </motion.div>
  );
};

const TypingCursor = () => (
  <motion.div
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 1, repeat: Infinity }}
    className="inline-block w-3 h-5 bg-green-400 mt-2"
  />
);

export default TerminalDisplay;
