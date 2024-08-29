import { sql } from "kysely";
import db from "./db";
import {
  AddNewTask,
  AddNewTaskSchema,
  BoardById,
  UpdateTask,
  UpdateTaskSchema,
} from "./types.BoardManager";
import { errorCodes } from "@/util/errorCodes";
import ErrorReponse from "@/util/ErrorReponse";

export const getAllBoards = async (): Promise<any> => {
  try {
    const rows = await db.selectFrom("boards").selectAll().execute();
    console.log(rows);
    return rows;
  } catch {}
};

/**
 *
 *
 */

export const getBoardById = async (id: number): Promise<BoardById> => {
  console.log("GET BOARD BY ID ***********");
  try {
    // First, fetch the board details
    const board = await db
      .selectFrom("boards")
      .select(["id as boardId", "title as boardTitle"])
      .where("id", "=", id)
      .executeTakeFirst();

    // If there is no board throw error.
    if (!board) {
      throw new ErrorReponse(404, errorCodes[404]);
    }

    // Then, fetch columns
    const rows = await db
      .selectFrom("columns as c")
      .leftJoin("tasks as t", "t.column_id", "c.id")
      .leftJoin("subtasks as st", "st.task_id", "t.id")
      .select(({ fn }) => [
        "c.id as columnId",
        "c.title as columnTitle",
        "t.id as taskId",
        "t.title as taskTitle",
        "t.description as taskDescription",
        "t.created_at as createdAt",
        "st.id as subtaskId",
        "st.title as subtaskTitle",
        "st.is_completed as isCompleted",
      ])
      .where("c.board_id", "=", id)
      .groupBy(["c.id", "t.id", "st.id"])
      .orderBy("c.id")
      .orderBy("t.id")
      .execute();

    //Formatting the result for the response.
    const result: BoardById = {
      boardId: id,
      title: board.boardTitle,
      columns: [],
    };

    const columnMap = new Map<number, any>();
    const taskMap = new Map<number, any>();

    rows.forEach((row) => {
      if (!columnMap.has(row.columnId)) {
        columnMap.set(row.columnId, {
          columnId: row.columnId,
          title: row.columnTitle,
          tasks: [],
        });
      }

      // Add task to the map if not already present
      if (row.taskId !== null && !taskMap.has(row.taskId)) {
        const task = {
          taskId: row.taskId,
          title: row.taskTitle,
          columnId: row.columnId,
          description: row.taskDescription,
          subtasks: [],
          // subtasksCount: row.subtasksCount,
          // subtasksCompleted: row.subtasksCompleted,
          createdAt: row.createdAt,
        };

        taskMap.set(row.taskId, task);
        columnMap.get(row.columnId).tasks.push(task);
      }

      // Add subtasks to the corresponding task
      if (row.subtaskId !== null && row.taskId) {
        taskMap.get(row.taskId).subtasks.push({
          id: row.subtaskId,
          title: row.subtaskTitle,
          isCompleted: row.isCompleted,
        });
        taskMap.forEach((value, key) => {
          value.subtasksCount = value.subtasks.length;
          value.subtasksCompleted = value.subtasks.reduce(
            (acc: any, curr: any) => (curr.isCompleted ? acc + 1 : acc),
            0,
          );
        });
      }
    });

    result["columns"] = Array.from(columnMap.values());

    return result;
  } catch (error) {
    throw error;
  }
};

export const createNewTask = async (data: AddNewTask) => {
  try {
    //First, validate the data is the correct format
    AddNewTaskSchema.parse(data);
    const result = await db.transaction().execute(async (trx) => {
      // First insert to tasks table
      const taskInsert = await trx
        .insertInto("tasks")
        .returning("tasks.id")
        .values({
          title: data.title,
          column_id: data.columnId,
          description: data.description,
        })
        .executeTakeFirst();

      const taskId = taskInsert?.id;

      // Insert each subtask into the subtasks table
      // First format them into object with the task id
      if (data.subtasks && data.subtasks.length > 0) {
        const subtasksInsert = data.subtasks.map((subtask) => ({
          task_id: taskId,
          title: subtask.title,
        }));
        await trx.insertInto("subtasks").values(subtasksInsert).execute();
      }
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (data: UpdateTask) => {
  try {
    // Validate the the data
    UpdateTaskSchema.parse(data);

    const result = await db.transaction().execute(async (trx) => {
      // First update  tasks table
      const taskUpdate = await trx
        .updateTable("tasks")
        .returning("tasks.id")
        .set({
          title: data.title,
          column_id: data.columnId,
          description: data.description,
        })
        .where("id", "=", data.taskId)
        .executeTakeFirst();

      if (data.subtasks && data.subtasks.length > 0) {
        // Iterate over each subtask and update them
        for (const subtask of data.subtasks) {
          if (subtask.id) {
            // existing subtask, update it
            await trx
              .updateTable("subtasks")
              .set({
                title: subtask.title,
                is_completed: subtask.isCompleted,
              })
              .where("id", "=", subtask.id) // Assuming each subtask has a unique 'id'
              .execute();
          } else {
            // new subtask, insert it
            await trx
              .insertInto("subtasks")
              .values({
                title: subtask.title,
                task_id: data.taskId,
              })
              .execute();
          }
        }
      }
      return taskUpdate;
    });

    return result;
  } catch (error) {
    throw error;
  }
};
