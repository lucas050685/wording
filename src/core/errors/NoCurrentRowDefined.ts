export class NoCurrentRowDefined extends Error {
  constructor() {
    super("No current row defined");
    this.name = "NoCurrentRowDefined";
  }
}