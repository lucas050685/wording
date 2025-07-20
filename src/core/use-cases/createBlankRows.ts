import { Row } from "../Row";
import { createBlankLetters } from "./createBlankLetters";

export type CreateBlankRowsOptions = {
  wordSize: number;
  rowsCount: number;
}

export function createBlankRows(options: CreateBlankRowsOptions): Row[] {
  const { wordSize, rowsCount } = options;

  return Array.from({ length: rowsCount }, () => {

    const letters = createBlankLetters({ wordSize });
    return {
      letters,
      currentLetter: letters[0],
      validated: false,
    }
  });
}
