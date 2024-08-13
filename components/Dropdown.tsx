'use client'

import React from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { Icons } from "./Icons"
import { ChevronDown, List } from "lucide-react"

type Props = {
  options: string[],
  selected: string,
  onChange: (value: string) => void
}

const Dropdown = ({options, selected, onChange}: Props & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  const DownIcon = Icons['chevronDown']

  const handleChange = (value: string) => {
    onChange(value)
  }

  return (
    <div className="relative">
    <Listbox
      value={selected}
      onChange={handleChange}
      >
      <ListboxButton className="dark:text-white focus:border-purple-dark  w-full bg-transparent text-black-light appearance-none outline-none active:border-purple-dark border-gray-dark/25 rounded px-3 pr-10 py-2 data-[hover]:border-purple-dark border"
      >
      {selected}
      </ListboxButton>

      <ListboxOptions className="absolute top-full dark:bg-black-medium bg-gray-medium text-gray-dark space-y-2 w-full mt-2 p-3 rounded-lg">

      {options.map((d, i) => (
        <ListboxOption className="cursor-pointer" value={d}>{d}</ListboxOption>
      ))}
      </ListboxOptions>
      
    </Listbox>
    <DownIcon className="absolute top-1/2 right-2 -translate-y-1/2 text-purple-dark" size={20} />
      </div>
  )
}

export default Dropdown