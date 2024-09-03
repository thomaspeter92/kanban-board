import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { Icons } from "./Icons";
import { describe } from "node:test";

type Props = {
  items: {
    label: string;
    onClick: () => void;
    intent?: "destructive";
  }[];
};

const PopoverMenu = ({ items }: Props) => {
  const ButtonIcon = Icons["elipsisVertical"];
  return (
    <div className="relative">
      <Popover>
        <PopoverButton className="text-gray-dark hover:text-gray-dark transition-all flex items-center">
          <ButtonIcon />
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="bottom end"
          className="bg-gray-light dark:bg-black-medium mr-5 rounded-lg shadow-1 flex flex-col items-start w-[200px]"
        >
          {items.map((d, i) => (
            <button
              onClick={d.onClick}
              key={d.label + i}
              className={`hover:text-purple-dark text-left w-full px-3 py-3 ${d.intent === "destructive" ? "text-red-dark" : "text-gray-dark"}`}
            >
              {d.label}
            </button>
          ))}
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default PopoverMenu;
