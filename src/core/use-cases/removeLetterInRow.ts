import { Row } from "../Row";
import { getCurrentLetterIndex } from "./getCurrentLetterIndex";

export function removeLetterInRow(row: Row): Row {
  if (row.validated) return row;
  const currentLetterIndex = getCurrentLetterIndex(row);
  if (!row.letters[currentLetterIndex]) return row;

  if (currentLetterIndex >= row.letters.length - 1 && row.letters[currentLetterIndex].value !== null) {
    row.letters[currentLetterIndex].value = null;
    return row;
  }
  
  row.letters[currentLetterIndex].value = null;
  const previousLetterIndex = Math.max(currentLetterIndex - 1, 0);
  row.currentLetter = row.letters[previousLetterIndex];
  row.currentLetter.value = null;
  return row;
}