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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
