import { createSlice } from "@reduxjs/toolkit";
export interface activeBoardState {
  activeBoardName: string | null;
}

const initialState: activeBoardState = {
  activeBoardName: null,
};

const activeBoardSlice = createSlice({
  name: "activeBoardSlice",
  initialState,
  reducers: {
    setActiveBoardName: (state, action) => {
      state.activeBoardName = action.payload;
    },
  },
});

export const {setActiveBoardName} = activeBoardSlice.actions;

export default activeBoardSlice.reducer;
