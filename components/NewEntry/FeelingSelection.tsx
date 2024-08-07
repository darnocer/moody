// components/FeelingSelection.tsx
import React, { useState, useEffect } from "react";
import { FeelingProps } from "../../types";
import SelectionButton from "../Global/SelectionButton";

type Props = {
  selectedMoodId: number;
  onFeelingSelection: (feelings: FeelingProps[]) => void;
  heading: string;
};

const FeelingSelection: React.FC<Props> = (props) => {
  const [feelings, setFeelings] = useState<FeelingProps[]>([]);
  const [selectedFeelings, setSelectedFeelings] = useState<FeelingProps[]>([]);

  useEffect(() => {
    const fetchFeelings = async () => {
      try {
        const response = await fetch(
          `/api/mood-entries/feelings?moodId=${props.selectedMoodId}`
        );
        const data = await response.json();
        setFeelings(data);
      } catch (error) {
        console.error("Error fetching feelings:", error);
      }
    };
    if (props.selectedMoodId) {
      fetchFeelings();
    }
  }, [props.selectedMoodId]);

  const handleFeelingToggle = (feeling: FeelingProps) => {
    const newSelectedFeelings = selectedFeelings.find(
      (f) => f.id === feeling.id
    )
      ? selectedFeelings.filter((f) => f.id !== feeling.id)
      : [...selectedFeelings, feeling];

    setSelectedFeelings(newSelectedFeelings);
    props.onFeelingSelection(newSelectedFeelings);
  };

  return (
    <div className="text-center mb-8">
      <h2 className="text-xl my-6">{props.heading}</h2>
      <div className="grid grid-cols-4 gap-4">
        {feelings.map((feeling) => (
          <SelectionButton
            key={feeling.id}
            text={feeling.name}
            isSelected={selectedFeelings.some((f) => f.id === feeling.id)}
            onClick={() => handleFeelingToggle(feeling)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeelingSelection;
