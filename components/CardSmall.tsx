"use client";

import useModalStore from "@/stores/modalStore";
import React from "react";

type Props = {
  task: string;
  subtasksCount: number;
  subtasksCompleted: number;
  onClick?: () => void;
};

const CardSmall = ({
  task,
  subtasksCount,
  subtasksCompleted,
  onClick,
}: Props) => {
  console.log(subtasksCount);
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-black-light shadow-1 rounded-lg p-5 text-headingXl dark:text-white w-[280px] select-none cursor-pointer"
    >
      <p className="text-headingM mb-3 dark:text-gray-light text-gray-darkest">
        {task}
      </p>
      {subtasksCount > 0 ? (
        <p className="text-bodyM text-gray-dark">
          {subtasksCompleted} of {subtasksCount} completed.
        </p>
      ) : null}
    </div>
  );
};

export default CardSmall;
