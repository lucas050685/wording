export interface WordRepository {
  getWord(wordSize: number): Promise<string>;
}