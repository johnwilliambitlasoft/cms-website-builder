import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '@/services/api/axios.Instance'; // Adjust the import path as necessary

// Initial state
const initialState = {
  value: 0,
  status: 'idle',
  error: null,
};

// Async thunk for fetching counter value from an API
export const fetchCounterValue = createAsyncThunk(
  'counter/fetchCounterValue',
  async (_, { rejectWithValue }) => {
    try {
      // This is a mock API call, replace with your actual endpoint
      // const response = await apiService.get('/counter');
      
      // For demo purposes, simulating an API response
      return await new Promise(resolve => {
        setTimeout(() => resolve({ value: Math.floor(Math.random() * 100) }), 500);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the counter slice
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // Reducers define how the state can be updated
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
  // Extra reducers for handling async thunk states
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounterValue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCounterValue.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload.value;
      })
      .addCase(fetchCounterValue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export selectors
export const selectCount = (state) => state.counter.value;
export const selectCounterStatus = (state) => state.counter.status;
export const selectCounterError = (state) => state.counter.error;

// Export reducer
export default counterSlice.reducer;
