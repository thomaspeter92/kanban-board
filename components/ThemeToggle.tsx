"use client";

import { Field, Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { Icons } from "./Icons";

type Props = {};

const ThemeToggle = (props: Props) => {
  const [mode, setMode] = useState<"dark" | "light">("light");

  useEffect(() => {
    // This runs only on the client, ensuring no server-side error
    const initialMode = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setMode(initialMode);
  }, []);

  const MoonIcon = Icons["moon"];
  const SunIcon = Icons["sun"];

  const handleChange = () => {
    setMode((mode) => (mode === "dark" ? "light" : "dark"));
    const isDark = document.documentElement.classList.toggle("dark");
  };

  return (
    <Field className="rounded-lg bg-purple-dark/10 dark:bg-black-light py-3 flex items-center justify-center text-gray-dark gap-5 px-5 w-full">
      <SunIcon size={25} />
      <Switch
        checked={mode === "dark"}
        onChange={handleChange}
        className="group inline-flex h-6 w-11 items-center rounded-full bg-purple-dark transition "
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
      </Switch>
      <MoonIcon size={25} />
    </Field>
  );
};

export default ThemeToggle;
