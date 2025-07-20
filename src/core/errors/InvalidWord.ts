export class InvalidWord extends Error {
  constructor(word: string) {
    super(`The word '${word}' is invalid`);
    this.name = "InvalidWord";
  }
}
