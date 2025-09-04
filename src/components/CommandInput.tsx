'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CommandInputProps {
  onCommand: (command: string) => void;
  isDisabled?: boolean;
  currentUser?: string | null;
  placeholder?: string;
  commandHistory?: string[];
  className?: string;
}

export const CommandInput = ({ 
  onCommand, 
  isDisabled = false,
  currentUser,
  placeholder = "Enter command...",
  commandHistory = [],
  className 
}: CommandInputProps) => {
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount and when not disabled
  useEffect(() => {
    if (!isDisabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isDisabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isDisabled) {
      onCommand(input.trim());
      setInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete functionality
      const commonCommands = [
        'HELP', 'STATUS', 'SYSTEMS', 'CREW', 'NAVIGATION', 'MISSION', 
        'LOGS', 'SCAN', 'EMERGENCY', 'SPECIAL', 'MOTHUR', 'ALERTS',
        'QUARANTINE', 'XENOMORPH', 'SELF_DESTRUCT', 'LOGOUT', 'EXIT'
      ];
      
      const matches = commonCommands.filter(cmd => 
        cmd.toLowerCase().startsWith(input.toLowerCase())
      );
      
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        // Show available completions
        console.log('Available completions:', matches);
      }
    }
  };

  const getPrompt = (): string => {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    if (!currentUser) {
      return `AUTH [${timestamp}]> `;
    }
    
    return `MU-TH-UR [${currentUser}] [${timestamp}]> `;
  };

  if (isDisabled) {
    return (
      <div className={clsx(
        'flex items-center p-2 md:p-4 bg-black bg-opacity-60 border-t border-green-600',
        'font-mono text-green-400 flex-shrink-0',
        className
      )}>
        <span className="text-yellow-400 text-sm">System processing...</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-green-400 ml-2"
        />
      </div>
    );
  }

  return (
    <div className={clsx(
      'border-t border-green-600 bg-black bg-opacity-60 flex-shrink-0',
      className
    )}>
      <form onSubmit={handleSubmit} className="flex items-center p-2 sm:p-3 md:p-4 w-full">
        <span 
          className="text-green-400 font-mono text-xs sm:text-sm mr-2 select-none flex-shrink-0"
          style={{ textShadow: '0 0 10px currentColor' }}
        >
          {getPrompt()}
        </span>
        
        <div className="flex-1 min-w-0 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={clsx(
              'w-full bg-transparent text-green-300 font-mono',
              'text-sm sm:text-sm md:text-base', // Larger text on mobile
              'outline-none border-none',
              'placeholder-green-500 placeholder:opacity-90', // Brighter placeholder
              'caret-green-400',
              // Ensure mobile keyboard shows
              'focus:outline-none focus:ring-0'
            )}
            style={{ 
              textShadow: '0 0 5px currentColor',
              fontSize: '16px' // Prevent iOS zoom by using exactly 16px
            }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="characters"
            spellCheck={false}
            data-1p-ignore
            data-lpignore="true"
            data-form-type="other"
            // Mobile-specific attributes
            inputMode="text"
            enterKeyHint="go"
          />
          
          {/* Fallback visual placeholder for mobile when native placeholder isn't visible */}
          {!input && (
            <div 
              className="absolute inset-0 flex items-center pointer-events-none"
              style={{ 
                color: 'rgb(34 197 94 / 0.6)', // green-500 with opacity
                textShadow: '0 0 5px currentColor',
                fontSize: 'max(14px, 0.875rem)'
              }}
            >
              <span className="font-mono">{placeholder}</span>
            </div>
          )}
        </div>
        
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-2 h-4 bg-green-400 ml-1 flex-shrink-0"
        />
      </form>
      
      {/* Command suggestions */}
      {input && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-2 md:px-4 pb-2"
        >
          <div className="text-xs text-green-600 font-mono">
            Available commands: HELP, STATUS, SYSTEMS, CREW, SCAN, SPECIAL...
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CommandInput;
