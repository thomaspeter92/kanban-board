import React from "react";
import TaskCheckbox from "./TaskCheckbox";
import useBoardStore from "@/stores/boardStore";
import Dropdown from "./Dropdown";
import { Icons } from "./Icons";
import Button from "./Button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  BoardById,
  UpdateTask,
  UpdateTaskSchema,
} from "@/data/types.BoardManager";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleUpdateTask } from "@/app/(actions)/actions";
import { useState } from "react";
import PopoverMenu from "./PopoverMenu";

// Extract the type for a single task
type TaskType = NonNullable<
  NonNullable<BoardById["columns"][number]>["tasks"]
>[number];

const TaskDetail = ({ task }: { task: TaskType }) => {
  const { currentBoard } = useBoardStore();
  const [isEditTask, setIsEditTask] = useState<boolean>(false);

  const MoreIcon = Icons["elipsisVertical"];

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateTask>({
    defaultValues: {
      subtasks: task.subtasks,
      columnId: task.columnId,
      title: task.title,
      description: task.description,
      taskId: task.taskId,
    },
    resolver: zodResolver(UpdateTaskSchema),
  });

  const onSubmit: SubmitHandler<UpdateTask> = async (data) => {
    const updatedTask = {
      ...data,
      subtasks: data.subtasks,
      columnId: data.columnId,
    };
    try {
      await handleUpdateTask(updatedTask); // Update the task and submit the form
    } catch (error) {}
  };

  // Automatically submit the form when values change
  React.useEffect(() => {
    const subscription = watch((values) => {
      handleSubmit(onSubmit)(); // Automatically submit when a change is detected
    });
    return () => subscription.unsubscribe();
  }, [watch, handleSubmit, onSubmit]);

  return (
    <form className="rounded p-5 space-y-5">
      <div className="flex justify-between">
        <h2 className="text-headingL text-black-dark dark:text-gray-light">
          {task.title}
        </h2>
        <PopoverMenu />
      </div>
      <p className="text-bodyL text-gray-dark">{task.description}</p>
      <div className="space-y-3">
        <p className="text-bodyM text-gray-dark dark:text-gray-medium">
          Subtasks ({task?.subtasks?.length})
        </p>
        {task?.subtasks?.length > 0 ? (
          <ul className="space-y-2">
            {task.subtasks.map((d, i) => (
              <Controller
                key={d.id}
                control={control}
                name={`subtasks.${i}.isCompleted`}
                render={({ field }) => (
                  <TaskCheckbox
                    onChange={(checked) => field.onChange(checked)}
                    task={d.title}
                    checked={watch(`subtasks.${i}.isCompleted`)}
                  />
                )}
              />
            ))}
          </ul>
        ) : null}
      </div>
      <div className="space-y-3">
        <p className="text-bodyM text-gray-dark">Current Status</p>
        <Controller
          control={control}
          name="columnId"
          render={({ field }) => (
            <Dropdown
              onChange={(value) => {
                setValue("columnId", Number(value));
              }}
              options={(currentBoard as BoardById).columns.map((col) => ({
                label: col?.title as string,
                value: col?.columnId as number,
              }))}
              value={watch("columnId")}
            />
          )}
        />
      </div>
    </form>
  );
};

export default TaskDetail;
