import { Adapters } from "../Adapters";
import { Game } from "../Game";
import { createBlankAttempts } from "./createBlankAttempts";
import { createBlankRows } from "./createBlankRows";

export type GameOptions = {
  wordSize?: number;
  rowsCount?: number;
  currentScore?: number;
}

export async function createNewGame(adapters: Adapters, options?: GameOptions): Promise<Game> {
  const { wordRepository } = adapters;
  const { wordSize = 5, rowsCount = 6, currentScore = 0 } = options || {};
  const word = await wordRepository.getWord(wordSize);

  const rows = createBlankRows({ wordSize, rowsCount });

  return {
    word,
    wordSize: wordSize,
    rowsCount: rowsCount,
    rows,
    currentRow: rows[0],
    attempts: createBlankAttempts(),
    score: currentScore,
    gameOver: false,
    won: false,
  };
}
