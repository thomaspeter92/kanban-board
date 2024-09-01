import db from "./db";
import {
  AddEditBoard,
  AddEditBoardSchema,
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
    return rows;
  } catch {}
};

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
      boardId: board.boardId,
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

      if (data.subtasks) {
        // Fetch existing subtasks from the database
        const existingSubtasks = await trx
          .selectFrom("subtasks")
          .select(["id"])
          .where("task_id", "=", data.taskId)
          .execute();

        const existingSubtaskIds = new Set(
          existingSubtasks.map((sub) => sub.id),
        );

        // Determine the subtasks to keep and to add
        const submittedSubtaskIds = new Set(
          data?.subtasks.map((sub) => sub.id),
        );

        // Find subtasks to delete
        const subtasksToDelete = [...existingSubtaskIds].filter(
          (id) => !submittedSubtaskIds.has(id),
        );

        // Delete subtasks that are not in the submitted form
        if (subtasksToDelete.length > 0) {
          await trx
            .deleteFrom("subtasks")
            .where("id", "in", subtasksToDelete)
            .execute();
        }
      }

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

export const deleteTask = async (taskId: number) => {
  try {
    // Cascade will delete the corresponding rows in subtasks table
    const result = await db
      .deleteFrom("tasks")
      .where("id", "=", taskId)
      .executeTakeFirst();

    return result;
  } catch (error) {
    throw error;
  }
};

export const addBoard = async (data: AddEditBoard) => {
  try {
    // First validate the data
    AddEditBoardSchema.parse(data);

    // start a new transaction (will be posting into boards & columns)
    const result = await db.transaction().execute(async (trx) => {
      const boardResult = await trx
        .insertInto("boards")
        .returning("boards.id")
        .values({ title: data.title })
        .executeTakeFirst();

      // Insert each column into the columns table
      // First format them into object with the board id
      if (data.columns && data.columns.length > 0 && boardResult?.id) {
        const columnsInsert = data.columns.map((column) => ({
          board_id: boardResult.id,
          title: column.title,
        }));
        await trx.insertInto("columns").values(columnsInsert).execute();
      }
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteBoard = async (boardId: number) => {
  try {
    // Cascade will delete the corresponding rows in columns,tasks,subtasks table
    const result = await db
      .deleteFrom("boards")
      .where("id", "=", boardId)
      .executeTakeFirst();

    return result;
  } catch (error) {
    throw error;
  }
};

export const editBoard = async (data: AddEditBoard) => {
  try {
    // Maybe better to make new schemas for everything rather than reusing?
    AddEditBoardSchema.parse(data);
    if (data.boardId) {
      const result = await db.transaction().execute(async (trx) => {
        await trx
          .updateTable("boards")
          .returning("boards.id")
          .set({
            title: data.title,
          })
          .where("id", "=", data.boardId as number)
          .executeTakeFirst();

        if (data.columns) {
          // Fetch existing columns from the database
          const existingColumns = await trx
            .selectFrom("columns")
            .select(["id"])
            .where("board_id", "=", data.boardId as number)
            .execute();

          const existingColumnIds = new Set(
            existingColumns.map((col) => col.id),
          );

          // Determine the columns to keep and to add
          const submittedColumnIds = new Set(
            data?.columns.map((col) => col.columnId),
          );

          // Find columns to delete
          const columnsToDelete = [...existingColumnIds].filter(
            (id) => !submittedColumnIds.has(id),
          );

          // Delete columns that are not in the submitted form
          if (columnsToDelete.length > 0) {
            await trx
              .deleteFrom("columns")
              .where("id", "in", columnsToDelete)
              .execute();
          }
        }

        // Now insert newly added columns or update edited column names
        if (data.columns && data.columns.length > 0) {
          // Iterate over each column and update them
          for (const column of data.columns) {
            if (column.columnId) {
              // existing column, update it
              await trx
                .updateTable("columns")
                .set({
                  title: column.title,
                })
                .where("id", "=", column.columnId)
                .execute();
            } else {
              // new column, insert it
              await trx
                .insertInto("columns")
                .values({
                  title: column.title,
                  board_id: data.boardId as number,
                })
                .execute();
            }
          }
        }
      });
      return result;
    } else {
      throw new Error("no board id");
    }
  } catch (error) {
    throw error;
  }
};
