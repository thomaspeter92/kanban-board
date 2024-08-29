"use client";

import React, { useEffect } from "react";
import { Icons } from "./Icons";
import Button from "./Button";
import CardSmall from "./CardSmall";
import useModalStore from "@/stores/modalStore";
import TaskDetail from "./TaskDetail";
import { BoardById } from "@/data/types.BoardManager";
import useBoardStore from "@/stores/boardStore";

const Column = ({ data }: { data: BoardById["columns"][number] }) => {
  const { toggleModal } = useModalStore();

  const handleOpenTask = (task: any) => {
    toggleModal(<TaskDetail task={task} />);
  };

  return (
    <div className="w-[280px] h-full shrink-0 relative overflow-y-auto no-scrollbar">
      <h2 className="uppercase text-headingS text-gray-dark sticky top-0 bg-gray-light dark:bg-black-medium pb-5">
        {data?.title} ({data?.tasks?.length})
      </h2>
      <div className="space-y-5">
        {data?.tasks &&
          data?.tasks?.length > 0 &&
          data?.tasks.map((d, i) => (
            <CardSmall
              key={d?.taskId}
              task={d.title}
              subtasksCount={d.subtasksCount}
              subtasksCompleted={d.subtasksCompleted}
              onClick={() => handleOpenTask(d)}
            />
          ))}
      </div>
    </div>
  );
};

const AddNewColumn = () => {
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

const Board = ({ board }: { board: BoardById }) => {
  const { setCurrentBoard } = useBoardStore();

  // When mounting this component, set the current board state for client components within the app to access it.
  useEffect(() => {
    setCurrentBoard(board);
    // Clean up when user leaves the board page
    return () => setCurrentBoard(null);
  }, [board, setCurrentBoard]);

  if (board?.columns?.length && board?.columns?.length > 0) {
    return (
      <div className="flex gap-5 h-full overflow-x-auto overflow-y-hidden">
        {board?.columns?.map((d) => <Column key={d?.columnId} data={d} />)}
        <AddNewColumn />
      </div>
    );
  } else {
    return <BoardEmpty />;
  }
};

export default Board;
