import { createSlice } from "@reduxjs/toolkit";
export interface ShowNewBoardState {
  showModal: boolean;
}

const initialState: ShowNewBoardState = {
  showModal: false,
};

const showNewBoardSlice = createSlice({
  name: "showNewBoardSlice",
  initialState,
  reducers: {
    toggleShowNewBoard: (state) => {
      state.showModal = !state.showModal;
    },
  },
});

export const { toggleShowNewBoard } = showNewBoardSlice.actions;

export default showNewBoardSlice.reducer;
