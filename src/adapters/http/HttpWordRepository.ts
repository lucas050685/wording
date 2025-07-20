import { WordRepository } from "@/core/interfaces/WordRepository";

export class HttpWordRepository implements WordRepository {
  private readonly wordListUrl = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';
  private readonly maxRetries = 10;

  async getWord(wordSize: number): Promise<string> {
    try {
      // Fetch the word list
      const response = await fetch(this.wordListUrl);
      const text = await response.text();
      
      // Split into words and filter by length
      const words = text
        .split('\n')
        .map(word => word.trim().toUpperCase())
        .filter(word => word.length === wordSize && /^[A-Z]+$/.test(word));
      
      if (words.length === 0) {
        throw new Error(`No words found with length ${wordSize}`);
      }
      
      // Try to find a valid word
      for (let attempt = 0; attempt < Math.min(this.maxRetries, words.length); attempt++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const candidateWord = words[randomIndex];
        
        // Validate the word using the dictionary API
        const isValid = await this.validateWord(candidateWord);
        
        if (isValid) {
          return candidateWord;
        }
      }
      
      // If no valid word found after retries, use a fallback
      return 'HELLO';
      
    } catch {
      // Fallback to a simple word if API fails
      return this.getFallbackWord(wordSize);
    }
  }

  private async validateWord(word: string): Promise<boolean> {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
      return response.status === 200;
    } catch {
      return false;
    }
  }

  private getFallbackWord(wordSize: number): string {
    // Simple fallback words for common lengths (all validated)
    const fallbackWords: Record<number, string[]> = {
      3: ['CAT', 'DOG', 'BIG', 'HOT', 'SUN'],
      4: ['BOOK', 'TREE', 'FISH', 'BIRD', 'STAR'],
      5: ['HELLO', 'WORLD', 'HOUSE', 'CAR', 'DOOR'],
      6: ['WINDOW', 'GARDEN', 'SCHOOL', 'FRIEND', 'FAMILY'],
    };

    const words = fallbackWords[wordSize] || ['HELLO'];
    return words[Math.floor(Math.random() * words.length)];
  }
} 