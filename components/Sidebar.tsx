"use client";

import React, { useEffect, useState } from "react";
import { Icons } from "./Icons";
import Image from "next/image";
import { images } from "@/util/images";
import ThemeToggle from "./ThemeToggle";
import useBoardStore from "@/stores/boardStore";
// import { Tables } from "@/data/db.types";
import Link from "next/link";
import { routes } from "@/util/routes";
import { GetAllBoards } from "@/data/types.BoardManager";
import useModalStore from "@/stores/modalStore";
import AddBoard from "./AddBoard";
import { Transition, TransitionChild } from "@headlessui/react";
import { EyeIcon } from "lucide-react";
import { useBreakpoint } from "@/hooks/useBreakpoint";

export const SidebarMenuItem = ({
  title,
  active,
  id,
}: {
  title: string;
  id: number;
  active?: boolean;
}) => {
  const { currentBoard } = useBoardStore();
  const BoardIcon = Icons["board"];

  return (
    <Link
      href={routes.boards + id}
      className="py-5 cursor-pointer flex  font-semibold md:text-headingM gap-3 text-gray-dark px-5 hover:bg-purple-dark hover:text-white mr-5 rounded-r-full transition-all"
    >
      <BoardIcon size={20} strokeWidth={2.5} />
      {title}
    </Link>
  );
};

export const NewBoardButton = () => {
  const { toggleModal } = useModalStore();
  const PlusIcon = Icons["plus"];

  const openAddNewBoard = () => {
    toggleModal(<AddBoard />);
  };

  return (
    <button
      onClick={openAddNewBoard}
      className="flex items-center gap-3 text-headingM text-gray-dark px-5 py-5 hover:text-purple-dark"
    >
      <PlusIcon size={20} strokeWidth={2.5} />
      Create New Board
    </button>
  );
};

type SidebarProps = {
  boards: GetAllBoards;
};

const Sidebar = ({ boards }: SidebarProps) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const HideIcon = Icons["hide"];
  const breakpoint = useBreakpoint();

  const toggleSidebar = () => {
    setSidebarOpen((sidebarOpen) => !sidebarOpen);
  };

  useEffect(() => {
    if (breakpoint === "sm") {
      setSidebarOpen(false);
    }
  }, [breakpoint, sidebarOpen, setSidebarOpen]);

  return (
    <>
      <Transition show={sidebarOpen}>
        <aside className="data-[enter]:w-[260px] duration-300 data-[closed]:w-0 bg-white dark:bg-black-light w-[260px] py-10 h-screen border-r border-gray-medium dark:border-gray-dark/25">
          <TransitionChild>
            {/* Hide on dark mode */}
            <div className="flex flex-col h-full ">
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
                  return (
                    <SidebarMenuItem key={d.id} title={d.title} id={d.id} />
                  );
                })}
                <NewBoardButton />
              </ul>

              <div className="px-5 space-y-5">
                <ThemeToggle />
                <button
                  onClick={toggleSidebar}
                  className="text-headingM text-gray-dark flex gap-3"
                >
                  <HideIcon size={20} />
                  Hide Sidebar
                </button>
              </div>
            </div>
          </TransitionChild>
        </aside>
      </Transition>
      {!sidebarOpen ? (
        <button
          onClick={toggleSidebar}
          className="hidden md:block rounded-r-full bg-purple-dark p-3 h-fit w-fit fixed left-0 bottom-5 z-10"
        >
          <EyeIcon className="text-white" />
        </button>
      ) : null}
    </>
  );
};

export default Sidebar;
