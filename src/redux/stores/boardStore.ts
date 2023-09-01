import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type Task = {
  taskName: string;
  taskDescription: string;
  isCompleted: boolean;
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
  },
});

export const { addBoard } = boardStore.actions;

export default boardStore.reducer;
