export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface DailyEntry {
  id: string;
  date: string; 
  mood: MoodLevel;
  focus: MoodLevel;
  sleepQuality: MoodLevel;
  productivity: MoodLevel;
  notes?: string;
}

export interface WeeklyInsights {
  weekStart: string;
  weekEnd: string;
  avgMood: number;
  avgFocus: number;
  avgSleep: number;
  avgProductivity: number;
  strongestCorrelation: string | null;
  patternSummary: string;
  suggestions: string[];
}
