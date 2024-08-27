import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";
import { Icons } from "./Icons";

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
        <PopoverButton className="text-gray-medium hover:text-gray-dark transition-all">
          <ButtonIcon />
        </PopoverButton>
        <PopoverPanel
          transition
          anchor="bottom"
          className="bg-gray-light dark:bg-black-medium p-5 rounded-lg shadow-1"
        >
          {items.map((d, i) => (
            <div></div>
          ))}
        </PopoverPanel>
      </Popover>
    </div>
  );
};

export default PopoverMenu;
