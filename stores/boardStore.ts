import { BoardById } from "@/data/types.BoardManager";
import { create } from "zustand";

type StoreProps = {
  currentBoard: BoardById | null;
  setCurrentBoard: (board: BoardById | null) => void;
  moveTask: (taskId: number, newColumnId: number) => void;
};

const useBoardStore = create<StoreProps>((set) => ({
  currentBoard: null,
  setCurrentBoard: (board) => set({ currentBoard: board }),
  // Use this to optimistically update UI when drap and dropping tasks to new columnns.
  // Roll back state if backend fails
  moveTask: (taskId, newColumnId) =>
    set((state) => {
      const board = { ...state.currentBoard } as BoardById;

      if (!board.boardId) {
        return { currentBoard: null };
      } else {
        // Find task in old col and remove it
        let taskToMove: any;
        board.columns = board.columns?.map((column) => {
          if (column?.tasks?.some((task) => task.taskId === taskId)) {
            taskToMove = column.tasks.find((task) => task.taskId === taskId);
            column.tasks = column.tasks.filter(
              (task) => task.taskId !== taskId,
            );
          }
          return column;
        });

        // Add task to new column
        if (taskToMove) {
          board.columns = board.columns?.map((column) => {
            if (column?.columnId === newColumnId) {
              column.tasks?.push(taskToMove);
            }
            return column;
          });
        }
        return { currentBoard: board };
      }
    }),
}));

export default useBoardStore;
