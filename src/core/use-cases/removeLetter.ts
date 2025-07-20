import { Game } from "../Game";
import { NoCurrentRowDefined } from "../errors/NoCurrentRowDefined";
import { removeLetterInRow } from "./removeLetterInRow";

export function removeLetter(game: Game): Game {
  if (!game.currentRow) throw new NoCurrentRowDefined();
  removeLetterInRow(game.currentRow);
  return {...game};
}
