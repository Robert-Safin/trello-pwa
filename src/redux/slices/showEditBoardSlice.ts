import { createSlice } from "@reduxjs/toolkit";
export interface showEditModalState {
  showModal: boolean;
}

const initialState: showEditModalState = {
  showModal: false,
};

const showEditBoardSlice = createSlice({
  name: "showEditBoardSlice",
  initialState,
  reducers: {
    toggleEditBoardModal: (state) => {
      state.showModal = !state.showModal;
    }
  },
});

export const { toggleEditBoardModal } = showEditBoardSlice.actions;

export default showEditBoardSlice.reducer;
