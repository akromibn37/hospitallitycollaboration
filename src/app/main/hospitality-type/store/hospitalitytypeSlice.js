import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHospitalitytypeData = createAsyncThunk(
  'hospitalitytypesApp/hospitalitytype/getHospitalitytypeData',
  async () => {
    const response = await axios.get('/api/hospitalitytypes-app/hospitalitytype');
    const data = await response.data;
    return data;
  }
);

const hospitalitytypeSlice = createSlice({
  name: 'hospitalitytypesApp/hospitalitytype',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getHospitalitytypeData.fulfilled]: (state, action) => action.payload,
  },
});

export default hospitalitytypeSlice.reducer;
