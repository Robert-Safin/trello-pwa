import {combineReducers, configureStore} from '@reduxjs/toolkit';
import showSidebar from './stores/HideSidebar';
import selectedBoardName from './stores/SelectedBoardName';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import boardStore from './stores/boardStore';
import showAddNewBoard from './stores/showAddNewBoard';



const rootReducer = combineReducers({
  showSidebar: showSidebar,
  selectedBoardName: selectedBoardName,
  boardStore: boardStore,
  showAddNewBoard: showAddNewBoard,
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

//persistor.purge();
