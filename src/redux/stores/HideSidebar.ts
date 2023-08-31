import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type SelectedBoardNameState = {
  showSidebar: boolean;
};

const initialState:SelectedBoardNameState  = {
  showSidebar: false,
};
const showSidebar = createSlice({
  name: "showSidebar",
  initialState: initialState,
  reducers: {
    switchSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { switchSidebar } = showSidebar.actions;

export default showSidebar.reducer;
