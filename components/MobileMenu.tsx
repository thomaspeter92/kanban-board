import useBoardStore from "@/stores/boardStore";
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import React from "react";
import { Icons } from "./Icons";
import { GetAllBoards } from "@/data/types.BoardManager";
import { SidebarMenuItem, NewBoardButton } from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

const MobileMenu = ({ boards }: { boards: GetAllBoards }) => {
  const { currentBoard } = useBoardStore();
  const DownIcon = Icons["chevronDown"];

  return (
    <Popover className="">
      <PopoverButton className={"font-bold flex items-center gap-1 text-left"}>
        {currentBoard?.title}
        <DownIcon className="text-purple-dark" strokeWidth={4} size={15} />
      </PopoverButton>
      <PopoverBackdrop className="fixed inset-0 w-screen h-screen bg-black-dark/50 z-20" />
      <PopoverPanel className="flex whitespace-nowrap absolute top-10 left-1/2 -translate-x-1/2 z-30 flex-col bg-white dark:bg-black-light py-5 shadow-1 rounded-lg mt-14">
        <p className="text-headingS uppercase text-gray-dark mb-3 px-5">
          All Boards ({boards.length})
        </p>
        <ul className="flex-1">
          {boards?.map((d, i) => {
            return <SidebarMenuItem key={d.id} title={d.title} id={d.id} />;
          })}
          <NewBoardButton />
        </ul>
        <div className="px-3">
          <ThemeToggle />
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default MobileMenu;
