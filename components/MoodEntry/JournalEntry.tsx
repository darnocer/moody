// components/JournalEntry.tsx
import React from "react";
import { MoodProps } from "../../pages/index";

type Props = {
  selectedMood: MoodProps;
  onJournalEntryChange: (entry: string) => void;
};

const JournalEntry: React.FC<Props> = (props) => {
  return (
    <div>
      <h2>Journal Entry</h2>
      <textarea
        onChange={(e) => props.onJournalEntryChange(e.target.value)}
        rows={4}
        cols={50}
      />
    </div>
  );
};

export default JournalEntry;
