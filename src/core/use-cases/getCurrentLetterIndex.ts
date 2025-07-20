import { Row } from "../Row";

export function getCurrentLetterIndex(row: Row): number {
  if (!row.currentLetter) return row.letters.length -1;
  for (let i = 0; i < row.letters.length; i++) {
    if (row.letters[i] === row.currentLetter) return i;
  }
  return 0;
}