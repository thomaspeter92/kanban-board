import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
  boards: BoardsTable;
  columns: ColumnsTable;
  tasks: TasksTable;
  subtasks: SubtasksTable;
}

export interface BoardsTable {
  id: Generated<number>;
  title: string;
  created_at: Generated<string>;
}

export type Board = Selectable<BoardsTable>;
export type NewBoard = Insertable<BoardsTable>;
export type BoardUpdate = Updateable<BoardsTable>;

export interface ColumnsTable {
  id: Generated<number>;
  board_id: number; // Foreign key referencing BoardsTable.id
  title: string | null;
  created_at: Generated<string>;
}

export type Column = Selectable<ColumnsTable>;
export type NewColumn = Insertable<ColumnsTable>;
export type ColumnUpdate = Updateable<ColumnsTable>;

export interface TasksTable {
  id: Generated<number>;
  column_id: number; // Foreign key referencing ColumnsTable.id
  title: string | null;
  description: string | null;
  created_at: Generated<string>;
}

export type Task = Selectable<TasksTable>;
export type NewTask = Insertable<TasksTable>;
export type TaskUpdate = Updateable<TasksTable>;

export interface SubtasksTable {
  id: Generated<number>;
  task_id: number | null; // Foreign key referencing TasksTable.id
  title: string | null;
  is_completed: boolean | null;
  created_at: Generated<string>;
}

export type Subtask = Selectable<SubtasksTable>;
export type NewSubtask = Insertable<SubtasksTable>;
export type SubtaskUpdate = Updateable<SubtasksTable>;
