import { KeyLetter } from "./KeyLetter";
import { Alphabet } from "@/core/Alphabet";

export type KeyboardRowProps = {
  letters: Alphabet[];
  disabled?: boolean;
}

export function KeyboardRow({ letters, disabled = false }: KeyboardRowProps) {
  return <div className="flex gap-1.5 md:gap-2 justify-center">
    {letters.map((letter) => (
      <KeyLetter key={letter} letter={letter} disabled={disabled} />
    ))}
  </div>;
}