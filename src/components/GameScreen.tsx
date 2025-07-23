'use client';

import { useEffect } from "react";
import { Board } from "./Board";
import { useGame } from "./GameContext";
import { GameResult } from "./GameResult";
import { Loader } from "./Loader";
import { Toast } from "./Toast";
import { RestartButton } from "./RestartButton";

import { Alphabet } from "@/core/Alphabet";
import { Keyboard } from "./Keyboard";
import { ThemeToggle } from "./ThemeToggle";
export function GameScreen() {
  const { game, removeLetter, validateRow, addLetter, isLoading, toastMessage, showToast, hideToast } = useGame();
  
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      // Don't process keyboard input when game is over
      if (game?.gameOver) return;
      
      if (event.key === 'Backspace') return removeLetter();
      if (event.key === 'Escape') return console.log(game?.word ?? 'No word');
      if (event.key === 'Enter') return await validateRow();
      const letter = event.key.toUpperCase() as Alphabet;
      await addLetter(letter);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [addLetter, removeLetter, game, validateRow]);

  if (!game) return null;

  return (
    <div className="flex flex-col items-center h-dvh mx-auto relative p-4" style={{ background: 'var(--background)' }}>
      <div className="flex justify-end w-full">
        <ThemeToggle />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <Board game={game} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Keyboard disabled={game.gameOver} />
      </div>
      <div className="flex justify-end w-full">
        <RestartButton />
      </div>
      
      <GameResult />
      
      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={hideToast} 
      />
      
      {isLoading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <Loader size="sm" />
        </div>
      )}
    </div>
  );
}
