import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getServiceData = createAsyncThunk('servicesApp/service/getServiceData', async () => {
  const response = await axios.get('/api/services-app/service');
  const data = await response.data;
  return data;
});

const serviceSlice = createSlice({
  name: 'servicesApp/service',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getServiceData.fulfilled]: (state, action) => action.payload,
  },
});

export default serviceSlice.reducer;
