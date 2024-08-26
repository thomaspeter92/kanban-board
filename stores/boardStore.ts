import { BoardById } from "@/data/types.BoardManager";
import { create } from "zustand";

type StoreProps = {
  currentBoard?: BoardById | null;
  setCurrentBoard: (board: BoardById | null) => void;
};

const useBoardStore = create<StoreProps>((set) => ({
  currentBoard: null,
  setCurrentBoard: (board) => set({ currentBoard: board }),
}));

export default useBoardStore;
