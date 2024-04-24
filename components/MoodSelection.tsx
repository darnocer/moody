// pages/mood-selection.tsx
import React, { useState } from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";

export type MoodProps = {
  id: string;
  mood_level: number;
  name: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const moods = await prisma.mood.findMany({
    orderBy: {
      mood_level: "asc",
    },
  });

  return {
    props: {
      moods,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

type Props = {
  moods: MoodProps[];
};

const MoodSelection: React.FC<Props> = (props) => {
  const [selectedMood, setSelectedMood] = useState<MoodProps | null>(null);

  const handleMoodSelection = async (mood: MoodProps) => {
    setSelectedMood(mood);

    try {
      const response = await fetch("/api/mood-entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moodId: mood.id }),
      });

      if (response.ok) {
        console.log("Mood entry created");
      } else {
        console.error("Failed to create mood entry");
      }
    } catch (error) {
      console.error("Error creating mood entry:", error);
    }
  };

  return (
    <div>
      <h2>Select Your Mood</h2>
      <ul>
        {props.moods.map((mood) => (
          <li key={mood.id}>
            <button onClick={() => handleMoodSelection(mood)}>
              {mood.mood_level} - {mood.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedMood && <p>Selected Mood: {selectedMood.name}</p>}
      <style jsx>{`
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin-bottom: 0.5rem;
        }
        button {
          padding: 0.5rem 1rem;
          font-size: 1rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default MoodSelection;
