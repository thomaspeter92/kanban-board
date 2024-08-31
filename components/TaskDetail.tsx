"use client";

import React from "react";
import TaskCheckbox from "./TaskCheckbox";
import useBoardStore from "@/stores/boardStore";
import Dropdown from "./Dropdown";
import { Icons } from "./Icons";
import Button from "./Button";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import {
  BoardById,
  UpdateTask,
  UpdateTaskSchema,
} from "@/data/types.BoardManager";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleDeleteTask, handleUpdateTask } from "@/app/(actions)/actions";
import { useState } from "react";
import PopoverMenu from "./PopoverMenu";
import Input from "./Input";
import TextArea from "./TextArea";
import useModalStore from "@/stores/modalStore";

// Extract the type for a single task
type TaskType = NonNullable<
  NonNullable<BoardById["columns"][number]>["tasks"]
>[number];

const TaskDetail = ({ task }: { task: TaskType }) => {
  const { currentBoard } = useBoardStore();
  const { toggleModal } = useModalStore();
  const [isEditTask, setIsEditTask] = useState<boolean>(false);

  const RemoveIcon = Icons["close"];

  const handleClickDeleteTask = async () => {
    try {
      await handleDeleteTask(task.taskId);
      console.log("TOGGLE MODAL");
      toggleModal(null);
    } catch (error) {
      // handle error
    }
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
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
      // Close the form
      if (isEditTask) toggleModal(null);
    } catch (error) {}
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks", // This corresponds to the subtasks array in Inputs
  });

  const addSubtask = () => {
    append({ title: "" }); // Add a new empty subtask
  };

  // Automatically submit the form when values change
  // Do not do this in edit mode. Edit should submit only on button press
  React.useEffect(() => {
    const subscription = watch((values) => {
      if (!isEditTask) handleSubmit(onSubmit)(); // Automatically submit when a change is detected
    });
    return () => subscription.unsubscribe();
  }, [watch, handleSubmit, onSubmit, isEditTask]);

  if (isEditTask) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="rounded p-5 space-y-5">
        <h2 className="text-headingL text-black-dark dark:text-gray-light">
          Edit Task
        </h2>
        <Input
          label="Title"
          {...register("title", {
            required: true,
          })}
        />
        <TextArea
          label="Description"
          {...register("description", { required: true })}
        />
        <div className="space-y-2 overflow-y-auto">
          <label className="text-bodyM text-gray-dark">Subtasks</label>
          {fields.map((field, index) => (
            <div key={field + field.id} className="flex gap-2 items-center">
              <Input
                {...register(`subtasks.${index}.title` as const, {
                  required: true,
                })}
                defaultValue={field.title}
                // Important to provide default value for proper initialization
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-gray-dark"
              >
                <RemoveIcon />
              </button>
            </div>
          ))}
          <Button
            onClick={addSubtask}
            fullWidth
            intent="secondary"
            icon="plus"
            size="lg"
            type="button"
          >
            Add New Subtask
          </Button>
        </div>
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
        <Button type="submit" fullWidth intent="primary" size="lg">
          Update Task
        </Button>
        {/* {error ? (
          <ErrorMessage message="Unable to add task. Please try again." />
        ) : null} */}
      </form>
    );
  }

  return (
    <form className="rounded p-5 space-y-5">
      <div className="flex justify-between">
        <h2 className="text-headingL text-black-dark dark:text-gray-light">
          {task.title}
        </h2>
        <PopoverMenu
          items={[
            {
              label: "Edit Task",
              onClick: () => setIsEditTask((isEditTask) => !isEditTask),
            },
            {
              label: "Delete Task",
              onClick: handleClickDeleteTask,
              intent: "destructive",
            },
          ]}
        />
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
                    checked={watch(`subtasks.${i}.isCompleted`) as boolean}
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
