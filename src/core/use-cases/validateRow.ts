import { NoCurrentRowDefined } from "../errors/NoCurrentRowDefined";
import { Game } from "../Game";
import { LetterState } from "../LetterState";
import { isRowCompleted } from "./isRowCompleted";

export function validateRow(game: Game): Game {
  if (!game.currentRow) throw new NoCurrentRowDefined();
  
  const { word } = game;
  if (isRowCompleted(game.currentRow)){
    const wordLetters: (string | null)[] = word.split("");
    game.currentRow.letters.forEach((letter, index) => {
      if (letter.value === wordLetters[index]) return letter.state = LetterState.Correct;
      if (wordLetters.includes(letter.value)) return letter.state = LetterState.WrongPosition;
      return letter.state = LetterState.Incorrect;
    });
    game.currentRow.validated = true;
  }

  return {...game};
}
