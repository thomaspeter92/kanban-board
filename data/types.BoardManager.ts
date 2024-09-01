import { X } from "lucide-react";
import { z } from "zod";

const GetAllBoardsSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    created_at: z.date(),
  }),
);
export type GetAllBoards = z.infer<typeof GetAllBoardsSchema>;

const GetBoardByIdSchema = z.object({
  boardId: z.number(),
  title: z.string(),
  columns: z.array(
    z
      .object({
        columnId: z.number(),
        title: z.string(),
        tasks: z
          .array(
            z.object({
              taskId: z.number(),
              title: z.string(),
              columnId: z.number(),
              subtasksCount: z.number(),
              subtasksCompleted: z.number(),
              description: z.string().optional(),
              subtasks: z.array(
                z.object({
                  id: z.number(),
                  title: z.string(),
                  isCompleted: z.boolean(),
                }),
              ),
            }),
          )
          .optional(),
      })
      .optional(),
  ),
});
export type BoardById = z.infer<typeof GetBoardByIdSchema>;

export const AddNewTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  columnId: z.number().min(1),
  subtasks: z.array(z.object({ title: z.string() })).optional(),
});
export type AddNewTask = z.infer<typeof AddNewTaskSchema>;

export const UpdateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  columnId: z.number().min(1),
  subtasks: z
    .array(
      z.object({
        title: z.string(),
        isCompleted: z.boolean().optional(),
        id: z.number().optional(),
      }),
    )
    .optional(),
  taskId: z.number(),
});
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;

export const AddEditBoardSchema = z.object({
  boardId: z.number().optional(),
  title: z.string().min(3),
  columns: z.array(
    z.object({ title: z.string().min(3), columnId: z.number().optional() }),
  ),
});
export type AddEditBoard = z.infer<typeof AddEditBoardSchema>;
