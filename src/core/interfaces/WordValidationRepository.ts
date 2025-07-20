export interface WordValidationRepository {
  validateWord(word: string): Promise<boolean>;
}
