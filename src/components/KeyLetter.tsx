'use client';
import cn from 'classnames';
import { Alphabet } from '@/core/Alphabet';
import { useGame } from './GameContext';
import { LetterState } from '@/core/LetterState';
import { useCallback } from 'react';

export type KeyLetterProps = {
  letter: Alphabet;
  disabled?: boolean;
}

export function KeyLetter(props: KeyLetterProps) {
  const { game, addLetter, isLoading } = useGame();
  const { letter, disabled = false } = props;
  const { attempts } = game || {};

  // Move useCallback above early return
  const handleClick = useCallback(() => {
    if (isLoading || disabled) return;
    addLetter(letter);
  }, [addLetter, letter, isLoading, disabled]);

  if (!attempts) return null;

  const attempt = attempts?.[letter];

  // Accessibility: aria-label for screen readers
  let ariaLabel: string = letter;
  if (attempt?.state === LetterState.Correct) {
    ariaLabel += ' correct';
  } else if (attempt?.state === LetterState.WrongPosition) {
    ariaLabel += ' wrong position';
  } else if (attempt?.state === LetterState.Incorrect) {
    ariaLabel += ' incorrect';
  }

  const className = cn(
    'border-none flex items-center justify-center font-bold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300',
    'cursor-pointer select-none',
    // Responsive sizing and border radius
    'w-7 h-12 text-sm rounded-lg md:w-12 md:h-16 md:text-lg md:rounded-xl',
    // Letter state colors - solid colors matching the board (these should override default)
    attempt?.state === LetterState.Correct && 'bg-green-500 hover:bg-green-600 text-white',
    attempt?.state === LetterState.WrongPosition && 'bg-amber-500 hover:bg-amber-600 text-white',
    attempt?.state === LetterState.Incorrect && 'bg-gray-700 hover:bg-gray-600 text-white',
    // Default state - theme-aware background
    (!attempt || attempt.state === LetterState.Empty) && 'bg-gray-100 hover:bg-gray-300 dark:bg-gray-300 dark:hover:bg-gray-100 text-gray-700 dark:text-gray-700',
    // Disabled state
    (isLoading || disabled) && 'opacity-50 cursor-not-allowed hover:scale-100',
  );

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-pressed={!!attempt && attempt.state === LetterState.Correct}
      tabIndex={0}
      onClick={handleClick}
      disabled={isLoading || disabled}
    >
      {letter}
    </button>
  );
}
