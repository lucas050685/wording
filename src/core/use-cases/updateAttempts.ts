import { Game } from "../Game";
import { LetterState } from "../LetterState";
import { isRowCompleted } from "./isRowCompleted";

export function updateAttempts(game: Game): Game {
  if (!game.currentRow) return {...game};
  
  if (isRowCompleted(game.currentRow)) {
    game.currentRow.letters.forEach((letter) => {
      if (letter.value === null) return;
      if (letter.state === LetterState.Empty) return;
      if (game.attempts[letter.value].state === LetterState.Correct) return;
      return game.attempts[letter.value].state = letter.state;
    });
  }
  
  return {...game};
}
