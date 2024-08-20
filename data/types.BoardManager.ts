import { z } from "zod";

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
              taskId: z.string(),
              title: z.string(),
              subtasksCount: z.number(),
              subtasksCompleted: z.number(),
            }),
          )
          .optional(),
      })
      .optional(),
  ),
});
export type BoardById = z.infer<typeof GetBoardByIdSchema>;

export const AddNewTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  columnId: z.number(),
  subtasks: z.array(z.object({ title: z.string() })).optional(),
});
export type AddNewTask = z.infer<typeof AddNewTaskSchema>;
