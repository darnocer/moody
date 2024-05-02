// components/Global/MoodText.tsx
import React from "react";

interface MoodTextProps {
  moodLevel: number;
  moodName: string;
  className?: string;
}

const MoodText: React.FC<MoodTextProps> = ({
  moodLevel,
  moodName,
  className = "",
}) => {
  const moodTextColors = [
    "text-secondary-700",
    "text-secondary-500",
    "text-yellow-500",
    "text-primary-500",
    "text-primary-700",
  ];

  return (
    <span className={`${moodTextColors[moodLevel - 1]} ${className}`}>
      {moodName}
    </span>
  );
};

export default MoodText;
