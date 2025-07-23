'use client';

import cn from 'classnames';
import { useGame } from './GameContext';
import { useCallback } from 'react';
import { CornerDownLeft } from 'lucide-react';

interface EnterKeyProps {
  disabled?: boolean;
}

export function EnterKey({ disabled = false }: EnterKeyProps) {
  const { game, validateRow, isLoading } = useGame();

  const handleClick = useCallback(() => {
    if (isLoading || disabled || !game?.currentRow) return;
    validateRow();
  }, [game, validateRow, isLoading, disabled]);

  const className = cn(
    'border-none flex items-center justify-center font-bold text-sm transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300',
    'cursor-pointer select-none',
    'w-12 h-12 rounded-lg md:w-16 md:h-16 md:rounded-xl',
    'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200',
    (isLoading || disabled) && 'opacity-50 cursor-not-allowed hover:scale-100',
  );

  return (
    <button
      type="button"
      className={className}
      aria-label="Enter"
      tabIndex={0}
      onClick={handleClick}
      disabled={isLoading || disabled}
    >
      <CornerDownLeft className="w-4 h-4 md:w-5 md:h-5" />
    </button>
  );
} 