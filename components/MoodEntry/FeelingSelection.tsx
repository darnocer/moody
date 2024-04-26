// components/FeelingSelection.tsx
import React, { useState, useEffect } from "react";
import { FeelingProps } from "../../pages/index";

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
    const index = selectedFeelings.findIndex((f) => f.id === feeling.id);
    if (index !== -1) {
      setSelectedFeelings(selectedFeelings.filter((f) => f.id !== feeling.id));
    } else {
      setSelectedFeelings([...selectedFeelings, feeling]);
    }
    props.onFeelingSelection(selectedFeelings);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">{props.heading}</h2>
      <div className="grid grid-cols-4 gap-4">
        {feelings.map((feeling) => (
          <button
            key={feeling.id}
            className={`btn ${
              selectedFeelings.some((f) => f.id === feeling.id)
                ? "btn-primary"
                : "btn-neutral"
            }`}
            onClick={() => handleFeelingToggle(feeling)}
          >
            {feeling.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeelingSelection;
