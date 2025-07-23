import { Alphabet } from "@/core/Alphabet";
import { KeyboardRow } from "./KeyboardRow";
import { EnterKey } from "./EnterKey";
import { BackspaceKey } from "./BackspaceKey";

const keyboardRows: Alphabet[][] = [
  [Alphabet.Q, Alphabet.W, Alphabet.E, Alphabet.R, Alphabet.T, Alphabet.Y, Alphabet.U, Alphabet.I, Alphabet.O, Alphabet.P],
  [Alphabet.A, Alphabet.S, Alphabet.D, Alphabet.F, Alphabet.G, Alphabet.H, Alphabet.J, Alphabet.K, Alphabet.L],
  [Alphabet.Z, Alphabet.X, Alphabet.C, Alphabet.V, Alphabet.B, Alphabet.N, Alphabet.M],
]

interface KeyboardProps {
  disabled?: boolean;
}

export function Keyboard({ disabled = false }: KeyboardProps) {
  return <div className="flex flex-col gap-1.5 md:gap-2 items-center mt-4 md:mt-8 p-3 md:p-6 rounded-xl md:rounded-2xl">
    {keyboardRows.map((row, index) => (
      <div key={index} className="flex gap-1.5 md:gap-2 justify-center items-center">
        <KeyboardRow letters={row} disabled={disabled} />
        {index === 1 && <BackspaceKey disabled={disabled} />}
        {index === 2 && <EnterKey disabled={disabled} />}
      </div>
    ))}
  </div>;
}
