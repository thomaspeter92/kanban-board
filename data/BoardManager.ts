import db from "./db";

export const getAllBoards = async () => {
  try {
    const rows = await db.selectFrom("boards").selectAll().execute();
    return rows;
  } catch {}
};

export const getBoardById = async (id: number) => {
  try {
    const result = await db
      .selectFrom("boards as b")
      .innerJoin("columns as c", "c.board_id", "b.id")
      .innerJoin("tasks as t", "t.column_id", "c.id")
      .leftJoin("subtasks as st", "st.task_id", "t.id")
      .select([
        "b.id as boardId",
        "b.title as boardTitle",
        "c.id as columnId",
        "c.title as columnTitle",
        "t.id as taskId",
        "t.title as taskTitle",
        db.fn.count('st.id').as('subtasks'),
                db.fn.count("subtasks.id").
         
      ])
      .where("b.id", "=", id)
      .groupBy(["b.id", "c.id", "t.id"])
      .orderBy("c.id")
      .orderBy("t.id")
      .execute();

    //     // Formatting the result for the response.
    //     const board = {
    //       boardId: id,
    //       title: rows[0]?.boardTitle,
    //       columns: [],
    //     };

    //     const columnMap = new Map<number, any>();

    //     rows.forEach((row) => {
    //       if (!columnMap.has(row.columnId)) {
    //         columnMap.set(row.columnId, {
    //           columnId: row.columnId,
    //           title: row.columnTitle,
    //           tasks: [],
    //         });
    //       }

    //       columnMap.get(row.columnId).tasks.push({
    //         taskId: row.taskId,
    //         title: row.taskTitle,
    //         description: row.taskDescription,
    //         subtasksCount: row.subtasksCount,
    //         subtasksCompleted: row.subtasksCompleted,
    //       });
    //     });

    //     return board;
  } catch (error) {
    console.error(error);
  }
};
