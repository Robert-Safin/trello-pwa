import {combineReducers, configureStore} from '@reduxjs/toolkit';

import Theme from './Theme';



const rootReducer = combineReducers({
  theme: Theme,
});



const store = configureStore({
  reducer: rootReducer,
});



export default store;
