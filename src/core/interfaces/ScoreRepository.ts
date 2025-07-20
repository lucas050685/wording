export interface ScoreRepository {
  getScore(gameId: string): Promise<number>;
  setScore(gameId: string, score: number): Promise<void>;
}
