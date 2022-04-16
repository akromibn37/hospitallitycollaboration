import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomerServiceData = createAsyncThunk(
  'customerServicesApp/customerService/getCustomerServiceData',
  async () => {
    const response = await axios.get('/api/customerServices-app/customerService');
    const data = await response.data;
    return data;
  }
);

const customerServiceSlice = createSlice({
  name: 'customerServicesApp/customerService',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getCustomerServiceData.fulfilled]: (state, action) => action.payload,
  },
});

export default customerServiceSlice.reducer;
