import { Adapters } from "../Adapters";
import { InvalidWord } from "../errors/InvalidWord";
import { NoCurrentRowDefined } from "../errors/NoCurrentRowDefined";
import { Game } from "../Game";
import { LetterState } from "../LetterState";
import { getRowWord } from "./getRowWord";
import { isRowCompleted } from "./isRowCompleted";
import { updateAttempts } from "./updateAttempts";
import { validateGame } from "./validateGame";

export async function validateRow(game: Game, adapters: Adapters): Promise<Game> {
  if (!game.currentRow) throw new NoCurrentRowDefined();

  if (isRowCompleted(game.currentRow)){
    const { word } = game;
    const { wordValidationRepository } = adapters;
    const currentWord = getRowWord(game.currentRow);
    const wordValidation = await wordValidationRepository.validateWord(currentWord);
    if (!wordValidation) throw new InvalidWord(currentWord);

    const wordLetters: (string | null)[] = word.split("");
    game.currentRow.letters.forEach((letter, index) => {
      if (letter.value === wordLetters[index]) return letter.state = LetterState.Correct;
      if (wordLetters.includes(letter.value)) return letter.state = LetterState.WrongPosition;
      return letter.state = LetterState.Incorrect;
    });
    game.currentRow.validated = true;
    updateAttempts(game);
    return validateGame(game);
  }

  return {...game};
}
