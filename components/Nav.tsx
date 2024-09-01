"use client";

import React from "react";
import Button from "./Button";
import useBoardStore from "@/stores/boardStore";
import useModalStore from "@/stores/modalStore";
import NewTask from "./AddNewTask";
import DeleteBoard from "./DeleteBoard";
import PopoverMenu from "./PopoverMenu";
import EditBoard from "./EditBoard";
import Image from "next/image";
import { images } from "@/util/images";
import MobileMenu from "./MobileMenu";
import { GetAllBoards } from "@/data/types.BoardManager";

const Nav = ({ boards }: { boards: GetAllBoards }) => {
  const { currentBoard } = useBoardStore();
  const { toggleModal } = useModalStore();

  const handleAddTask = () => {
    toggleModal(<NewTask />);
  };

  return (
    <nav className="h-[96px] w-full border-b border-gray-medium dark:border-gray-dark/25 px-5 bg-white dark:bg-black-light text-black-dark dark:text-white flex items-center gap-3 justify-between">
      <h1 className="text-headingXl flex-1 hidden md:block">
        {currentBoard?.title}
      </h1>
      <div className="flex flex-1 items-center md:hidden gap-3">
        <Image alt="logo" src={images.logoIcon} width={25} height={25} />
        <MobileMenu boards={boards} />
      </div>

      {currentBoard ? (
        <>
          <Button minimize icon="plus" intent="primary" onClick={handleAddTask}>
            Add New Task
          </Button>
          <PopoverMenu
            items={[
              {
                label: "Edit Board",
                onClick: () => toggleModal(<EditBoard />),
              },
              {
                label: "Delete Board",
                onClick: () => toggleModal(<DeleteBoard />),
                intent: "destructive",
              },
            ]}
          />
        </>
      ) : null}
    </nav>
  );
};

export default Nav;
