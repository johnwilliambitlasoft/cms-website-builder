import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api/axios.Instance'; // Adjust the import path as necessary
export const fetchBookingConfigs = createAsyncThunk(
  'config/fetchBookingConfigs',
  async () => {
    const response = await api.post("/api/cms_booking_engine.json", {
      query: "q1",
    });
    return response.data;
  }
);
