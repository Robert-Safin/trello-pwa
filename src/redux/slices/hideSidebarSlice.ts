import { createSlice } from "@reduxjs/toolkit";
export interface HideSidebarState {
  sidebarIsShown: boolean;
}

const initialState: HideSidebarState = {
  sidebarIsShown: true,
};

const hideSidebarSlice = createSlice({
  name: "hideSidebarSlice",
  initialState,
  reducers: {
    toggleHideSidebar: (state) => {
      state.sidebarIsShown = !state.sidebarIsShown;
    }
  },
});

export const { toggleHideSidebar } = hideSidebarSlice.actions;

export default hideSidebarSlice.reducer;
