import { Letter } from "../Letter";
import { LetterState } from "../LetterState";

export type CreateBlankLettersOptions = {
  wordSize: number;
}

export function createBlankLetters(options: CreateBlankLettersOptions): Letter[] {
  const { wordSize } = options;

  return Array.from({ length: wordSize }, () => ({
    value: null,
    state: LetterState.Empty,
  }));
}
