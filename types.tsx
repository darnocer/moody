// types.tsx
export interface Mood {
  id: string;
  name: string;
  mood_level: number;
}

export interface Influence {
  id: string;
  name: string;
  icon: string;
}

export interface Feeling {
  id: string;
  name: string;
}

export interface MoodEntry {
  id: string;
  timestamp: string;
  mood: Mood;
  influences: { influence: Influence }[];
  feelings: { feeling: Feeling }[];
  journal_entry: string | null;
}

export type MoodProps = {
  id: string;
  mood_level: number;
  name: string;
};

export type InfluenceProps = {
  id: string;
  name: string;
  icon: string;
};

export type FeelingProps = {
  id: string;
  name: string;
};
