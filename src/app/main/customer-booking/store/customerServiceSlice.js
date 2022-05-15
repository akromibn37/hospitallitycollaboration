import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Constant from '../../../Constant';

export const getCustomerServices = createAsyncThunk(
  'customerBookingsApp/customerServices/getCustomerServices',
  async () => {
    const response = await axios.get(`${Constant.BASE_URL}/api/v1/customer/service/get/all`);
    const data = await response.data.data.Detail;

    return data;
  }
);

const customerServicesAdapter = createEntityAdapter({});

export const { selectAll: selectCustomerServices, selectById: selectCustomerServiceById } =
  customerServicesAdapter.getSelectors((state) => state.customerBookingsApp.customerServices);

const customerServiceSlice = createSlice({
  name: 'customerBookingsApp/customerServices',
  initialState: customerServicesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getCustomerServices.fulfilled]: customerServicesAdapter.setAll,
  },
});

export default customerServiceSlice.reducer;
