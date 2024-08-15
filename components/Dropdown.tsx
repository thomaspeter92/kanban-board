"use client";

import React from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Icons } from "./Icons";

type Props = {
  options: string[];
  value: string;
  onChange: (value: string) => void; // Controlled by react-hook-form
};

const Dropdown = ({ options, value, onChange }: Props) => {
  const DownIcon = Icons["chevronDown"];

  return (
    <div className="relative">
      <Listbox value={value} onChange={onChange}>
        <ListboxButton className="dark:text-white focus:border-purple-dark  w-full bg-transparent text-black-light appearance-none outline-none active:border-purple-dark border-gray-dark/25 rounded px-3 pr-10 py-3 data-[hover]:border-purple-dark border text-left">
          {value}
        </ListboxButton>
        <ListboxOptions className="absolute top-full dark:bg-black-medium bg-gray-light text-gray-dark space-y-2 w-full mt-2 p-3 rounded-lg">
          {options.map((d: string, i: number) => (
            <ListboxOption key={d + i} className="cursor-pointer" value={d}>
              {d}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
      <DownIcon
        className="absolute top-1/2 right-2 -translate-y-1/2 text-purple-dark"
        size={20}
      />
    </div>
  );
};

export default Dropdown;
