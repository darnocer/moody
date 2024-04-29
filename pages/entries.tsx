import { useEffect, useState } from "react";
import Layout from "../components/Layout";

interface Mood {
  id: string;
  name: string;
}

interface Influence {
  id: string;
  name: string;
}

interface Feeling {
  id: string;
  name: string;
}

interface MoodEntry {
  id: string;
  timestamp: string;
  mood: Mood;
  influences: { influence: Influence }[];
  feelings: { feeling: Feeling }[];
  journal_entry: string | null;
}

function MoodEntriesList() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    const fetchMoodEntries = async () => {
      const response = await fetch("/api/mood-entries/entries");
      const data = await response.json();
      setMoodEntries(data);
    };
    fetchMoodEntries();
  }, []);

  return (
    <Layout>
      <h1 className="text-h1">Mood Entries</h1>
      <div className="space-y-4">
        {moodEntries.map((entry, index) => (
          <div key={entry.id} className="collapse collapse-arrow bg-base-100">
            <input type="radio" name="mood-entry-accordion" />
            <div className="collapse-title text-xl font-medium">
              {new Date(entry.timestamp).toLocaleString()}
            </div>
            <div className="collapse-content">
              <p>Mood: {entry.mood.name}</p>
              <p>
                Influences:{" "}
                {entry.influences.map((inf) => inf.influence.name).join(", ")}
              </p>
              <p>
                Feelings:{" "}
                {entry.feelings.map((feel) => feel.feeling.name).join(", ")}
              </p>
              {entry.journal_entry && (
                <p>Journal Entry: {entry.journal_entry}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default MoodEntriesList;
