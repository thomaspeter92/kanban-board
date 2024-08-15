"use client";

import React from "react";
import Button from "./Button";
import useBoardStore from "@/stores/boardStore";
import useModalStore from "@/stores/modalStore";
import NewTask from "./NewTask";

type Props = {};

const Nav = (props: Props) => {

  const { currentBoard } = useBoardStore();
  const {toggleModal} = useModalStore()

  const handleAddTask = () => {
    toggleModal(<NewTask />)
  }

  return (
    <nav className="h-[96px] w-full border-b border-gray-medium dark:border-gray-dark/25 px-10 bg-white dark:bg-black-light text-black-dark dark:text-white flex items-center justify-between">
      <h1 className="text-headingXl">{currentBoard?.name}</h1>
      <Button icon="plus" intent="primary" onClick={handleAddTask}>
        Add New Task
      </Button>
    </nav>
  );
};

export default Nav;
