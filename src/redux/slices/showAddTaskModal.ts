import { createSlice } from "@reduxjs/toolkit";
export interface showAddTaskModalState {
  showModal: boolean;
}

const initialState: showAddTaskModalState = {
  showModal: false,
};

const showAddTaskModalSlice = createSlice({
  name: "showAddTaskModalSlice",
  initialState,
  reducers: {
    toggleAddTaskModal: (state) => {
      state.showModal = !state.showModal;
    }
  },
});

export const { toggleAddTaskModal } = showAddTaskModalSlice.actions;

export default showAddTaskModalSlice.reducer;
