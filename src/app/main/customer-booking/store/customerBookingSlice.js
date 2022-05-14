import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomerBookingData = createAsyncThunk(
  'customerBookingsApp/customerBooking/getCustomerBookingData',
  async () => {
    const response = await axios.get('/api/customerBookings-app/customerBooking');
    const data = await response.data;
    return data;
  }
);

const customerBookingSlice = createSlice({
  name: 'customerBookingsApp/customerBooking',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getCustomerBookingData.fulfilled]: (state, action) => action.payload,
  },
});

export default customerBookingSlice.reducer;
