'use client';

import cn from 'classnames';
import { Letter } from "@/core/Letter";
import { useGame } from "./GameContext";
import { LetterState } from '@/core/LetterState';

export type LetterBoxProps = {
  letter: Letter;
  index: number;
  rowIndex: number;
}

export function LetterBox({ letter, index, rowIndex }: LetterBoxProps) {
  const { getCurrentPosition, invalidRow } = useGame();
  const [x, y] = getCurrentPosition();

  const isCurrent = rowIndex === y && index === x;
  const isInvalidRow = invalidRow === rowIndex;

  let ariaLabel: string = (letter.value ?? '').toString();
  if (letter.state === LetterState.Correct) {
    ariaLabel += ' correct';
  } else if (letter.state === LetterState.WrongPosition) {
    ariaLabel += ' wrong position';
  } else if (letter.state === LetterState.Incorrect) {
    ariaLabel += ' incorrect';
  }

  const className = cn(
    'border flex items-center justify-center transition-colors duration-200',
    // Responsive sizing and border radius
    'w-12 h-12 text-lg font-bold rounded-lg',
    // Default border - theme-aware
    'border-gray-300 dark:border-gray-600',
    // Invalid row styling - only border color and thickness
    isInvalidRow && 'border-2 border-orange-300 dark:border-orange-500',
    // Current position outline
    isCurrent && !isInvalidRow && 'outline outline-2 outline-blue-500 dark:outline-blue-400',
    // Letter state colors
    letter.state === LetterState.Correct && 'bg-green-500 text-white border-green-500',
    letter.state === LetterState.Incorrect && 'bg-gray-500 text-white border-gray-500',
    letter.state === LetterState.WrongPosition && 'bg-amber-500 text-white border-amber-500',
  );

  return <div className={className} aria-label={ariaLabel}>
    {letter.value ?? ''}
  </div>
}