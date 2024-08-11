'use client'

import Image from "next/image";
import Button from "./components/Button";
import Input from "./components/Input";
import ThemeToggle from "./components/ThemeToggle";
import Dropdown from "./components/Dropdown";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Button  intent="primary" size="sm">Button</Button>
     <Input />
     <ThemeToggle />
     <Dropdown 
     onChange={() => null}
     selected="option 1"
     options={['option 1 ', 'options 2', 'options 3']}
     />
    </main>
  );
}
