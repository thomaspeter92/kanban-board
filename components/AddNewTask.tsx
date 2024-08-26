"use client";

import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import useBoardStore from "@/stores/boardStore";
import { Icons } from "./Icons";
import {
  AddNewTaskSchema,
  AddNewTask as AddNewTaskType,
} from "@/data/types.BoardManager";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleSubmitNewTask } from "@/app/(actions)/actions";
import useModalStore from "@/stores/modalStore";
import ErrorMessage from "./ErrorMessage";

const AddNewTask = () => {
  const { currentBoard } = useBoardStore();
  const [error, setError] = useState<boolean>();
  const { toggleModal } = useModalStore();

  const RemoveIcon = Icons["close"];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AddNewTaskType>({
    defaultValues: { columnId: currentBoard?.columns[0]?.columnId },
    resolver: zodResolver(AddNewTaskSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks", // This corresponds to the subtasks array in Inputs
  });

  const onSubmit: SubmitHandler<AddNewTaskType> = async (values) => {
    try {
      const res = await handleSubmitNewTask(values);
      console.log(res);
      // close the modal
      toggleModal(null);
    } catch (error) {
      setError(true);
    }
  };

  const addSubtask = () => {
    append({ title: "" }); // Add a new empty subtask
  };

  if (currentBoard)
    return (
      <form
        className="rounded p-5 space-y-5  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-headingL text-black-dark dark:text-gray-light">
          Add New Task
        </h2>
        <Input
          label="Title"
          {...register("title", {
            required: true,
          })}
        />
        <Input
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
          options={currentBoard.columns.map((col) => ({
            label: col?.title as string,
            value: col?.columnId as number,
          }))}
          value={watch("columnId")}
        />

        <Button type="submit" fullWidth intent="primary" icon="plus" size="lg">
          Create Task
        </Button>
        {error ? (
          <ErrorMessage message="Unable to add task. Please try again." />
        ) : null}
      </form>
    );
};

export default AddNewTask;
