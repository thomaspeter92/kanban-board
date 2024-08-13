import React, { useCallback, useState } from 'react'
import { Checkbox, CheckboxProps, Field, Label } from "@headlessui/react"

type Props = {
  task: string,
  checked: boolean,
  onChange: (checked: boolean) => void
}

const TaskCheckbox = ({task, checked, onChange}: Props & CheckboxProps) => {

  const handleChecked = () => {
    onChange(!checked)
  }

  return (
    <Field onClick={handleChecked} className="bg-gray-medium dark:bg-black-medium cursor-pointer flex items-center rounded px-4 py-3 gap-3 hover:bg-purple-dark/25">
    <Checkbox
    checked={checked}
    onChange={handleChecked}
    className="group block size-5 rounded border border-gray-dark/50 bg-white dark:bg-black-light data-[checked]:bg-purple-dark data-[checked]:border-purple-dark p-0.5"
    >
        <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Checkbox>
      <Label className={`text-bodyM text-black-dark dark:text-white select-none ${checked ? 'line-through text-gray-darkest' : ''}`}>
        {task}
      </Label>
      </Field>
  )
}

export default TaskCheckbox