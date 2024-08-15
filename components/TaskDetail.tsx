import React from "react";
import TaskCheckbox from "./TaskCheckbox";
import { Subtask, Task } from "@/stores/boardStore";
import Dropdown from "./Dropdown";
import { Icons } from "./Icons";
import Button from "./Button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Props = {
  task: Task;
};

type TaskFormValues = {
  subtasks: Subtask[];
  status: string;
};

const TaskDetail = ({ task }: Props) => {
  const MoreIcon = Icons["elipsisVertical"];

  const { control, handleSubmit, watch } = useForm<Task>({
    defaultValues: {
      subtasks: task.subtasks,
      status: task.status,
    },
  });

  const onSubmit: SubmitHandler<TaskFormValues> = (data) => {
    const updatedTask = {
      ...task,
      subtasks: data.subtasks,
      status: data.status,
    };
    // onUpdate(updatedTask); // Update the task and submit the form
    console.log(data);
  };

  // Automatically submit the form when values change
  React.useEffect(() => {
    const subscription = watch((values) => {
      handleSubmit(onSubmit)();
    });
    return () => subscription.unsubscribe();
  }, [watch, handleSubmit, onSubmit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded p-5 space-y-5">
      <div className="flex justify-between">
        <h2 className="text-headingL text-black-dark dark:text-gray-light">
          {task.title}
        </h2>
        <button
          type="button"
          className="text-gray-medium hover:text-gray-dark transition-all"
        >
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
              <Controller
                key={d.id}
                control={control}
                name={`subtasks.${i}.isCompleted`}
                render={({ field }) => (
                  <TaskCheckbox
                    onChange={(checked) => field.onChange(checked)}
                    task={d.title}
                    checked={field.value}
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
          name="status"
          render={({ field }) => (
            <Dropdown
              options={["To do", "Doing", "Done"]}
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
      </div>
    </form>
  );
};

export default TaskDetail;
