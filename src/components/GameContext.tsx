'use client';

import { createContext, useContext, useState } from "react";
import { Game } from "@/core/Game";
import { addLetter } from "@/core/use-cases/addLetter";
import { removeLetter } from "@/core/use-cases/removeLetter";
import { createNewGame } from "@/core/use-cases/createNewGame";
import { Alphabet } from "@/core/Alphabet";
import { Adapters } from "@/core/Adapters";
import { GameNotDefined } from "@/core/errors/GameNotDefined";
import { MemoryScoreRepository } from "@/adapters/memory/MemoryScoreRepository";
import { HttpWordValidationRepository } from "@/adapters/http/HttpWordValidationRepository";
import { HttpWordRepository } from "@/adapters/http/HttpWordRepository";
import { getCurrentRowIndex } from "@/core/use-cases/getCurrentRowIdenx";
import { getCurrentLetterIndex } from "@/core/use-cases/getCurrentLetterIndex";
import { InvalidWord } from "@/core/errors/InvalidWord";
import { validateGame } from "@/core/use-cases/validateGame";

export type GameContext = {
  game: Game | undefined;
  addLetter:(letter: Alphabet) => Promise<void>;
  removeLetter: () => Promise<void>;
  newGame: () => Promise<void>;
  validateRow: () => Promise<void>;
  isLoading: boolean;
  getCurrentPosition: () => [number, number];
  toastMessage: string;
  showToast: boolean;
  hideToast: () => void;
  invalidRow: number | null;
}

const defaultContext: GameContext = {
  game: undefined,
  addLetter: async () => {},
  removeLetter: async () => {},
  newGame: async () => {},
  validateRow: async () => {},
  isLoading: false,
  getCurrentPosition: () => [0, 0],
  toastMessage: '',
  showToast: false,
  hideToast: () => {},
  invalidRow: null,
}

export const GameContext = createContext<GameContext>(defaultContext);

const adapters: Adapters = {
  scoreRepository: new MemoryScoreRepository(),
  wordRepository: new HttpWordRepository(),
  wordValidationRepository: new HttpWordValidationRepository(),
};

export function GameProvider(props: { children: React.ReactNode }) {
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [invalidRow, setInvalidRow] = useState<number | null>(null);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const hideToast = () => {
    setShowToast(false);
  };

  const context: GameContext = {
    game,

    addLetter: async (letter: Alphabet) => {
      if (isLoading) return;
      if (!game) throw new GameNotDefined();
      // Don't allow adding letters when game is over
      if (game.gameOver) return;
      setIsLoading(true);
      try {
        const newGame = await addLetter(adapters, { game, letter });
        setGame(newGame);
      } catch (error) {
        if (error instanceof InvalidWord) {
          showToastMessage(error.message);
          // Set the current row as invalid
          const currentRowIndex = game.rows.findIndex(row => row === game.currentRow);
          setInvalidRow(currentRowIndex);
        } else {
          showToastMessage('An error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    },

    removeLetter: async () => {
      if (isLoading) return;
      if (!game) throw new GameNotDefined();
      // Don't allow removing letters when game is over
      if (game.gameOver) return;
      setIsLoading(true);
      const newGame = await removeLetter(game);
      setGame(newGame);
      // Clear invalid row state when removing letters
      setInvalidRow(null);
      // Close toast when removing letters
      hideToast();
      setIsLoading(false);
    },

    newGame: async () => {
      if (isLoading) return;
      setIsLoading(true);
      const newGame = await createNewGame(adapters);
      setGame(newGame);
      setIsLoading(false);
    },

    validateRow: async () => {
      if (isLoading) return;
      if (!game) throw new GameNotDefined();
      setIsLoading(true);
      try {
        const newGame = await validateGame(game, adapters);
        setGame(newGame);
      } catch (error) {
        if (error instanceof InvalidWord) {
          showToastMessage(error.message);
        } else {
          showToastMessage('An error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    },

    getCurrentPosition: (): [number, number] => {
      if (!game) return [0, 0];
      if (!game.currentRow) return [0, 0];
      const rowIndex = getCurrentRowIndex(game);
      return [getCurrentLetterIndex(game.currentRow), rowIndex];
    },

    isLoading,
    toastMessage,
    showToast,
    hideToast,
    invalidRow,
  }

  return <GameContext.Provider value={context}>{props.children}</GameContext.Provider>;
}

export function useGame(){
  return useContext(GameContext);
}
