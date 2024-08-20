import { sql } from "kysely";
import db from "./db";
import { AddNewTask, AddNewTaskSchema, BoardById } from "./types.BoardManager";
import { errorCodes } from "@/util/errorCodes";
import ErrorReponse from "@/util/ErrorReponse";

export const getAllBoards = async () => {
  try {
    const rows = await db.selectFrom("boards").selectAll().execute();
    return rows;
  } catch {}
};

/**
 *
 *
 */

export const getBoardById = async (id: number): Promise<BoardById> => {
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
        fn.count("st.id").as("subtasksCount"),
        fn
          .sum(sql`CASE WHEN st.is_completed THEN 1 ELSE 0 END`)
          .as("subtasksCompleted"),
      ])
      .where("c.board_id", "=", id)
      .groupBy(["c.id", "t.id"])
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

    rows.forEach((row) => {
      if (!columnMap.has(row.columnId)) {
        columnMap.set(row.columnId, {
          columnId: row.columnId,
          title: row.columnTitle,
          tasks: [],
        });
      }

      if (row.taskId !== null) {
        columnMap.get(row.columnId).tasks.push({
          taskId: row.taskId,
          title: row.taskTitle,
          subtasksCount: row.subtasksCount,
          subtasksCompleted: row.subtasksCompleted,
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
  //First, validate the data is the correct format
  if (AddNewTaskSchema.parse(data)) {
    console.log("CORRECT");
  } else {
    console.log("FAIL");
  }

  return;
};
