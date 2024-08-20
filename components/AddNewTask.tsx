"use client";

import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { Subtask, Task } from "@/stores/boardStore";
import { Icons } from "./Icons";
import { error } from "console";
import { stat } from "fs";
import { createNewTask } from "@/data/BoardManager";
import {
  AddNewTaskSchema,
  AddNewTask as AddNewTaskType,
} from "@/data/types.BoardManager";
import { zodResolver } from "@hookform/resolvers/zod";

const AddNewTask = () => {
  const RemoveIcon = Icons["close"];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AddNewTaskType>({
    // defaultValues: { columnId:  },
    resolver: zodResolver(AddNewTaskSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks", // This corresponds to the subtasks array in Inputs
  });

  const onSubmit: SubmitHandler<AddNewTaskType> = (values) => {
    console.log(values);
    // createNewTask({
    //   columnId: 1,
    //   title: "Task",
    //   description: "",
    // });
  };

  const addSubtask = () => {
    append({ title: "" }); // Add a new empty subtask
  };

  return (
    <form className="rounded p-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
            <button onClick={() => remove(index)} className="text-gray-dark">
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
        >
          Add New Subtask
        </Button>
      </div>

      <Input {...register("columnId")} defaultValue={1} />
      {/* <Dropdown
        onChange={(value: string) => setValue("status", value)}
        options={["doing", "done", "finished"]}
        value={watch("status")}
      /> */}

      <Button type="submit" fullWidth intent="primary" icon="plus" size="lg">
        Create Task
      </Button>
    </form>
  );
};

export default AddNewTask;
