'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { CREW_MANIFEST } from '../lib/muthur-data';

interface LoginScreenProps {
  onLogin: (userId: string) => void;
  onLoginAttempt?: (userId: string, success: boolean) => void;
  className?: string;
}

export const LoginScreen = ({ onLogin, onLoginAttempt, className }: LoginScreenProps) => {
  const [userId, setUserId] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const maxAttempts = 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || isLoading || attempts >= maxAttempts) return;

    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const userIdUpper = userId.trim().toUpperCase();
    const crewMember = CREW_MANIFEST[userIdUpper];

    if (!crewMember) {
      setError('INVALID USER ID');
      setAttempts(prev => prev + 1);
      onLoginAttempt?.(userIdUpper, false);
    } else if (crewMember.status === 'DEACTIVATED') {
      setError('ACCESS DENIED: SYNTHETIC UNIT DEACTIVATED');
      setAttempts(prev => prev + 1);
      onLoginAttempt?.(userIdUpper, false);
    } else if (['MISSING', 'DECEASED'].includes(crewMember.status)) {
      setError(`ACCESS DENIED: CREW MEMBER STATUS - ${crewMember.status}`);
      setAttempts(prev => prev + 1);
      onLoginAttempt?.(userIdUpper, false);
    } else {
      // Successful login
      onLogin(userIdUpper);
      onLoginAttempt?.(userIdUpper, true);
      return;
    }

    setIsLoading(false);
    setUserId('');

    if (attempts + 1 >= maxAttempts) {
      setTimeout(() => {
        setError('MAXIMUM ATTEMPTS EXCEEDED - TERMINAL LOCKED');
      }, 1000);
    }
  };

  const remainingAttempts = maxAttempts - attempts;

  return (
    <div className={clsx('flex flex-col items-center justify-center h-full max-h-full overflow-y-auto p-4 md:p-8', className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Weyland-Yutani Header */}
        <div className="text-center mb-4 md:mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="border border-green-600 p-3 md:p-6 mb-4 md:mb-6 bg-black bg-opacity-60"
          >
            <div className="text-green-400 font-mono text-sm md:text-lg font-bold mb-1 md:mb-2">
              WEYLAND-YUTANI CORPORATION
            </div>
            <div className="text-green-300 font-mono text-xs md:text-sm">
              BUILDING BETTER WORLDS
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-green-400 font-mono text-lg md:text-xl font-bold mb-1 md:mb-2"
            style={{ textShadow: '0 0 10px currentColor' }}
          >
            MU-TH-UR 6000
          </motion.div>
          <div className="text-green-300 font-mono text-xs md:text-sm mb-4 md:mb-6">
            MAINFRAME COMPUTER SYSTEM
          </div>
        </div>

        {/* Authentication Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="border border-green-600 p-3 md:p-6 bg-black bg-opacity-80"
        >
          <div className="text-center mb-6">
            <div className="text-green-400 font-mono text-sm md:text-lg mb-1 md:mb-2">
              AUTHENTICATION REQUIRED
            </div>
            <div className="text-green-300 font-mono text-xs md:text-sm">
              Enter valid crew identification
            </div>
          </div>

          {attempts >= maxAttempts ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="text-red-400 font-mono text-lg mb-4 animate-pulse">
                🚨 TERMINAL LOCKED 🚨
              </div>
              <div className="text-red-300 font-mono text-sm">
                Maximum authentication attempts exceeded
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-green-400 font-mono text-sm mb-2">
                  ENTER USER ID:
                </label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className={clsx(
                    'w-full p-3 bg-black border border-green-600',
                    'text-green-300 font-mono text-sm',
                    'focus:border-green-400 focus:outline-none',
                    'placeholder-green-700 uppercase'
                  )}
                  style={{ textShadow: '0 0 5px currentColor' }}
                  placeholder="CREW ID..."
                  autoComplete="off"
                  spellCheck={false}
                  disabled={isLoading}
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4"
                  >
                    <div className="text-red-400 font-mono text-sm animate-pulse">
                      🚨 {error}
                    </div>
                    {remainingAttempts > 0 && (
                      <div className="text-yellow-400 font-mono text-xs mt-1">
                        ATTEMPTS REMAINING: {remainingAttempts}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isLoading || !userId.trim() || attempts >= maxAttempts}
                className={clsx(
                  'w-full p-3 border border-green-600 bg-black',
                  'text-green-400 font-mono text-sm font-bold',
                  'hover:bg-green-600 hover:text-black transition-colors',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  'focus:outline-none focus:ring-2 focus:ring-green-400'
                )}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <span>AUTHENTICATING</span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="ml-2"
                    >
                      ...
                    </motion.span>
                  </div>
                ) : (
                  'AUTHENTICATE'
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Crew Hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-6 text-center"
        >
          <div className="text-green-600 font-mono text-xs mb-2">
            NOSTROMO CREW MEMBERS:
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {Object.entries(CREW_MANIFEST).map(([name, crew]) => (
              <div
                key={name}
                className={clsx(
                  'text-xs font-mono px-2 py-1 border border-gray-700',
                  crew.status === 'ACTIVE' ? 'text-green-400' : 'text-gray-500'
                )}
              >
                {name} ({crew.rank})
              </div>
            ))}
          </div>
          <div className="text-green-700 font-mono text-xs mt-2">
            Tip: Try RIPLEY for active access or ASH for synthetic override
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
