import { Attempts } from "./Attempts";
import { Row } from "./Row";

export type Game = {
  word: string;
  wordSize: number;
  rowsCount: number;
  rows: Row[];
  currentRow: Row | undefined;
  attempts: Attempts;
  score: number;
  gameOver: boolean;
  won: boolean;
}
