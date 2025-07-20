import { Alphabet } from "../Alphabet";
import { Attempts } from "../Attempts";
import { LetterState } from "../LetterState";

export function createBlankAttempts(): Attempts {
  const values = Object.values(Alphabet);
  return values.reduce((acc, value) => {
    acc[value] = {
      value,
      state: LetterState.Empty,
    };
    return acc;
  }, {} as Attempts);
}
