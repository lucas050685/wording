import { WordRepository } from "./interfaces/WordRepository";
import { WordValidationRepository } from "./interfaces/WordValidationRepository";
import { ScoreRepository } from "./interfaces/ScoreRepository";

export type Adapters = {
  wordRepository: WordRepository;
  wordValidationRepository: WordValidationRepository;
  scoreRepository: ScoreRepository;
}