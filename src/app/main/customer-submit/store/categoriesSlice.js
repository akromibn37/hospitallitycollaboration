import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Constant from '../../../Constant';

export const getCategories = createAsyncThunk('submitApp/categories/getCategories', async () => {
  const response = await axios.get(`${Constant.BASE_URL}/api/v1/service/get/all`);
  const data = await response.data.data.Detail;

  return data;
});

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoryById } =
  categoriesAdapter.getSelectors((state) => state.submitApp.categories);

const categorySlice = createSlice({
  name: 'submitApp/categories',
  initialState: categoriesAdapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: categoriesAdapter.setAll,
  },
});

export default categorySlice.reducer;
