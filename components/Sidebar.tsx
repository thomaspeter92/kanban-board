"use client";

import React from "react";
import { Icons } from "./Icons";
import Image from "next/image";
import { images } from "@/util/images";
import ThemeToggle from "./ThemeToggle";
import useBoardStore from "@/stores/boardStore";
import { Tables } from "@/data/db.types";
import Link from "next/link";

const SidbarMenuItem = ({
  title,
  active,
  id,
  // onClick,
}: {
  title: string;
  id: number;
  active?: boolean;
  // onClick: () => void;
}) => {
  const { currentBoard } = useBoardStore();
  const BoardIcon = Icons["board"];

  return (
    <Link
      href={"/board/" + id}
      className="py-5 cursor-pointer flex text-headingM gap-3 text-gray-dark px-5 hover:bg-purple-dark hover:text-white mr-5 rounded-r-full transition-all"
    >
      <BoardIcon size={20} strokeWidth={2.5} />
      {title}
    </Link>
  );
};

type SidebarProps = {
  boards: Tables<"boards">[];
};

const Sidebar = ({ boards }: SidebarProps) => {
  // const { boards, setCurrentBoard } = useBoardStore();
  const HideIcon = Icons["hide"];

  return (
    <aside className="bg-white dark:bg-black-light w-[260px] py-10 h-screen flex flex-col border-r border-gray-medium dark:border-gray-dark/25">
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
        {boards?.map((d, i) => {
          return <SidbarMenuItem key={d.id} title={d.title} id={d.id} />;
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
