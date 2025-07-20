'use client';

import { useGame } from "./GameContext";
import { Loader } from "./Loader";
import { useTheme } from "./ThemeProvider";

export function InitialScreen() {
  const { game, newGame, isLoading } = useGame();
  const { theme } = useTheme();
  
  if (game) return null;

  const isDark = theme === 'dark';

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen" style={{ background: 'var(--background)' }}>
      <Loader text="Creating new game..." size="lg" />
    </div>
  );

  return <div className="flex items-center justify-center h-screen" style={{ background: 'var(--background)' }}>
    <button
      onClick={newGame}
      disabled={isLoading}
      aria-label="Start a new game"
      className="px-8 py-4 text-lg font-bold rounded-xl shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed border-none"
      style={{
        backgroundColor: isDark ? '#f3f4f6' : '#3b82f6',
        color: isDark ? '#1f2937' : '#ffffff',
        borderColor: 'transparent'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = isDark ? '#e5e7eb' : '#2563eb';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isDark ? '#f3f4f6' : '#3b82f6';
      }}
    >
      {isLoading ? 'Loading...' : 'New Game'}
    </button>
  </div>;
}