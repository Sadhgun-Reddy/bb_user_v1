import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunks
export const fetchMenu = createAsyncThunk('menu/fetchMenu', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/menu');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch the menu.');
    }
});

export const addDish = createAsyncThunk('menu/addDish', async (newDish, { rejectWithValue }) => {
    try {
        const response = await api.post('/menu', newDish);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to add the dish.');
    }
});

export const updateDish = createAsyncThunk(
    'menu/updateDish',
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/menu/${id}`, updates);
            return response.data; // Should return the updated dish
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update the dish.');
        }
    }
);

export const deleteDish = createAsyncThunk('menu/deleteDish', async (id, { rejectWithValue }) => {
    try {
        await api.delete(`/menu/${id}`);
        return id; // Return the ID so we can remove it from the state
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed to delete the dish.');
    }
});

const initialState = {
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
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Add Dish
            .addCase(addDish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addDish.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(addDish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update Dish
            .addCase(updateDish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateDish.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateDish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete Dish
            .addCase(deleteDish.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteDish.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteDish.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { clearMenuError } = menuSlice.actions;
export default menuSlice.reducer;
