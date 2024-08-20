import { BoardsTable } from "@/data/types.db";
import { Board } from "@/stores/boardStore";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./Input";

type Props = {};

const AddBoard = (props: Props) => {
  const { handleSubmit, register } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {};

  return (
    <form className="rounded p-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-headingL text-black-dark dark:text-gray-light">
        Add New Board
      </h2>
      <Input {...register("name")} />
    </form>
  );
};

export default AddBoard;
