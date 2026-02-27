import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';
import { MenuState, Dish } from '../../types';

// Async Thunks
export const fetchMenu = createAsyncThunk<Dish[], void>('menu/fetchMenu', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/menu');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch the menu.');
  }
});

export const addDish = createAsyncThunk<Dish, any>('menu/addDish', async (newDish, { rejectWithValue }) => {
  try {
    const response = await api.post('/menu', newDish);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to add the dish.');
  }
});

export const updateDish = createAsyncThunk<Dish, { id: string; updates: any }>(
  'menu/updateDish',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/menu/${id}`, updates);
      return response.data; // Should return the updated dish
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update the dish.');
    }
  }
);

export const deleteDish = createAsyncThunk<string, string>('menu/deleteDish', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/menu/${id}`);
    return id; // Return the ID so we can remove it from the state
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete the dish.');
  }
});

const initialState: MenuState = {
  items: [],
  isLoading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearMenuError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Menu
      .addCase(fetchMenu.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action: PayloadAction<Dish[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Add Dish
      .addCase(addDish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addDish.fulfilled, (state, action: PayloadAction<Dish>) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addDish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Dish
      .addCase(updateDish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDish.fulfilled, (state, action: PayloadAction<Dish>) => {
        state.isLoading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Dish
      .addCase(deleteDish.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDish.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteDish.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;
