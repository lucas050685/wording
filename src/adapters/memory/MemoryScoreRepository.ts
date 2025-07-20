import { ScoreRepository } from "@/core/interfaces/ScoreRepository";

export class MemoryScoreRepository implements ScoreRepository {
  private score: number = 0;

  async getScore(): Promise<number> {
    return this.score;
  }

  async setScore(gameId: string,score: number): Promise<void> {
    this.score = score;
  }
}
