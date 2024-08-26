"use client";

import React, { useMemo } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { Icons } from "./Icons";

type Props = {
  options: { label: string; value: string | number }[];
  value: string | number;
  onChange: (value: string) => void; // Controlled by react-hook-form | HeadlessUI always returns string here
};

const Dropdown = ({ options, value, onChange }: Props) => {
  const DownIcon = Icons["chevronDown"];
  const currentValue = useMemo(
    () => options.find((x) => x.value === value),
    [value, options],
  );
  console.log(currentValue);
  return (
    <div className="relative">
      <Listbox value={value} onChange={onChange}>
        <ListboxButton className="dark:text-white focus:border-purple-dark  w-full bg-transparent text-black-light appearance-none outline-none active:border-purple-dark border-gray-dark/25 rounded px-3 pr-10 py-3 data-[hover]:border-purple-dark border text-left">
          {currentValue?.label}
        </ListboxButton>
        <ListboxOptions className="absolute overflow-hidden  top-full dark:bg-black-medium bg-gray-light text-gray-dark  w-full mt-2  rounded-lg">
          {options.map((d, i) => (
            <ListboxOption
              key={d.value}
              className="cursor-pointer p-3 hover:bg-gray-medium"
              value={d.value}
            >
              {d.label}
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
