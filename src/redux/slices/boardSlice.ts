import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SubTask {
  objective: string;
  isCompleted: boolean;
}

export interface Task {
  name: string;
  description: string;
  subTasks: SubTask[];
  status: Column;
}

export interface Column {
  name: string;
  tasks: Task[];
}

export interface Board {
  name: string;
  columns: Column[];
}

export interface BoardState {
  boards: Board[];
}

const initialState: BoardState = {
  boards: [],
};

const boardSlice = createSlice({
  name: "boardSlice",
  initialState,
  reducers: {
    // Board actions
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter(
        (board) => board.name !== action.payload
      );
    },
    renameBoard: (
      state,
      action: PayloadAction<{ oldName: string; newName: string }>
    ) => {
      const board = state.boards.find(
        (board) => board.name === action.payload.oldName
      );
      if (board) {
        board.name = action.payload.newName;
      }
    },

    // Column actions
    addColumn: (
      state,
      action: PayloadAction<{ boardName: string; column: Column }>
    ) => {
      const board = state.boards.find(
        (board) => board.name === action.payload.boardName
      );
      if (board) {
        board.columns.push(action.payload.column);
      }
    },
    deleteColumn: (
      state,
      action: PayloadAction<{ boardName: string; columnName: string }>
    ) => {
      const board = state.boards.find(
        (board) => board.name === action.payload.boardName
      );
      if (board) {
        board.columns = board.columns.filter(
          (col) => col.name !== action.payload.columnName
        );
      }
    },
    renameColumn: (
      state,
      action: PayloadAction<{
        boardName: string;
        oldName: string;
        newName: string;
      }>
    ) => {
      const board = state.boards.find(
        (board) => board.name === action.payload.boardName
      );
      if (board) {
        const column = board.columns.find(
          (col) => col.name === action.payload.oldName
        );
        if (column) {
          column.name = action.payload.newName;
        }
      }
    },

    // Task actions
    addTask: (
      state,
      action: PayloadAction<{
        boardName: string;
        columnName: string;
        task: Task;
      }>
    ) => {
      const board = state.boards.find(
        (board) => board.name === action.payload.boardName
      );
      if (board) {
        const column = board.columns.find(
          (col) => col.name === action.payload.columnName
        );
        if (column) {
          column.tasks.push(action.payload.task);
        }
      }
    },
    deleteTask: (
      state,
      action: PayloadAction<{
        boardName: string;
        columnName: string;
        taskName: string;
      }>
    ) => {

      const board = state.boards.find(
        (board) => board.name === action.payload.boardName
      );
      if (board) {
        const column = board.columns.find(
          (col) => col.name === action.payload.columnName
        );
        if (column) {
          column.tasks = column.tasks.filter(
            (task) => task.name !== action.payload.taskName
          );
        }
      }

    },
    updateTask: (
      state,
      action: PayloadAction<{
        boardName: string;
        columnName: string;
        oldTaskName: string;
        newTask: Task;
      }>
    ) => {

      const board = state.boards.find(
        (board) => board.name === action.payload.boardName
      );
      if (board) {
        const column = board.columns.find(
          (col) => col.name === action.payload.columnName
        );
        if (column) {
          const task = column.tasks.find(
            (task) => task.name === action.payload.oldTaskName
          );
          if (task) {
            task.name = action.payload.newTask.name;
            task.description = action.payload.newTask.description;
            task.status = action.payload.newTask.status;
            task.subTasks = action.payload.newTask.subTasks;
          }
        }
      }

    },
    moveTask: (
      state,
      action: PayloadAction<{
        boardName: string;
        columnName: string;
        taskName: string;
        newColumnName: string;
      }>
    ) => {
      // move task to another column
      //console.log(action.payload);

      const board = state.boards.find(
        (board) => board.name === action.payload.boardName
      );

      if (board) {
        const column = board.columns.find(
          (col) => col.name === action.payload.columnName
        );

        if (column) {
          const task = column.tasks.find(
            (task) => task.name === action.payload.taskName
          );

          if (task) {
            const newColumn = board.columns.find(
              (col) => col.name === action.payload.newColumnName
            );

            if (newColumn) {
              newColumn.tasks.push(task);
              column.tasks = column.tasks.filter(
                (task) => task.name !== action.payload.taskName
              );
            }
          }
        }
      }
    },

    // Subtask actions
    addSubTask: (
      state,
      action: PayloadAction<{
        boardName: string;
        columnName: string;
        taskName: string;
        subTask: SubTask;
      }>
    ) => {
      // Your logic here to add a subtask
    },
    deleteSubTask: (
      state,
      action: PayloadAction<{
        boardName: string;
        columnName: string;
        taskName: string;
        objective: string;
      }>
    ) => {
      // Your logic here to delete a subtask
    },
    toggleSubTask: (
      state,
      action: PayloadAction<{
        boardName: string;
        columnName: string;
        taskName: string;
        objective: string;
      }>
    ) => {

      console.log(action.payload);

      const board = state.boards.find(
        (board) => board.name === action.payload.boardName
      );
      if (board) {
        const column = board.columns.find(
          (col) => col.name === action.payload.columnName
        );
        if (column) {
          const task = column.tasks.find(
            (task) => task.name === action.payload.taskName
          );
          if (task) {
            const subTask = task.subTasks.find(
              (subTask) => subTask.objective === action.payload.objective
            );
            if (subTask) {
              subTask.isCompleted = !subTask.isCompleted;
            }
          }
        }
      }
    },
  },
});

export const {
  addBoard,
  deleteBoard,
  renameBoard,
  addColumn,
  deleteColumn,
  renameColumn,
  addTask,
  deleteTask,
  updateTask,
  moveTask,
  addSubTask,
  deleteSubTask,
  toggleSubTask,
} = boardSlice.actions;

export default boardSlice.reducer;
