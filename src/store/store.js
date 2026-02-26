import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import menuReducer from './slices/menuSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    // Add other reducers here as the app grows
  },
});

export default store;
