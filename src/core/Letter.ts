import { Alphabet } from "./Alphabet";
import { LetterState } from "./LetterState";

export type Letter = {
  value: Alphabet | null;
  state: LetterState;
}