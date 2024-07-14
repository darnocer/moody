// /pages/entries.tsx
import { useEffect, useState } from "react";
import { MoodEntry } from "../types";
import Layout from "../components/Layout/Layout";
import EntryItem from "../components/Entries/EntryItem";

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

  const handleDelete = async (id: string) => {
    await fetch(`/api/mood-entries/${id}`, {
      method: "DELETE",
    });

    // Remove the deleted entry from the state
    setMoodEntries(moodEntries.filter((entry) => entry.id !== id));
  };

  const groupEntriesByMonth = (entries: MoodEntry[]) => {
    const groupedEntries: { [month: string]: { [date: string]: MoodEntry[] } } =
      {};

    entries.forEach((entry) => {
      const date = new Date(entry.timestamp);
      const month = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      const day = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      if (month in groupedEntries) {
        if (day in groupedEntries[month]) {
          groupedEntries[month][day].push(entry);
        } else {
          groupedEntries[month][day] = [entry];
        }
      } else {
        groupedEntries[month] = {
          [day]: [entry],
        };
      }
    });

    return groupedEntries;
  };

  const groupedEntriesByMonth = groupEntriesByMonth(moodEntries);

  return (
    <Layout>
      <div className="space-y-8 mb-16">
        {Object.entries(groupedEntriesByMonth).map(
          ([month, groupedEntriesByDate]) => (
            <div key={month}>
              <h2 className="text-center text-2xl font-bold mb-4">{month}</h2>
              <div className="space-y-4">
                {Object.entries(groupedEntriesByDate).map(([date, entries]) => (
                  <div
                    key={date}
                    className="bg-base-100 p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-medium mb-4">{date}</h3>
                    {entries.map((entry, index) => (
                      <EntryItem
                        key={entry.id}
                        entry={entry}
                        isLast={index === entries.length - 1}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
}

export default MoodEntriesList;
