"use server";

import { revalidatePath } from "next/cache";
import { createNewTask, updateTask } from "@/data/BoardManager";
import { AddNewTask, UpdateTask } from "@/data/types.BoardManager";

/**
 *  FOR SERVER ACTIONS THAT CAN BE CALLED FROM CLIENT COMPONENTS
 */
export const handleSubmitNewTask = async (params: AddNewTask) => {
  try {
    const res = await createNewTask(params);
    revalidatePath("/board");
    return res;
  } catch (error) {
    throw error;
  }
};

export const handleUpdateTask = async (params: UpdateTask) => {
  try {
    const res = await updateTask(params);
    console.log(params);
    revalidatePath("/board");
  } catch (error) {
    throw error;
  }
};
