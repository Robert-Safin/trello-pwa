import {combineReducers, configureStore} from '@reduxjs/toolkit';
import showSidebar from './stores/HideSidebar';
import selectedBoardName from './stores/SelectedBoardName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';



const rootReducer = combineReducers({
  showSidebar: showSidebar,
  selectedBoardName: selectedBoardName,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export type RootState = ReturnType<typeof store.getState>;


export default store;

export const persistor = persistStore(store);
