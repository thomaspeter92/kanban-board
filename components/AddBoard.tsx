import React from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import Input from "./Input";
import { AddEditBoard, AddEditBoardSchema } from "@/data/types.BoardManager";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "./Icons";
import Button from "./Button";
import { handleAddBoard } from "@/app/(actions)/actions";
import useModalStore from "@/stores/modalStore";

type Props = {};

const AddBoard = (props: Props) => {
  const { toggleModal } = useModalStore();
  const RemoveIcon = Icons["close"];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddEditBoard>({
    defaultValues: { title: "" },
    resolver: zodResolver(AddEditBoardSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns", // This corresponds to the subtasks array in Inputs
  });

  const onSubmit: SubmitHandler<AddEditBoard> = async (data) => {
    try {
      await handleAddBoard(data);
      toggleModal(null);
    } catch (error) {
      console.log(error);
    }
  };
  const addColumn = () => {
    append({ title: "" }); // Add a new empty subtask
  };

  console.log(errors);

  return (
    <form className="rounded p-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-headingL text-black-dark dark:text-gray-light">
        Add New Board
      </h2>
      <Input
        label="Name"
        placeholder="e.g. Web Design"
        {...register("title")}
      />
      <div className="space-y-2 overflow-y-auto">
        <label className="text-bodyM text-gray-dark">Columns</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-center">
            <Input
              {...register(`columns.${index}.title` as const, {
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
          onClick={addColumn}
          fullWidth
          intent="secondary"
          icon="plus"
          size="lg"
          type="button"
        >
          Add New Subtask
        </Button>
      </div>
      <Button fullWidth size={"lg"} type="submit" intent={"primary"}>
        Add Board
      </Button>
    </form>
  );
};

export default AddBoard;
