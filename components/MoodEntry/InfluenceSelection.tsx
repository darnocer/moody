// components/InfluenceSelection.tsx
import React, { useState } from "react";
import { InfluenceProps } from "../../pages/index";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library, IconName } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

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
          <button
            key={influence.id}
            className={`btn btn-outline btn-primary flex items-center space-x-2 text-neutral-900 hover:text-white ${
              selectedInfluences.some((i) => i.id === influence.id)
                ? "bg-primary-500 text-white"
                : ""
            }`}
            onClick={() => handleInfluenceToggle(influence)}
          >
            <FontAwesomeIcon
              icon={["fas", influence.icon as IconName]}
              className={`w-5 h-5 ${
                selectedInfluences.some((i) => i.id === influence.id)
                  ? "text-white"
                  : "text-neutral-900"
              }`}
            />
            <span
              className={`whitespace-nowrap ${
                selectedInfluences.some((i) => i.id === influence.id)
                  ? "text-white"
                  : "text-neutral-900"
              }`}
            >
              {influence.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InfluenceSelection;
