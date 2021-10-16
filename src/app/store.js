import {configureStore} from '@reduxjs/toolkit';
import billReducer from '../features/billSlice';

// Initializing the Redux Store
export const store = configureStore({
  reducer: {
    bill: billReducer,
  },
});
