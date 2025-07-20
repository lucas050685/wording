import { Adapters } from "../Adapters";
import { Alphabet } from "../Alphabet";
import { NoCurrentRowDefined } from "../errors/NoCurrentRowDefined";
import { Game } from "../Game";
import { addLetterInRow } from "./addLetterInRow";
import { validateGame } from "./validateGame";

export type AddLetterOptions = {
  game: Game;
  letter: Alphabet;
}

export async function addLetter(adapters: Adapters, options: AddLetterOptions): Promise<Game> {
  const { game, letter } = options;
  if (!game.currentRow) throw new NoCurrentRowDefined();
  addLetterInRow(game.currentRow, letter.toUpperCase() as Alphabet);
  return await validateGame(game, adapters);
}
