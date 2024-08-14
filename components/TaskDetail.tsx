import React from "react";
import TaskCheckbox from "./TaskCheckbox";
import { Task } from "@/stores/boardStore";
import Dropdown from "./Dropdown";
import { Icons } from "./Icons";

type Props = {
  task: Task;
};

const TaskDetail = ({ task }: Props) => {
  const MoreIcon = Icons["elipsisVertical"];

  return (
    <div className="rounded p-5 space-y-5">
      <div className="flex justify-between">
        <h2 className="text-headingL text-black-dark dark:text-gray-light">
          {task.title}
        </h2>
        <button className="text-gray-medium hover:text-gray-dark transition-all">
          <MoreIcon />
        </button>
      </div>
      <p className="text-bodyL text-gray-dark">{task.description}</p>
      <div className="space-y-3">
        <p className="text-bodyM text-gray-dark dark:text-gray-medium">
          Subtasks ({task?.subtasks?.length})
        </p>
        {task?.subtasks?.length > 0 ? (
          <ul className="space-y-2">
            {task.subtasks.map((d, i) => (
              <TaskCheckbox task={d.title} checked={d.isCompleted} />
            ))}
          </ul>
        ) : null}
      </div>
      <div className="space-y-3">
        <p className="text-bodyM text-gray-dark">Current Status</p>
        <Dropdown options={["To do", "Doing", "Done"]} selected="Doing" />
      </div>
    </div>
  );
};

export default TaskDetail;
