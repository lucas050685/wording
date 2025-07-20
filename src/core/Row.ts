import { Letter } from "./Letter";

export type Row = {
  letters: Letter[];
  currentLetter: Letter | undefined;
  validated: boolean;
}