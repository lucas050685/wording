import { Game } from "../Game";
import { Row } from "../Row";

export function getNextRow(game: Game): Row | undefined {
  const currentRowIndex = game.rows.findIndex((row) => row === game.currentRow);
  if (currentRowIndex === -1) return undefined;
  return game.rows[currentRowIndex + 1];
}
