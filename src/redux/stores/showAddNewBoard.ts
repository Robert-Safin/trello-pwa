import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type showAddNewBoardState = {
  showModal: boolean;
};

const initialState:showAddNewBoardState  = {
  showModal: false,
};

const showAddNewBoard = createSlice({
  name: "showAddNewBoard",
  initialState: initialState,
  reducers: {
    showModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
  },
});

export const { showModal } = showAddNewBoard.actions;

export default showAddNewBoard.reducer;
