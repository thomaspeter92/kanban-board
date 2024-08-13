import React from "react";
import { Icons } from "./Icons";
import Image from "next/image";
import { images } from "@/util/images";
import ThemeToggle from "./ThemeToggle";

type Props = {};

const boards = [
  {
    href: "",
    title: "Platform Launch",
  },
  {
    href: "",
    title: "Marketing Plan",
  },
  {
    href: "",
    title: "Roadmap",
  },
];

const SidbarMenuItem = ({
  title,
  active,
  onClick,
}: {
  title: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  const BoardIcon = Icons["board"];
  return (
    <li className="py-5 cursor-pointer flex text-headingM gap-3 text-gray-dark px-5 hover:bg-purple-dark hover:text-white mr-5 rounded-r-full transition-all">
      <BoardIcon size={20} strokeWidth={2.5} />
      {title}
    </li>
  );
};

const Sidebar = (props: Props) => {
  const HideIcon = Icons["hide"];
  return (
    <aside className="bg-white dark:bg-gray-darkest w-[260px] py-10 h-screen flex flex-col border-r border-gray-medium dark:border-gray-dark/25">
      {/* Hide on dark mode */}
      <Image
        className="px-5 mb-10 dark:hidden"
        width={152}
        height={25}
        src={images.logoLight}
        alt="Kanban Logo"
      />
      {/* Hide on light mode */}
      <Image
        className="px-5 mb-10 hidden dark:block"
        width={152}
        height={25}
        src={images.logoDark}
        alt="Kanban Logo"
      />
      <p className="text-headingS uppercase text-gray-dark px-5 mb-3">
        All Boards
      </p>
      <ul className="flex-1">
        {boards.map((d, i) => {
          return <SidbarMenuItem title={d.title} />;
        })}
      </ul>

      <div className="px-5 space-y-5">
        <ThemeToggle />
        <button className="text-headingM text-gray-dark flex gap-3">
          <HideIcon size={20} />
          Hide Sidebar
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
