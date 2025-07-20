import { Game } from "../Game";

export function getCurrentRowIndex(game: Game): number {
  return game.rows.findIndex((row) => row === game.currentRow);
}