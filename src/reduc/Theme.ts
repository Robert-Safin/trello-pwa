import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};
const Theme = createSlice({
  name: "Theme",
  initialState: initialState,
  reducers: {
    updateTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { updateTheme } = Theme.actions;

export default Theme.reducer;
