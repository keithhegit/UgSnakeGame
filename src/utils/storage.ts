import { Difficulty } from '../types/game';

const HIGH_SCORES_KEY = 'snake_high_scores';

export const storage = {
  getHighScores(): Record<Difficulty, number> {
    const scores = localStorage.getItem(HIGH_SCORES_KEY);
    return scores ? JSON.parse(scores) : {};
  },

  setHighScore(difficulty: Difficulty, score: number): void {
    const scores = this.getHighScores();
    if (!scores[difficulty] || score > scores[difficulty]) {
      scores[difficulty] = score;
      localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
    }
  },

  clearHighScores(): void {
    localStorage.removeItem(HIGH_SCORES_KEY);
  }
}; 