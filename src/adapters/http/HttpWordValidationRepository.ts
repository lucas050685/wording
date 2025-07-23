import { WordValidationRepository } from "@/core/interfaces/WordValidationRepository";

export class HttpWordValidationRepository implements WordValidationRepository {
  private readonly baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en';

  async validateWord(word: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${word.toLowerCase()}`);
      return response.status === 200;
    } catch {
      return false;
    }
  }
} 