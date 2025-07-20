import { Row } from "../Row";
import { getCurrentLetterIndex } from "./getCurrentLetterIndex";

export function removeLetterInRow(row: Row): Row {
  if (row.validated) return row;
  let currentLetterIndex = getCurrentLetterIndex(row);
  if (!row.letters[currentLetterIndex]) return row;
  if (row.letters[currentLetterIndex].value === null){
    currentLetterIndex = Math.max(currentLetterIndex - 1, 0);
  }
  row.letters[currentLetterIndex].value = null;
  const previousLetterIndex = Math.max(currentLetterIndex - 1, 0);
  row.currentLetter = row.letters[previousLetterIndex];
  return row;
}