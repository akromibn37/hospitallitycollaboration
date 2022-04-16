import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Constant from '../../../Constant';

export const getUsers = createAsyncThunk('customerServicesApp/users/getUsers', async () => {
  const response = await axios.get(`${Constant.BASE_URL}/api/v1/user/get/all`);
  const data = await response.data.data.data;

  return data;
});

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUserById } = usersAdapter.getSelectors(
  (state) => state.customerServicesApp.users
);

const userSlice = createSlice({
  name: 'customerServicesApp/users',
  initialState: usersAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getUsers.fulfilled]: usersAdapter.setAll,
  },
});

export default userSlice.reducer;
