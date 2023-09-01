import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type editBoardState = {
  showEditModal: boolean;
};

const initialState:editBoardState  = {
  showEditModal: false,
};
const showEditModal = createSlice({
  name: "showEditModal",
  initialState: initialState,
  reducers: {
    modalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.showEditModal = action.payload;
    },
  },
});

export const { modalIsOpen } = showEditModal.actions;

export default showEditModal.reducer;
