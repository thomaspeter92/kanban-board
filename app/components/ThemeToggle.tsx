'use client'

import { Field, Switch } from "@headlessui/react"
import { useState } from "react"


type Props = {}

const ThemeToggle = (props: Props) => {
  const [mode, setMode] = useState<'dark' | 'light'>('dark')

  const handleChange = () => {
    setMode((mode) => mode === 'dark' ? 'light' : 'dark')
    const isDark = document.documentElement.classList.toggle('dark');
  }

  return (
    <Field>
      <Switch
        checked={mode === 'dark'}
        onChange={handleChange}
        className="group inline-flex h-6 w-11 items-center rounded-full bg-purple-dark transition "
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
     </Switch>
    </Field>
  )
}

export default ThemeToggle