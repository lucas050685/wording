import { Game } from "../Game";
import { isRowCompleted } from "./isRowCompleted";
import { getRowWord } from "./getRowWord";
import { NoCurrentRowDefined } from "../errors/NoCurrentRowDefined";
import { getNextRow } from "./getNextRow";

export function validateGame(game: Game): Game {
  if (!game.currentRow) throw new NoCurrentRowDefined();

  if (isRowCompleted(game.currentRow)){
    const rowWord = getRowWord(game.currentRow);

    if (game.currentRow.validated) {
      
      if (rowWord === game.word) {
        game.gameOver = true;
        game.won = true;
        return {...game};
      }
      
      game.currentRow = getNextRow(game);
      
      if (!game.currentRow) {
        game.gameOver = true;
        game.won = false;
        return {...game};
      }
    }
    
  }

  return {...game};
}