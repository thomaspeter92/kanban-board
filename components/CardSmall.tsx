"use client";

import useModalStore from "@/stores/modalStore";
import React, { useRef, useEffect, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

type Props = {
  task: string;
  subtasksCount: number;
  subtasksCompleted: number;
  onClick?: () => void;
  taskId: number;
};

const CardSmall = ({
  taskId,
  task,
  subtasksCount,
  subtasksCompleted,
  onClick,
}: Props) => {
  const ref = useRef(null);
  // Draggable behaviour
  const [dragging, setDragging] = useState<boolean>(false); // NEW

  useEffect(() => {
    const el = ref.current;
    if (el === null) return;
    return draggable({
      element: el,
      getInitialData: () => ({ task: task, taskId: taskId }),
      onDragStart: () => setDragging(true), // NEW
      onDrop: () => setDragging(false), // NEW
    });
  }, []);
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`bg-white dark:bg-black-light shadow-1 rounded-lg p-5 text-headingXl dark:text-white w-[280px] select-none cursor-pointer ${dragging ? "opacity-30" : ""}`}
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
