// pages/index.tsx
import React, { useState } from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";

import moodEntries from "../data/moodEntries";

import Layout from "../components/Layout";

import MoodSelection from "../components/MoodEntry/MoodSelection";
import JournalEntry from "../components/MoodEntry/JournalEntry";
import InfluenceSelection from "../components/MoodEntry/InfluenceSelection";
import FeelingSelection from "../components/MoodEntry/FeelingSelection";

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

export const getStaticProps: GetStaticProps = async () => {
  const moods = await prisma.mood.findMany({
    orderBy: { mood_level: "asc" },
  });
  const influences = await prisma.influence.findMany();
  return {
    props: { moods, influences },
    revalidate: 10,
  };
};

type Props = {
  moods: MoodProps[];
  influences: InfluenceProps[];
};

const MoodEntry: React.FC<Props> = (props) => {
  const [selectedMood, setSelectedMood] = useState<MoodProps | null>(null);
  const [journalEntry, setJournalEntry] = useState("");
  const [selectedInfluences, setSelectedInfluences] = useState<
    InfluenceProps[]
  >([]);
  const [selectedFeelings, setSelectedFeelings] = useState<FeelingProps[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/mood-entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } else {
        console.error("Failed to create mood entry");
      }
    } catch (error) {
      console.error("Error creating mood entry:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <Layout>
      <main className="bg-white md:shadow-xl md:rounded-lg md:p-16 md:bg-neutral-100">
        <div>
          <MoodSelection
            moods={props.moods}
            onMoodSelection={handleMoodSelection}
            heading={moodEntries.mood.heading}
            selectedMood={selectedMood}
          />
          {selectedMood && (
            <>
              <InfluenceSelection
                influences={props.influences}
                onInfluenceSelection={handleInfluenceSelection}
                heading={moodEntries.influences.heading}
              />
              <FeelingSelection
                selectedMoodId={selectedMood.mood_level}
                onFeelingSelection={handleFeelingSelection}
                heading={moodEntries.feelings.heading}
              />
              <JournalEntry
                selectedMood={selectedMood}
                onJournalEntryChange={setJournalEntry}
                textBefore={moodEntries.journal.linkTextBefore}
                textAfter={moodEntries.journal.linkTextAfter}
              />
              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className={`btn btn-success ${isSubmitting ? "loading" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? moodEntries.submit.loadingText
                    : moodEntries.submit.button}
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {showSuccessMessage && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <div>
              <span>{moodEntries.submit.successMessage}</span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default MoodEntry;
