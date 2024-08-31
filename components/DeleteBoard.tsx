import useBoardStore from "@/stores/boardStore";
import React from "react";
import Button from "./Button";
import useModalStore from "@/stores/modalStore";
import { handleDeleteBoard } from "@/app/(actions)/actions";

type Props = {};

const DeleteBoard = (props: Props) => {
  const { currentBoard } = useBoardStore();
  const { toggleModal } = useModalStore();

  const handleDelete = async () => {
    if (currentBoard?.boardId) {
      try {
        await handleDeleteBoard(currentBoard?.boardId);
        toggleModal(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-5 space-y-5">
      <p className="text-headingL font-bold text-red-dark">
        Delete this board?
      </p>
      <p className="text-gray-dark">
        Are you sure you want to delete the{" "}
        <span className="font-bold ">{currentBoard?.title}</span> board? This
        action will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="flex gap-5">
        <Button intent="destructive" fullWidth onClick={handleDelete}>
          Delete
        </Button>
        <Button intent="secondary" fullWidth onClick={() => toggleModal(null)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteBoard;
