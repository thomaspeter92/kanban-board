"use server";

import { revalidatePath } from "next/cache";
import {
  addBoard,
  createNewTask,
  deleteBoard,
  deleteTask,
  editBoard,
  updateTask,
} from "@/data/BoardManager";
import {
  AddEditBoard,
  AddNewTask,
  UpdateTask,
} from "@/data/types.BoardManager";
import { redirect } from "next/navigation";

/**
 *  FOR SERVER ACTIONS THAT CAN BE CALLED FROM CLIENT COMPONENTS
 */
export const handleSubmitNewTask = async (params: AddNewTask) => {
  try {
    const res = await createNewTask(params);
    revalidatePath("/boards/[id]");
    return res;
  } catch (error) {
    throw error;
  }
};

export const handleUpdateTask = async (params: UpdateTask) => {
  try {
    const res = await updateTask(params);
    revalidatePath("/boards/[id]");
    return res;
  } catch (error) {
    throw error;
  }
};

export const handleDeleteTask = async (taskId: number) => {
  try {
    const res = await deleteTask(taskId);
    revalidatePath("/boards/[id]");
    return;
  } catch (error) {
    throw error;
  }
};

export const handleAddBoard = async (params: AddEditBoard) => {
  try {
    const res = await addBoard(params);
    revalidatePath("/");
    return;
  } catch (error) {
    throw error;
  }
};

export const handleDeleteBoard = async (boardId: number) => {
  try {
    await deleteBoard(boardId);
    revalidatePath("/");
    redirect("/");
  } catch (error) {
    throw error;
  }
};
export const handleEditBoard = async (data: AddEditBoard) => {
  try {
    let result = await editBoard(data);
    revalidatePath("/");
    return result;
  } catch (error) {
    throw error;
  }
};
