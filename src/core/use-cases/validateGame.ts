import { Adapters } from "../Adapters";
import { Game } from "../Game";
import { isRowCompleted } from "./isRowCompleted";
import { updateAttempts } from "./updateAttempts";
import { validateRow } from "./validateRow";
import { getRowWord } from "./getRowWord";
import { InvalidWord } from "../errors/InvalidWord";
import { NoCurrentRowDefined } from "../errors/NoCurrentRowDefined";
import { getNextRow } from "./getNextRow";

export async function validateGame(game: Game, adapters: Adapters): Promise<Game> {
  if (!game.currentRow) throw new NoCurrentRowDefined();

  if (isRowCompleted(game.currentRow)){
    const rowWord = getRowWord(game.currentRow);
    const { wordValidationRepository } = adapters;
    const wordValidation = await wordValidationRepository.validateWord(rowWord);
    if (!wordValidation) throw new InvalidWord(rowWord);
    validateRow(game);

    if (game.currentRow.validated) {
      updateAttempts(game);
      
      // Check if the current row contains the secret word (win condition)
      if (rowWord === game.word) {
        game.gameOver = true;
        game.won = true;
        return {...game};
      }
      
      // Move to next row
      game.currentRow = getNextRow(game);
      
      // Check if all rows have been filled (lose condition)
      if (!game.currentRow) {
        game.gameOver = true;
        game.won = false;
        return {...game};
      }
    }
    
  }

  return {...game};
}