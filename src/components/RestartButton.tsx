'use client';

import { useGame } from "./GameContext";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import cn from "classnames";
import { useTheme } from "./ThemeProvider";

export function RestartButton() {
  const { newGame, isLoading } = useGame();
  const { theme } = useTheme();
  const [isRestarting, setIsRestarting] = useState(false);

  const isDark = theme === 'dark';

  const handleRestart = async () => {
    if (isLoading || isRestarting) return;
    setIsRestarting(true);
    await newGame();
    setIsRestarting(false);
  };

  const className = cn(
    'fixed bottom-4 right-4 z-40',
    'rounded-full p-3 md:p-4',
    'transition-all duration-200',
    'shadow-lg hover:shadow-xl',
    'focus:outline-none focus:ring-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    // Responsive sizing
    'w-12 h-12 md:w-14 md:h-14',
    // Centering
    'flex items-center justify-center'
  );

  return (
    <button
      onClick={handleRestart}
      disabled={isLoading || isRestarting}
      className={className}
      aria-label="Restart game"
      title="Restart game"
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
      <RefreshCw 
        className={cn(
          "w-5 h-5 md:w-6 md:h-6",
          isRestarting && "animate-spin"
        )} 
      />
    </button>
  );
} 