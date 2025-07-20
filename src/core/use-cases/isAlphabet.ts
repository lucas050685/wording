import { Alphabet } from "../Alphabet";

export function isAlphabet(letter: string): letter is Alphabet {
  return Object.values(Alphabet).includes(letter.toUpperCase() as unknown as Alphabet);
}