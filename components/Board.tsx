"use client";

import useBoardStore, { Column as ColumnType, Task } from "@/stores/boardStore";
import React from "react";
import { Icons } from "./Icons";
import Button from "./Button";
import CardSmall from "./CardSmall";
import useModalStore from "@/stores/modalStore";
import TaskDetail from "./TaskDetail";
import { getAllBoards } from "@/data/BoardManager";
type Props = {};

const Column = ({ data }: { data: ColumnType }) => {
  const { toggleModal } = useModalStore();

  const handleOpenTask = (task: Task) => {
    toggleModal(<TaskDetail task={task} />);
  };

  return (
    <div className="w-[280px] h-full shrink-0 relative overflow-y-auto no-scrollbar">
      <h2 className="uppercase text-headingS text-gray-dark sticky top-0 bg-gray-light dark:bg-black-medium pb-5">
        {data.name} ({data?.tasks?.length})
      </h2>
      <div className="space-y-5">
        {data.tasks.map((d, i) => (
          <CardSmall
            key={d.id}
            task={d.title}
            subtasks={d.subtasks}
            onClick={() => handleOpenTask(d)}
          />
        ))}
      </div>
    </div>
  );
};

const AddNewColumn = (props: Props) => {
  const PlusIcon = Icons["plus"];
  return (
    <div className="w-[280px] mt-9 h-full rounded bg-gray-medium dark:bg-black-light shrink-0 flex items-center justify-center">
      <button className="text-headingL text-gray-dark flex items-center ">
        <PlusIcon />
        Add New Column
      </button>
    </div>
  );
};

const BoardEmpty = () => {
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
};

const Board = (props: Props) => {
  const { currentBoard } = useBoardStore();

  if (currentBoard?.columns?.length && currentBoard?.columns?.length > 0) {
    return (
      <div className="flex gap-5 h-full overflow-x-auto overflow-y-hidden">
        {currentBoard?.columns?.map((d) => <Column key={d.id} data={d} />)}
        <AddNewColumn />
      </div>
    );
  } else {
    return <BoardEmpty />;
  }
};

export default Board;
