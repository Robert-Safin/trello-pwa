import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AddTaskPayload = {
  task: Task;
  columnName: string;
  boardName: string;
};

export type SubTask= {
  subTaskName: string;
  subTaskDescription: string;
  isCompleted: boolean;
}

export type Task = {
  taskName: string;
  taskDescription: string;
  boardName: string;
  subTasks: SubTask[];
};

export type Column = {
  columnName: string;
  tasks: Task[];
};

export type Board = {
  boardName: string;
  boardColumns: Column[];
};

export type BoardState = {
  boards: Board[];
};

const initialState: BoardState = {
  boards: [],
};

const boardStore = createSlice({
  name: "boardStore",
  initialState: initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
    },
    updateBoard: (state, action: PayloadAction<Board>) => {
      const index = state.boards.findIndex(
        (board) => board.boardName === action.payload.boardName
      );
      state.boards[index] = action.payload;
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      const index = state.boards.findIndex(
        (board) => board.boardName === action.payload
      );
      state.boards.splice(index, 1);
    },
    addTask: (state, action: PayloadAction<AddTaskPayload>) => {
      const index = state.boards.findIndex(
        (board) => board.boardName === action.payload.boardName
      );
      const column = state.boards[index].boardColumns.find(
        (col) => col.columnName === action.payload.columnName
      );
      if (column) {
        column.tasks.push(action.payload.task);
      }
    },
  },
});

export const { addBoard, updateBoard, deleteBoard, addTask } = boardStore.actions;

export default boardStore.reducer;
