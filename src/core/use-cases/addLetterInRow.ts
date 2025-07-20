import { Alphabet } from "../Alphabet";
import { Row } from "../Row";
import { getCurrentLetterIndex } from "./getCurrentLetterIndex";
import { isAlphabet } from "./isAlphabet";



export function addLetterInRow(row: Row, letter: Alphabet): Row {
  if (!isAlphabet(letter)) return row;
  const { letters } = row;
  const currentLetterIndex = getCurrentLetterIndex(row);
  if (currentLetterIndex >= letters.length) return row;
  letters[currentLetterIndex].value = letter;
  row.currentLetter = letters[currentLetterIndex + 1];
  return row;
}
