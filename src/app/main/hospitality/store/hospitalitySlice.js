import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHospitalityData = createAsyncThunk(
  'hospitalitysApp/hospitality/getHospitalityData',
  async () => {
    const response = await axios.get('/api/hospitalitys-app/hospitality');
    const data = await response.data;
    return data;
  }
);

const hospitalitySlice = createSlice({
  name: 'hospitalitysApp/hospitality',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getHospitalityData.fulfilled]: (state, action) => action.payload,
  },
});

export default hospitalitySlice.reducer;
