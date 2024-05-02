// EntryItem.tsx
import React from "react";
import { MoodEntry } from "../../types";
import SmileyFace from "../Global/SmileyFace";
import MoodText from "../Global/MoodText";

interface EntryItemProps {
  entry: MoodEntry;
  isLast: boolean;
}

const EntryItem: React.FC<EntryItemProps> = ({ entry, isLast }) => {
  const formatTime = (timestamp: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(timestamp).toLocaleString("en-US", options);
  };

  const moodLevel = entry.mood.mood_level;

  return (
    <div className={isLast ? "" : "mb-2"}>
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <SmileyFace moodLevel={moodLevel} />
          {!isLast && <div className="w-px h-10 bg-gray-300 mt-2"></div>}
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <MoodText
              moodLevel={moodLevel}
              moodName={entry.mood.name}
              className="font-bold"
            />
            <span className="text-gray-500">{formatTime(entry.timestamp)}</span>
          </div>
          <div>
            {entry.influences.length > 0 && (
              <span>
                {entry.influences.map((inf, index) => (
                  <React.Fragment key={inf.influence.id}>
                    {inf.influence.name}
                    {index !== entry.influences.length - 1 && " • "}
                  </React.Fragment>
                ))}
              </span>
            )}
            {entry.influences.length > 0 && entry.feelings.length > 0 && " • "}
            {entry.feelings.length > 0 && (
              <span>
                {entry.feelings.map((feel, index) => (
                  <React.Fragment key={feel.feeling.id}>
                    {feel.feeling.name}
                    {index !== entry.feelings.length - 1 && " • "}
                  </React.Fragment>
                ))}
              </span>
            )}
          </div>
          {entry.journal_entry && (
            <p className="italic mt-1">{entry.journal_entry}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntryItem;
