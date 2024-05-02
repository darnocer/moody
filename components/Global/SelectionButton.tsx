// components/SelectionButton.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName, IconProp } from "@fortawesome/fontawesome-svg-core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

type Props = {
  text: string;
  icon?: IconName;
  isSelected: boolean;
  onClick: () => void;
};

const SelectionButton: React.FC<Props> = ({
  text,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <button
      className={`btn btn-outline btn-primary flex items-center space-x-2 text-neutral-900 hover:text-white hover:bg-primary-500 ${
        isSelected ? "bg-primary-500 text-white" : ""
      }`}
      onClick={onClick}
    >
      {icon && (
        <FontAwesomeIcon
          icon={["fas", icon] as IconProp}
          className={`w-5 h-5 ${
            isSelected ? "text-white" : "text-neutral-900"
          }`}
        />
      )}
      <span
        className={`whitespace-nowrap ${
          isSelected ? "text-white" : "text-neutral-900"
        }`}
      >
        {text}
      </span>
    </button>
  );
};

export default SelectionButton;
