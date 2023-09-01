
// SelectedBoardName.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectedBoardNameState = {
  selectedBoardName: string;
};

export const initialState: SelectedBoardNameState = {
  selectedBoardName: 'Select Board',
};

const selectedBoardName = createSlice({
  name: "selectedBoardName",
  initialState,
  reducers: {
    updateSelectedBoardName: (state, action: PayloadAction<string>) => {
      state.selectedBoardName = action.payload;
    },
    resetToDefault: (state) => {
      state.selectedBoardName = initialState.selectedBoardName;
    },
  },
});

export const { updateSelectedBoardName,resetToDefault } = selectedBoardName.actions;

export default selectedBoardName.reducer;
