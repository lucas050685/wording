import { WordRepository } from "@/core/interfaces/WordRepository";
import { words } from "./words";

export class MemoryWordRepository implements WordRepository {
  async getWord(): Promise<string> {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
  }
}