import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Constant from '../../../Constant';

export const getHospitalitys = createAsyncThunk(
  'customerServicesApp/hospitalitys/getHospitalitys',
  async () => {
    const response = await axios.get(`${Constant.BASE_URL}/api/v1/hospitality/get/all`);
    const data = await response.data.data.Detail;

    return data;
  }
);

const hospitalitysAdapter = createEntityAdapter({});

export const { selectAll: selectHospitalitys, selectById: selectHospitalityById } =
  hospitalitysAdapter.getSelectors((state) => state.customerServicesApp.hospitalitys);

const hospitalitySlice = createSlice({
  name: 'customerServicesApp/hospitalitys',
  initialState: hospitalitysAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getHospitalitys.fulfilled]: hospitalitysAdapter.setAll,
  },
});

export default hospitalitySlice.reducer;
