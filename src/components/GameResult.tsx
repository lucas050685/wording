'use client';

import { useGame } from "./GameContext";
import { Loader } from "./Loader";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export function GameResult() {
  const { game, newGame } = useGame();
  const { theme } = useTheme();
  const [isRestarting, setIsRestarting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handlePlayAgain = async () => {
    setIsRestarting(true);
    await newGame();
    setIsRestarting(false);
  };

  // Auto-focus the button when modal opens
  useEffect(() => {
    if (buttonRef.current && game?.gameOver) {
      buttonRef.current.focus();
    }
  }, [game?.gameOver]);

  // Handle Enter key press anywhere in the modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !isRestarting && game?.gameOver) {
        handlePlayAgain();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRestarting, game?.gameOver]);

  if (!game || !game.gameOver) return null;

  const isDark = theme === 'dark';

  if (isRestarting) {
    return (
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
        <div 
          className="rounded-xl md:rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 text-center shadow-2xl border"
          style={{
            backgroundColor: isDark ? '#000000' : '#ffffff',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#e5e7eb'
          }}
        >
          <Loader text="Creating new game..." size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div 
        className="rounded-xl md:rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 text-center shadow-2xl border"
        style={{
          backgroundColor: isDark ? '#000000' : '#ffffff',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#e5e7eb'
        }}
      >
        <h2 
          className="text-xl md:text-2xl font-bold mb-3 md:mb-4"
          style={{ color: isDark ? '#ffffff' : '#111827' }}
        >
          {game.won ? 'Congratulations!' : 'Game Over'}
        </h2>
        
        <p 
          className="text-base md:text-lg mb-4 md:mb-6"
          style={{ color: isDark ? '#ffffff' : '#374151' }}
        >
          {game.won 
            ? 'You guessed the word correctly!' 
            : 'You could not guess the word.'
          }
        </p>
        
        {game.won && (
          <div 
            className="p-3 md:p-4 mb-4 md:mb-6"
          >
            <p 
              className="text-xl md:text-4xl font-bold"
              style={{ color: isDark ? '#ffffff' : '#1f2937' }}
            >
              {game.word}
            </p>
          </div>
        )}
        
        <button
          ref={buttonRef}
          onClick={handlePlayAgain}
          disabled={isRestarting}
          className="px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm md:text-base focus:outline-none focus:ring-2"
          style={{
            backgroundColor: isDark ? '#f3f4f6' : '#3b82f6',
            color: isDark ? '#1f2937' : '#ffffff',
            borderColor: isDark ? 'transparent' : 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? '#e5e7eb' : '#2563eb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isDark ? '#f3f4f6' : '#3b82f6';
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  );
} 