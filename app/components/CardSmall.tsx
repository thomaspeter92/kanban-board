import React from "react";

type Props = {
  task: string;
  subtasks: number;
  subtasksCompleted: number;
  onClick: () => void;
};

const CardSmall = ({ task, subtasks, subtasksCompleted, onClick }: Props) => {
  return (
    <div className="bg-white dark:bg-black-light shadow-1 rounded-lg p-5 text-headingXl dark:text-white w-[280px]">
      <p className="text-headingM mb-3 dark:text-gray-light text-black-dark">{task}</p>
      <p className="text-bodyM text-gray-dark">
        {subtasksCompleted} of {subtasks} completed.
      </p>
    </div>
  );
};

export default CardSmall;
