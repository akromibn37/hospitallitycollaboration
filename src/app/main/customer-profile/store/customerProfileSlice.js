import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomerProfileData = createAsyncThunk(
  'customerProfilesApp/customerProfile/getCustomerProfileData',
  async () => {
    const response = await axios.get('/api/customerProfiles-app/customerProfile');
    const data = await response.data;
    return data;
  }
);

const customerProfileSlice = createSlice({
  name: 'customerProfilesApp/customerProfile',
  initialState: {},
  reducers: {},
  extraReducers: {
    [getCustomerProfileData.fulfilled]: (state, action) => action.payload,
  },
});

export default customerProfileSlice.reducer;
