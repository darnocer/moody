// components/InfluenceSelection.tsx
import React, { useState } from "react";
import { InfluenceProps } from "../../pages/index";

type Props = {
  influences: InfluenceProps[];
  onInfluenceSelection: (selectedInfluences: InfluenceProps[]) => void;
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
      <h2>Select Influences</h2>
      <ul>
        {props.influences.map((influence) => (
          <li key={influence.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedInfluences.some((i) => i.id === influence.id)}
                onChange={() => handleInfluenceToggle(influence)}
              />
              {influence.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfluenceSelection;
