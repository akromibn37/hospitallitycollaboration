import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCustomerServiceData } from './customerServiceSlice';
import * as Constant from '../../../Constant';

export const getCustomerServices = createAsyncThunk(
  'customerServicesApp/customerServices/getCustomerServices',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().customerServicesApp.customerServices.routeParams;
    const response = await axios.get(`${Constant.BASE_URL}/api/v1/customer/service/get/all`);
    const data = await response.data.data.Detail;

    return { data, routeParams };
  }
);

export const addCustomerService = createAsyncThunk(
  'customerServicesApp/customerServices/addCustomerService',
  async (customerService, { dispatch, getState }) => {
    const response = await axios.post(
      `${Constant.BASE_URL}/api/v1/customer/service/create`,
      customerService
    );
    const data = await response.data;

    dispatch(getCustomerServices());

    return data;
  }
);

export const updateCustomerService = createAsyncThunk(
  'customerServicesApp/customerServices/updateCustomerService',
  async (customerService, { dispatch, getState }) => {
    const response = await axios.post(
      `${Constant.BASE_URL}/api/v1/customer/service/update`,
      customerService
    );
    const data = await response.data;

    dispatch(getCustomerServices());

    return data;
  }
);

export const removeCustomerService = createAsyncThunk(
  'customerServicesApp/customerServices/removeCustomerService',
  async (customerServiceId, { dispatch, getState }) => {
    await axios.post('/api/customerServices-app/remove-customerService', { customerServiceId });

    return customerServiceId;
  }
);

export const removeCustomerServices = createAsyncThunk(
  'customerServicesApp/customerServices/removeCustomerServices',
  async (customerServiceIds, { dispatch, getState }) => {
    await axios.post('/api/customerServices-app/remove-customerServices', { customerServiceIds });

    return customerServiceIds;
  }
);

export const toggleStarredCustomerService = createAsyncThunk(
  'customerServicesApp/customerServices/toggleStarredCustomerService',
  async (customerServiceId, { dispatch, getState }) => {
    const response = await axios.post('/api/customerServices-app/toggle-starred-customerService', {
      customerServiceId,
    });
    const data = await response.data;

    dispatch(getCustomerServiceData());

    dispatch(getCustomerServices());

    return data;
  }
);

export const toggleStarredCustomerServices = createAsyncThunk(
  'customerServicesApp/customerServices/toggleStarredCustomerServices',
  async (customerServiceIds, { dispatch, getState }) => {
    const response = await axios.post('/api/customerServices-app/toggle-starred-customerServices', {
      customerServiceIds,
    });
    const data = await response.data;

    dispatch(getCustomerServiceData());

    dispatch(getCustomerServices());

    return data;
  }
);

export const setCustomerServicesStarred = createAsyncThunk(
  'customerServicesApp/customerServices/setCustomerServicesStarred',
  async (customerServiceIds, { dispatch, getState }) => {
    const response = await axios.post('/api/customerServices-app/set-customerServices-starred', {
      customerServiceIds,
    });
    const data = await response.data;

    dispatch(getCustomerServiceData());

    dispatch(getCustomerServices());

    return data;
  }
);

export const setCustomerServicesUnstarred = createAsyncThunk(
  'customerServicesApp/customerServices/setCustomerServicesUnstarred',
  async (customerServiceIds, { dispatch, getState }) => {
    const response = await axios.post('/api/customerServices-app/set-customerServices-unstarred', {
      customerServiceIds,
    });
    const data = await response.data;

    dispatch(getCustomerServiceData());

    dispatch(getCustomerServices());

    return data;
  }
);

const customerServicesAdapter = createEntityAdapter({});

export const { selectAll: selectCustomerServices, selectById: selectCustomerServicesById } =
  customerServicesAdapter.getSelectors((state) => state.customerServicesApp.customerServices);

const customerServicesSlice = createSlice({
  name: 'customerServicesApp/customerServices',
  initialState: customerServicesAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    customerServiceDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setCustomerServicesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    openNewCustomerServiceDialog: (state, action) => {
      state.customerServiceDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewCustomerServiceDialog: (state, action) => {
      state.customerServiceDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditCustomerServiceDialog: (state, action) => {
      state.customerServiceDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditCustomerServiceDialog: (state, action) => {
      state.customerServiceDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateCustomerService.fulfilled]: customerServicesAdapter.upsertOne,
    [addCustomerService.fulfilled]: customerServicesAdapter.addOne,
    [removeCustomerServices.fulfilled]: (state, action) =>
      customerServicesAdapter.removeMany(state, action.payload),
    [removeCustomerService.fulfilled]: (state, action) =>
      customerServicesAdapter.removeOne(state, action.payload),
    [getCustomerServices.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      customerServicesAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
  },
});

export const {
  setCustomerServicesSearchText,
  openNewCustomerServiceDialog,
  closeNewCustomerServiceDialog,
  openEditCustomerServiceDialog,
  closeEditCustomerServiceDialog,
} = customerServicesSlice.actions;

export default customerServicesSlice.reducer;
