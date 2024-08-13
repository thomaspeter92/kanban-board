"use client";

import Image from "next/image";
import Button from "../components/Button";
import Input from "../components/Input";
import ThemeToggle from "../components/ThemeToggle";
import Dropdown from "../components/Dropdown";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <p className="tex-HeadingL text-gray-dark mb-5">
        This board is empty. Create a new column to get started.
      </p>
      <Button intent="primary" icon="plus">
        Add New Column
      </Button>
    </div>
  );
}
