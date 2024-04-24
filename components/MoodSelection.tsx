// components/MoodSelection.tsx
import React from "react";
import { MoodProps } from "../pages/index";

type Props = {
  moods: MoodProps[];
  onMoodSelection: (mood: MoodProps) => void;
};

const MoodSelection: React.FC<Props> = (props) => {
  return (
    <div>
      <h2>Select Your Mood</h2>
      <ul>
        {props.moods.map((mood) => (
          <li key={mood.id}>
            <button onClick={() => props.onMoodSelection(mood)}>
              {mood.mood_level} - {mood.name}
            </button>
          </li>
        ))}
      </ul>
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
