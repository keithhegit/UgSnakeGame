export interface LeaderboardEntry {
  id: number;
  player_name: string;
  score: number;
  achieved_at: string;
}

export interface LeaderboardState {
  entries: LeaderboardEntry[];
  isLoading: boolean;
  error: string | null;
} 