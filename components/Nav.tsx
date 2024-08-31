"use client";

import React from "react";
import Button from "./Button";
import useBoardStore from "@/stores/boardStore";
import useModalStore from "@/stores/modalStore";
import NewTask from "./AddNewTask";
import DeleteBoard from "./DeleteBoard";
import PopoverMenu from "./PopoverMenu";

const Nav = () => {
  const { currentBoard } = useBoardStore();
  const { toggleModal } = useModalStore();

  const handleAddTask = () => {
    toggleModal(<NewTask />);
  };

  return (
    <nav className="h-[96px] w-full border-b border-gray-medium dark:border-gray-dark/25 px-5 bg-white dark:bg-black-light text-black-dark dark:text-white flex items-center gap-3 justify-between">
      <h1 className="text-headingXl flex-1">{currentBoard?.title}</h1>
      {currentBoard ? (
        <>
          <Button minimize icon="plus" intent="primary" onClick={handleAddTask}>
            Add New Task
          </Button>
          <PopoverMenu
            items={[
              {
                label: "Edit Board",
                onClick: () => null,
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
