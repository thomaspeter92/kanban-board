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
