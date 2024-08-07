// pages/index.tsx
import React, { useState } from "react";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import prisma from "../lib/prisma";

import moodEntries from "../data/moodEntries";

import { MoodProps, InfluenceProps, FeelingProps } from "../types";

import Layout from "../components/Layout/Layout";

import MoodSelection from "../components/NewEntry/MoodSelection";
import JournalEntry from "../components/NewEntry/JournalEntry";
import InfluenceSelection from "../components/NewEntry/InfluenceSelection";
import FeelingSelection from "../components/NewEntry/FeelingSelection";
import { useToast } from "../components/Context/ToastContext";

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

  const { data: session, status } = useSession();
  const { showToast } = useToast();

  const handleMoodSelection = (mood: MoodProps) => {
    if (status !== "authenticated") {
      showToast("Please log in to make an entry.");
      return;
    }
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
      <main className="bg-white md:shadow-xl md:rounded-lg md:p-16 md:bg-neutral-100 mb-16">
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
