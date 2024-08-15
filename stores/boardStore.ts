import { create } from "zustand";

// Type for a Subtask
export type Subtask = {
  id: string;
  title: string;
  isCompleted: boolean;
};

// Type for a Task
export type Task = {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
  status: string; // This can be "TODO", "DOING", or "DONE"
};

// Type for a Column
export type Column = {
  id: string;
  name: string;
  tasks: Task[];
};

// Type for a Board
export type Board = {
  id: string;
  name: string;
  columns: Column[];
};

// Example of how you might structure the data
const boards: Board[] = [
  {
    id: "board-1",
    name: "Platform Launch",
    columns: [
      {
        id: "column-1",
        name: "TODO",
        tasks: [
          {
            id: "task-1",
            title: "Build UI for onboarding flow",
            description:
              "Create the initial user interface for the onboarding process.",
            subtasks: [
              {
                id: "subtask-1",
                title: "Design wireframes",
                isCompleted: false,
              },
              {
                id: "subtask-2",
                title: "Develop UI components",
                isCompleted: false,
              },
            ],
            status: "TODO",
          },
          {
            id: "task-efkm",
            title: "Build UI for search",
            description: "Develop the search interface for the application.",
            subtasks: [
              {
                id: "subtask-3",
                title: "Research search patterns",
                isCompleted: false,
              },
            ],
            status: "TODO",
          },
          {
            id: "task-2",
            title: "Build UI for search",
            description: "Develop the search interface for the application.",
            subtasks: [
              {
                id: "subtask-3",
                title: "Research search patterns",
                isCompleted: false,
              },
            ],
            status: "TODO",
          },
          {
            id: "task-3",
            title: "Build UI for search",
            description: "Develop the search interface for the application.",
            subtasks: [
              {
                id: "subtask-3",
                title: "Research search patterns",
                isCompleted: false,
              },
            ],
            status: "TODO",
          },
          {
            id: "task-4",
            title: "Build UI for search",
            description: "Develop the search interface for the application.",
            subtasks: [
              {
                id: "subtask-3",
                title: "Research search patterns",
                isCompleted: false,
              },
            ],
            status: "TODO",
          },
          {
            id: "task-5",
            title: "Build UI for search",
            description: "Develop the search interface for the application.",
            subtasks: [
              {
                id: "subtask-3",
                title: "Research search patterns",
                isCompleted: false,
              },
            ],
            status: "TODO",
          },
        ],
      },
      {
        id: "column-2",
        name: "DOING",
        tasks: [
          {
            id: "task-3",
            title: "Design settings and search pages",
            description:
              "Design the settings and search pages with usability in mind.",
            subtasks: [
              {
                id: "subtask-4",
                title: "Create initial design",
                isCompleted: true,
              },
              { id: "subtask-5", title: "Gather feedback", isCompleted: false },
            ],
            status: "DOING",
          },
        ],
      },
      {
        id: "column-3",
        name: "DONE",
        tasks: [
          {
            id: "task-4",
            title: "Conduct 5 wireframe tests",
            description: "Test the wireframes with potential users.",
            subtasks: [
              {
                id: "subtask-6",
                title: "Prepare wireframes",
                isCompleted: true,
              },
              { id: "subtask-7", title: "Conduct tests", isCompleted: true },
            ],
            status: "DONE",
          },
        ],
      },
    ],
  },
  {
    id: "board-2",
    name: "Marketing Plan",
    columns: [
      // Columns and tasks for the Marketing Plan board
    ],
  },
];

type StoreProps = {
  boards: Board[];
  currentBoard: Board | null;
  setCurrentBoard: (board: Board) => void;
};

const useBoardStore = create<StoreProps>((set) => ({
  boards: boards,
  currentBoard: null,
  setCurrentBoard: (board) => set({ currentBoard: board }),
}));

export default useBoardStore;
