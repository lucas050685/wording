import { WordRepository } from "@/core/interfaces/WordRepository";

export class ApiWordRepository implements WordRepository {
  async getWord(wordSize: number): Promise<string> {
    const response = await fetch(`/api/words?size=${wordSize}`);
    const data = await response.json();
    return data.word;
  }
}