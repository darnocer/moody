// pages/index.tsx
import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import MoodSelection from "../components/MoodEntry/MoodSelection";
import JournalEntry from "../components/MoodEntry/JournalEntry";
import InfluenceSelection from "../components/MoodEntry/InfluenceSelection";
import FeelingSelection from "../components/MoodEntry/FeelingSelection";
import prisma from "../lib/prisma";

export type MoodProps = {
  id: string;
  mood_level: number;
  name: string;
};

export type InfluenceProps = {
  id: string;
  name: string;
};

export type FeelingProps = {
  id: string;
  name: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const moods = await prisma.mood.findMany({
    orderBy: {
      mood_level: "asc",
    },
  });

  const influences = await prisma.influence.findMany();

  return {
    props: {
      moods,
      influences,
    },
    revalidate: 10,
  };
};

type Props = {
  moods: MoodProps[];
  influences: InfluenceProps[];
};

const Blog: React.FC<Props> = (props) => {
  const [selectedMood, setSelectedMood] = useState<MoodProps | null>(null);
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedInfluences, setSelectedInfluences] = useState<
    InfluenceProps[]
  >([]);
  const [selectedFeelings, setSelectedFeelings] = useState<FeelingProps[]>([]);

  const handleMoodSelection = (mood: MoodProps) => {
    setSelectedMood(mood);
  };

  const handleInfluenceSelection = (influences: InfluenceProps[]) => {
    setSelectedInfluences(influences);
  };

  const handleFeelingSelection = (feelings: FeelingProps[]) => {
    setSelectedFeelings(feelings);
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;

    try {
      const response = await fetch("/api/mood-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moodId: selectedMood.id,
          journalEntry,
          influenceIds: selectedInfluences.map((influence) => influence.id),
          feelingIds: selectedFeelings.map((feeling) => feeling.id),
        }),
      });
      if (response.ok) {
        console.log("Mood entry created");
        setSelectedMood(null);
        setJournalEntry("");
        setSelectedInfluences([]);
        setSelectedFeelings([]);
      } else {
        console.error("Failed to create mood entry");
      }
    } catch (error) {
      console.error("Error creating mood entry:", error);
    }
  };

  return (
    <Layout>
      <div className="page">
        <h1 className="text-h1 text-primary-500">Select your mood</h1>
        <main>
          <MoodSelection
            moods={props.moods}
            onMoodSelection={handleMoodSelection}
          />
          {selectedMood && (
            <>
              <JournalEntry
                selectedMood={selectedMood}
                onJournalEntryChange={setJournalEntry}
              />
              <InfluenceSelection
                influences={props.influences}
                onInfluenceSelection={handleInfluenceSelection}
              />
              <FeelingSelection
                selectedMoodId={selectedMood.mood_level}
                onFeelingSelection={handleFeelingSelection}
              />
              <button onClick={handleSubmit}>Submit</button>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
