export class GameNotDefined extends Error {
  constructor() {
    super("Game not defined");
    this.name = "GameNotDefined";
  }
}