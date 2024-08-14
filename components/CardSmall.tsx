"use client";

import useModalStore from "@/stores/modalStore";
import React from "react";

type Props = {
  task: string;
  subtasks: any[];
  onClick?: () => void;
};

const CardSmall = ({ task, subtasks, onClick }: Props) => {
  const subtasksCompleted = subtasks?.reduce(
    (acc, curr) => (curr.isCompleted ? acc + 1 : acc),
    0
  );

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-black-light shadow-1 rounded-lg p-5 text-headingXl dark:text-white w-[280px] select-none cursor-pointer"
    >
      <p className="text-headingM mb-3 dark:text-gray-light text-gray-darkest">
        {task}
      </p>
      {subtasks ? (
        <p className="text-bodyM text-gray-dark">
          {subtasksCompleted} of {subtasks?.length} completed.
        </p>
      ) : null}
    </div>
  );
};

export default CardSmall;
