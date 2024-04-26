// components/FeelingSelection.tsx
import React, { useState, useEffect } from "react";
import { FeelingProps } from "../../pages/index";

type Props = {
  selectedMoodId: number;
  onFeelingSelection: (feelings: FeelingProps[]) => void;
};

const FeelingSelection: React.FC<Props> = ({
  selectedMoodId,
  onFeelingSelection,
}) => {
  const [feelings, setFeelings] = useState<FeelingProps[]>([]);
  const [selectedFeelings, setSelectedFeelings] = useState<FeelingProps[]>([]);

  useEffect(() => {
    const fetchFeelings = async () => {
      try {
        const response = await fetch(
          `/api/mood-entries/feelings?moodId=${selectedMoodId}`
        );
        const data = await response.json();
        setFeelings(data);
      } catch (error) {
        console.error("Error fetching feelings:", error);
      }
    };

    if (selectedMoodId) {
      fetchFeelings();
    }
  }, [selectedMoodId]);

  const handleFeelingToggle = (feeling: FeelingProps) => {
    const index = selectedFeelings.findIndex((f) => f.id === feeling.id);
    if (index !== -1) {
      setSelectedFeelings(selectedFeelings.filter((f) => f.id !== feeling.id));
    } else {
      setSelectedFeelings([...selectedFeelings, feeling]);
    }
    onFeelingSelection(selectedFeelings);
  };

  return (
    <div>
      <h2>Select Feelings</h2>
      <ul>
        {feelings.map((feeling) => (
          <li key={feeling.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedFeelings.some((f) => f.id === feeling.id)}
                onChange={() => handleFeelingToggle(feeling)}
              />
              {feeling.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeelingSelection;
