import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Constant from '../../../Constant';

export const getHospitalityData = createAsyncThunk(
  'hospitalitysApp/hospitality/getHospitalityData',
  async () => {
    const response = await axios.get('/api/hospitalitys-app/hospitality');
    const data = await response.data;
    return data;
  }
);

export const getHospitalityTypes = createAsyncThunk(
  'hospitalitysApp/hospitality/getHospitalityTypes',
  async () => {
    const response = await axios.get(`${Constant.BASE_URL}/api/v1/hospitality/type/get/all`);
    const data = await response.data.data.Detail;

    return data;
  }
);

const hospitalityAdapter = createEntityAdapter({});

export const { selectAll: selectHospitalitytypes, selectById: selectHospitalitytypesById } =
  hospitalityAdapter.getSelectors((state) => state.hospitalitysApp.hospitality);

const hospitalitySlice = createSlice({
  name: 'hospitalitysApp/hospitality',
  initialState: hospitalityAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getHospitalityTypes.fulfilled]: hospitalityAdapter.setAll,
    [getHospitalityData.fulfilled]: (state, action) => action.payload,
  },
});

export default hospitalitySlice.reducer;
