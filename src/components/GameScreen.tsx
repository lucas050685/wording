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
export function GameScreen() {
  const { game, removeLetter, addLetter, isLoading, toastMessage, showToast, hideToast } = useGame();
  
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      // Don't process keyboard input when game is over
      if (game?.gameOver) return;
      
      if (event.key === 'Backspace') return removeLetter();
      const letter = event.key.toUpperCase() as Alphabet;
      await addLetter(letter);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [addLetter, removeLetter, game]);

  if (!game) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 relative" style={{ background: 'var(--background)' }}>
      <Board game={game} />
      <Keyboard disabled={game.gameOver} />
      <GameResult />
      
      {/* Restart button in bottom right corner */}
      <RestartButton />
      
      {/* Toast for error messages */}
      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={hideToast} 
      />
      
      {/* Discrete validation loader in top center */}
      {isLoading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <Loader size="sm" />
        </div>
      )}
    </div>
  );
}
