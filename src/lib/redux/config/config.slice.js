import { createSlice } from '@reduxjs/toolkit';
import { fetchBookingConfigs } from './config.thunks';

const initialState = {
  bookingConfigs: {},
  isModalOpen: false,
  initialized: false,
  theme: 'light',
  language: 'en',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    // Booking Configuration
    setBookingConfigs: (state, action) => {
      state.bookingConfigs = action.payload;
    },
    updateBookingConfig: (state, action) => {
      state.bookingConfigs[action.payload.key] = action.payload.value;
    },

    // UI State
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },

    // Theme
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },

    // Language
    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    // Initialization
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookingConfigs.fulfilled, (state, action) => {
      // Convert any Moment.js date objects to ISO strings
      const sanitizedPayload = JSON.parse(JSON.stringify(action.payload));
      state.bookingConfigs = sanitizedPayload;
    });
    builder.addCase(fetchBookingConfigs.pending, (state) => {
      state.initialized = false;
    });
    builder.addCase(fetchBookingConfigs.rejected, (state) => {
      state.initialized = false;
    });
  },
});

export const {
  setBookingConfigs,
  updateBookingConfig,
  toggleModal,
  setModalOpen,
  setTheme,
  toggleTheme,
  setLanguage,
  setInitialized,
} = configSlice.actions;

export default configSlice.reducer;

export { fetchBookingConfigs };
