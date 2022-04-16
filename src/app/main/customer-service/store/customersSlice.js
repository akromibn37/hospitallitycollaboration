import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Constant from '../../../Constant';

export const getCustomers = createAsyncThunk(
  'customerServicesApp/customers/getCustomers',
  async () => {
    const response = await axios.get(`${Constant.BASE_URL}/api/v1/customer/profile/get/all`);
    const data = await response.data.data.Detail;
    console.log('response:', response);

    return data;
  }
);

const customersAdapter = createEntityAdapter({});

export const { selectAll: selectCustomers, selectById: selectUserById } =
  customersAdapter.getSelectors((state) => state.customerServicesApp.customers);

const customerSlice = createSlice({
  name: 'customerServicesApp/customers',
  initialState: customersAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getCustomers.fulfilled]: customersAdapter.setAll,
  },
});

export default customerSlice.reducer;
