import { Row } from "../Row";

export function isRowCompleted(row?: Row): boolean {
  if (!row) return false;
  const totalSlots = row.letters.length;
  const totalFilledSlots = row.letters.filter((letter) => letter.value !== null).length;
  return totalFilledSlots >= totalSlots;
}
