import { WordValidationRepository } from "@/core/interfaces/WordValidationRepository";
import { words } from "./words";

export class MemoryWordValidationRepository implements WordValidationRepository {
  async validateWord(word: string): Promise<boolean> {
    return words.includes(word.toLowerCase());
  }
}