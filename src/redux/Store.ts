import { combineReducers, configureStore } from "@reduxjs/toolkit";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import boardSlice from "./slices/boardSlice";
import showNewBoardSlice from "./slices/showNearBoard";
import activeBoardSlice from "./slices/activeBoardSlice";
import hideSidebarSlice from "./slices/hideSidebarSlice";
import showEditBoardSlice from "./slices/showEditBoardSlice";
import showAddTaskModalSlice from "./slices/showAddTaskModal";
const rootReducer = combineReducers({
  boardSlice: boardSlice,
  showNewBoardSlice: showNewBoardSlice,
  activeBoardSlice: activeBoardSlice,
  hideSidebarSlice: hideSidebarSlice,
  showEditBoardSlice: showEditBoardSlice,
  showAddTaskModalSlice: showAddTaskModalSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const persistor = persistStore(store);

//persistor.purge();
