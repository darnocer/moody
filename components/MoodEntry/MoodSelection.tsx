// components/MoodSelection.tsx
import React from "react";
import CurrentDateTime from "./CurrentDateTime";

import { MoodProps } from "../../pages/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceGrin,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceSadTear,
} from "@fortawesome/free-regular-svg-icons";

type Props = {
  moods: MoodProps[];
  onMoodSelection: (mood: MoodProps) => void;
  heading: string;
  selectedMood: MoodProps | null;
};

const MoodSelection: React.FC<Props> = (props) => {
  const moodBgColors = [
    "bg-secondary-700",
    "bg-secondary-500",
    "bg-yellow-500",
    "bg-primary-500",
    "bg-primary-700",
  ];

  const moodTextColors = [
    "text-secondary-700",
    "text-secondary-500",
    "text-yellow-500",
    "text-primary-500",
    "text-primary-700",
  ];

  const moodIcons = [
    faFaceSadTear,
    faFaceFrown,
    faFaceMeh,
    faFaceSmile,
    faFaceGrin,
  ];

  return (
    <div className="text-center mb-12">
      <h2 className="text-2xl my-6">{props.heading}</h2>
      <CurrentDateTime />
      <div className="flex justify-between space-x-2 md:space-x-4">
        {props.moods.map((mood, index) => (
          <div key={mood.id} className="flex flex-col items-center p-1">
            <button
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full focus:outline-none shadow-md hover:shadow-xl ${
                moodBgColors[mood.mood_level - 1]
              } ${
                props.selectedMood && props.selectedMood.id !== mood.id
                  ? "opacity-10"
                  : ""
              }`}
              onClick={() => props.onMoodSelection(mood)}
            >
              <FontAwesomeIcon
                icon={moodIcons[mood.mood_level - 1]}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20"
              />
              <span className="sr-only">{mood.name}</span>
            </button>
            <span
              className={`text-xs uppercase mt-2 ${
                props.selectedMood && props.selectedMood.id !== mood.id
                  ? "opacity-10"
                  : ""
              } ${moodTextColors[mood.mood_level - 1]}`}
            >
              {mood.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelection;
