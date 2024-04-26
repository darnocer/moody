import { useEffect, useState } from "react";

import Layout from "../components/Layout";

function MoodEntriesList() {
  const [moodEntries, setMoodEntries] = useState([]);

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
      <ul>
        {moodEntries.map((entry) => (
          <li key={entry.id}>
            <p>Timestamp: {new Date(entry.timestamp).toLocaleString()}</p>
            <p>Mood: {entry.mood.name}</p>
            <p>
              Influences:{" "}
              {entry.influences.map((inf) => inf.influence.name).join(", ")}
            </p>
            <p>
              Feelings:{" "}
              {entry.feelings.map((feel) => feel.feeling.name).join(", ")}
            </p>
            {entry.journal_entry && <p>Journal Entry: {entry.journal_entry}</p>}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export default MoodEntriesList;
