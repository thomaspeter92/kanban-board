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

const NewTask = () => {
  const RemoveIcon = Icons["close"];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Task>({ defaultValues: { status: "todo" } });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks", // This corresponds to the subtasks array in Inputs
  });

  const onSubmit: SubmitHandler<Task> = (values) => {
    console.log(values);
  };

  const addSubtask = () => {
    append({ title: "", isCompleted: false, id: "" }); // Add a new empty subtask
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
          <div key={field.title + field.id} className="flex gap-2 items-center">
            <Input
              {...register(`subtasks.${index}.title` as const, {
                required: true,
              })}
              defaultValue={field.title} // Important to provide default value for proper initialization
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

      <Dropdown
        onChange={(value: string) => setValue("status", value)}
        options={["doing", "done", "finished"]}
        value={watch("status")}
      />

      <Button type="submit" fullWidth intent="primary" icon="plus" size="lg">
        Create Task
      </Button>
    </form>
  );
};

export default NewTask;
