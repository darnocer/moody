// components/MoodSelection.tsx
import React from "react";
import CurrentDateTime from "../Global/CurrentDateTime";
import SmileyFace from "../Global/SmileyFace";
import MoodText from "../Global/MoodText";

import { MoodProps } from "../../types";

type Props = {
  moods: MoodProps[];
  onMoodSelection: (mood: MoodProps) => void;
  heading: string;
  selectedMood: MoodProps | null;
};

const MoodSelection: React.FC<Props> = (props) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-2xl my-6">{props.heading}</h2>
      <CurrentDateTime />
      <div className="flex justify-between space-x-2 md:space-x-4">
        {props.moods.map((mood, index) => (
          <div key={mood.id} className="flex flex-col items-center p-1">
            <button
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full focus:outline-none shadow-md hover:shadow-xl 
              } ${
                props.selectedMood && props.selectedMood.id !== mood.id
                  ? "opacity-10"
                  : ""
              }`}
              onClick={() => props.onMoodSelection(mood)}
            >
              <SmileyFace moodLevel={mood.mood_level} size="large" />
            </button>

            <MoodText
              moodLevel={mood.mood_level}
              moodName={mood.name}
              className={`text-xs uppercase mt-2 ${
                props.selectedMood && props.selectedMood.id !== mood.id
                  ? "opacity-10"
                  : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelection;
