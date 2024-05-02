// components/InfluenceSelection.tsx
import React, { useState } from "react";
import { InfluenceProps } from "../../pages/index";

import { IconName } from "@fortawesome/fontawesome-svg-core";

import SelectionButton from "../Global/SelectionButton";

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
    <div className="text-center mb-12">
      <h2 className="text-xl my-6">{props.heading}</h2>
      <div className="grid grid-cols-2 gap-4">
        {props.influences.map((influence) => (
          <SelectionButton
            key={influence.id}
            text={influence.name}
            icon={influence.icon as IconName}
            isSelected={selectedInfluences.some((i) => i.id === influence.id)}
            onClick={() => handleInfluenceToggle(influence)}
          />
        ))}
      </div>
    </div>
  );
};

export default InfluenceSelection;
