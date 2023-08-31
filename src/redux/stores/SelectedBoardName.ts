
// SelectedBoardName.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectedBoardNameState = {
  selectedBoardName: string;
};

const initialState: SelectedBoardNameState = {
  selectedBoardName: 'Please select a board',
};

const selectedBoardName = createSlice({
  name: "selectedBoardName",
  initialState,
  reducers: {
    updateSelectedBoardName: (state, action: PayloadAction<string>) => {
      state.selectedBoardName = action.payload;
    },
  },
});

export const { updateSelectedBoardName } = selectedBoardName.actions;

export default selectedBoardName.reducer;
