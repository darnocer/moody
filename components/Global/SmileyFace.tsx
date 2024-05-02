// components/SmileyFace.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceGrin,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceSadTear,
} from "@fortawesome/free-regular-svg-icons";

interface SmileyFaceProps {
  moodLevel: number;
  size?: "small" | "large";
}

const SmileyFace: React.FC<SmileyFaceProps> = ({
  moodLevel,
  size = "small",
}) => {
  const moodBgColors = [
    "bg-secondary-700",
    "bg-secondary-500",
    "bg-yellow-500",
    "bg-primary-500",
    "bg-primary-700",
  ];

  const moodIcons = [
    faFaceSadTear,
    faFaceFrown,
    faFaceMeh,
    faFaceSmile,
    faFaceGrin,
  ];

  const sizeClasses =
    size === "small" ? "w-10 h-10" : "w-16 h-16 md:w-20 md:h-20";

  return (
    <div
      className={`relative ${sizeClasses} rounded-full ${
        moodBgColors[moodLevel - 1]
      }`}
    >
      <FontAwesomeIcon
        icon={moodIcons[moodLevel - 1]}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          size === "small" ? "w-10 h-10" : "w-16 h-16 md:w-20 md:h-20"
        } text-black`}
      />
    </div>
  );
};

export default SmileyFace;
