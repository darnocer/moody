// components/InfluenceSelection.tsx
import React, { useState } from "react";
import { InfluenceProps } from "../../pages/index";

type Props = {
  influences: InfluenceProps[];
  onInfluenceSelection: (selectedInfluences: InfluenceProps[]) => void;
  heading: string;
};

const InfluenceSelection: React.FC<Props> = (props) => {
  const [selectedInfluences, setSelectedInfluences] = useState<
    InfluenceProps[]
  >([]);

  const handleInfluenceToggle = (influence: InfluenceProps) => {
    const index = selectedInfluences.findIndex((i) => i.id === influence.id);
    if (index !== -1) {
      setSelectedInfluences(
        selectedInfluences.filter((i) => i.id !== influence.id)
      );
    } else {
      setSelectedInfluences([...selectedInfluences, influence]);
    }
    props.onInfluenceSelection(selectedInfluences);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">{props.heading}</h2>
      <div className="grid grid-cols-4 gap-4">
        {props.influences.map((influence) => (
          <button
            key={influence.id}
            className={`btn ${
              selectedInfluences.some((i) => i.id === influence.id)
                ? "btn-primary"
                : "btn-neutral"
            }`}
            onClick={() => handleInfluenceToggle(influence)}
          >
            {influence.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InfluenceSelection;
