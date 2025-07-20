import { Row } from "../Row";

export function getRowWord(row: Row): string {
  const letters = row.letters.map((letter) => letter.value);
  if (letters.includes(null)) return "";
  return letters.join("");
}
