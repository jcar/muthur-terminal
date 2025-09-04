'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import TerminalDisplay from './TerminalDisplay';
import CommandInput from './CommandInput';
import LoginScreen from './LoginScreen';
import { MUTHURCommandProcessor } from '../lib/command-processor';
import { createInitialTerminalState, generateRandomAlert, STARTUP_SEQUENCE } from '../lib/muthur-data';
import { ASCII_ART } from '../lib/types';
import type { TerminalState } from '../lib/types';

interface TerminalLine {
  id: string;
  text: string;
  type?: 'input' | 'output' | 'error' | 'success' | 'warning' | 'info' | 'system';
  delay?: number;
}

export const MUTHURTerminal = () => {
  const [state, setState] = useState<TerminalState>(createInitialTerminalState());
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [isStartingUp, setIsStartingUp] = useState(false);
  
  const commandProcessor = useRef<MUTHURCommandProcessor | null>(null);
  const alertInterval = useRef<NodeJS.Timeout | null>(null);
  const lineIdCounter = useRef(0);
  const sessionId = useRef(Date.now()); // Unique session identifier

  // Initialize command processor
  useEffect(() => {
    commandProcessor.current = new MUTHURCommandProcessor(state);
  }, [state]);

  const generateUniqueId = () => {
    // Use crypto.randomUUID if available, otherwise fallback to timestamp-based ID
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return `line-${crypto.randomUUID()}`;
    }
    return `line-${sessionId.current}-${lineIdCounter.current++}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addLine = (text: string, type?: TerminalLine['type'], delay?: number) => {
    const newLine: TerminalLine = {
      id: generateUniqueId(),
      text,
      type,
      delay
    };
    setLines(prev => {
      const updated = [...prev, newLine];
      // Immediate and aggressive scroll triggers
      const scrollNow = () => {
        const container = document.querySelector('.terminal-display');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      };
      
      // Multiple scroll attempts with different timings
      setTimeout(scrollNow, 0);
      setTimeout(scrollNow, 10);
      setTimeout(scrollNow, 50);
      setTimeout(scrollNow, 100);
      requestAnimationFrame(scrollNow);
      
      return updated;
    });
  };

  const addMultipleLines = (texts: string[], type?: TerminalLine['type']) => {
    const newLines = texts.map(text => ({
      id: generateUniqueId(),
      text,
      type,
      delay: 50
    }));
    setLines(prev => [...prev, ...newLines]);
  };

  const clearScreen = () => {
    setLines([]);
    lineIdCounter.current = 0;
  };

  // Random alert system
  useEffect(() => {
    if (state.isLoggedIn && state.alienDetected) {
      alertInterval.current = setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
          const alert = generateRandomAlert();
          setState(prev => ({
            ...prev,
            systemAlerts: [...prev.systemAlerts.slice(-4), alert] // Keep last 5 alerts
          }));
          
          // Show alert in terminal
          const newLine: TerminalLine = {
            id: generateUniqueId(),
            text: `🚨 SYSTEM ALERT: ${alert.message}`,
            type: 'warning'
          };
          setLines(prev => [...prev, newLine]);
        }
      }, 45000); // Every 45 seconds

      return () => {
        if (alertInterval.current) {
          clearInterval(alertInterval.current);
        }
      };
    }
  }, [state.isLoggedIn, state.alienDetected]);

  const handleLogin = async (userId: string) => {
    setIsStartingUp(true);
    setShowLogin(false);
    
    // Show startup sequence
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Weyland-Yutani logo
    addLine(ASCII_ART.WEYLAND_YUTANI, 'success');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Startup sequence
    for (let i = 0; i < STARTUP_SEQUENCE.length; i++) {
      addLine(STARTUP_SEQUENCE[i], 'system', 100);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (i < STARTUP_SEQUENCE.length - 1) {
        addLine('  [████████████████████████████████] 100%', 'success', 50);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // System online
    addLine('', 'output');
    addLine('╔██████████████████████████████████████████████████╗', 'success');
    addLine('║                MU-TH-UR 6000                     ║', 'success');
    addLine('║         MAINFRAME COMPUTER SYSTEM                ║', 'success');
    addLine('║                                                  ║', 'success');
    addLine('║  SHIP: USCSS NOSTROMO                           ║', 'success');
    addLine('║  ID:   180924609                                ║', 'success');
    addLine('║                                                  ║', 'success');
    addLine('║         >>> SYSTEM ONLINE <<<                   ║', 'success');
    addLine('╚██████████████████████████████████████████████████╝', 'success');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Emergency warnings
    addLine('', 'output');
    addLine('⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠', 'warning');
    addLine('    EMERGENCY PROTOCOLS ACTIVE', 'warning');
    addLine('    CREW ALERT STATUS: RED', 'warning');
    addLine('    HOSTILE ORGANISM DETECTED', 'warning');
    addLine('⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠⚠', 'warning');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show Nostromo ASCII art
    addLine('', 'output');
    addLine(ASCII_ART.NOSTROMO, 'info');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Welcome message
    const crewMember = userId === 'ASH' ? 'SYNTHETIC OVERRIDE DETECTED' : `WELCOME, ${userId}`;
    addLine('', 'output');
    addLine(`✅ AUTHENTICATION SUCCESSFUL`, 'success');
    addLine(`✅ ${crewMember}`, 'success');
    addLine('', 'output');
    addLine('MU-TH-UR 6000 mainframe ready for input', 'info');
    addLine("Type 'HELP' for available commands", 'info');
    
    // Update state
    setState(prev => ({
      ...prev,
      isLoggedIn: true,
      currentUser: userId
    }));
    
    setIsStartingUp(false);
    
    // Add initial system alert
    setTimeout(() => {
      addLine('🚨 SYSTEM ALERT: Unknown organism detected in maintenance shaft', 'warning');
    }, 2000);
  };

  const handleCommand = async (command: string) => {
    if (!commandProcessor.current || isLoading) return;
    
    setIsLoading(true);
    
    // Add command to history and display
    setState(prev => ({
      ...prev,
      commandHistory: [...prev.commandHistory.slice(-19), command] // Keep last 20 commands
    }));
    
    addLine(command, 'input');
    
    // Process command
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate processing delay
    
    if (command.toUpperCase() === 'CLEAR') {
      clearScreen();
    } else if (command.toUpperCase() === 'LOGOUT') {
      setState(prev => ({
        ...prev,
        isLoggedIn: false,
        currentUser: null
      }));
      setShowLogin(true);
      clearScreen();
    } else {
      const result = commandProcessor.current.processCommand(command);
      
      if (result.clearScreen) {
        clearScreen();
      }
      
      if (result.output.length > 0) {
        addMultipleLines(result.output, result.statusColor);
      }
    }
    
    addLine('', 'output'); // Add blank line after command output
    setIsLoading(false);
  };

  const handleLoginAttempt = (userId: string, success: boolean) => {
    if (success) {
      console.log(`Successful login: ${userId}`);
    } else {
      console.log(`Failed login attempt: ${userId}`);
    }
  };

  if (showLogin) {
    return (
      <div className="terminal-container bg-black text-green-400">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)',
            animation: 'scan 8s linear infinite'
          }}
        />
        <LoginScreen 
          onLogin={handleLogin}
          onLoginAttempt={handleLoginAttempt}
          className="relative z-10 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="terminal-container bg-black text-green-400">
      {/* Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)',
          animation: 'scan 8s linear infinite'
        }}
      />
      
      {/* CRT flicker effect */}
      <motion.div
        animate={{ opacity: [0.95, 1, 0.95] }}
        transition={{ duration: 0.1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0 bg-green-400 opacity-5 pointer-events-none z-10"
      />
      
      {/* Alert indicator */}
      <AnimatePresence>
        {state.systemAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-2 right-2 z-30"
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center bg-red-900 bg-opacity-80 border border-red-400 px-2 py-1 rounded text-xs"
            >
              <span className="text-red-400 font-mono mr-1">🚨</span>
              <span className="text-red-300 font-mono">
                ALERTS: {state.systemAlerts.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Terminal content */}
      <div className="terminal-content relative z-10">
        <TerminalDisplay 
          lines={lines}
          isTyping={isStartingUp || isLoading}
          className="terminal-display"
        />
        
        <div className="flex-shrink-0">
          <CommandInput
            onCommand={handleCommand}
            isDisabled={isLoading || isStartingUp}
            currentUser={state.currentUser}
            commandHistory={state.commandHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default MUTHURTerminal;
