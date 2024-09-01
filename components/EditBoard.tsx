import React from "react";
import useModalStore from "@/stores/modalStore";
import { Icons } from "./Icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { AddEditBoard, AddEditBoardSchema } from "@/data/types.BoardManager";
import Input from "./Input";
import Button from "./Button";
import useBoardStore from "@/stores/boardStore";
import { handleEditBoard } from "@/app/(actions)/actions";
type Props = {};

const EditBoard = (props: Props) => {
  const { toggleModal } = useModalStore();
  const { currentBoard } = useBoardStore();
  const RemoveIcon = Icons["close"];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddEditBoard>({
    defaultValues: {
      title: currentBoard?.title,
      boardId: currentBoard?.boardId,
      columns: currentBoard?.columns,
    },
    resolver: zodResolver(AddEditBoardSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns", // This corresponds to the subtasks array in Inputs
  });

  const onSubmit: SubmitHandler<AddEditBoard> = async (data) => {
    try {
      await handleEditBoard(data);
      toggleModal(null);
    } catch (error) {
      console.log(error);
    }
  };
  const addColumn = () => {
    append({ title: "" }); // Add a new empty subtask
  };
  return (
    <form className="rounded p-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-headingL text-black-dark dark:text-gray-light">
        Edit Board
      </h2>
      <Input
        label="Name"
        placeholder="e.g. Web Design"
        {...register("title")}
      />
      <div className="space-y-2 overflow-y-auto">
        <label className="text-bodyM text-gray-dark">Columns</label>
        {fields.map((field, index) => (
          <div key={field + field.id} className="flex gap-2 items-center">
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
          Add New Column
        </Button>
      </div>
      <Button fullWidth intent="primary" icon="plus" size="lg" type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default EditBoard;
