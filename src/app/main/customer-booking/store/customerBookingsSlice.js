import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCustomerBookingData } from './customerBookingSlice';
import * as Constant from '../../../Constant';

export const getCustomerBookings = createAsyncThunk(
  'customerBookingsApp/customerBookings/getCustomerBookings',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().customerBookingsApp.customerBookings.routeParams;
    const response = await axios.post(
      routeParams.id === 'all'
        ? `${Constant.BASE_URL}/api/v1/customer/booking/get/all`
        : `${Constant.BASE_URL}/api/v1/customer/booking/get`,
      routeParams
    );
    const data = await response.data.data.Detail;

    return { data, routeParams };
  }
);

export const addCustomerBooking = createAsyncThunk(
  'customerBookingsApp/customerBookings/addCustomerBooking',
  async (customerBooking, { dispatch, getState }) => {
    const response = await axios.post(
      `${Constant.BASE_URL}/api/v1/customer/booking/create`,
      customerBooking
    );
    const data = await response.data;

    dispatch(getCustomerBookings());

    return data;
  }
);

export const updateCustomerBooking = createAsyncThunk(
  'customerBookingsApp/customerBookings/updateCustomerBooking',
  async (customerBooking, { dispatch, getState }) => {
    const response = await axios.post(
      `${Constant.BASE_URL}/api/v1/customer/booking/update`,
      customerBooking
    );
    const data = await response.data;

    dispatch(getCustomerBookings());

    return data;
  }
);

export const removeCustomerBooking = createAsyncThunk(
  'customerBookingsApp/customerBookings/removeCustomerBooking',
  async (customerBookingId, { dispatch, getState }) => {
    await axios.post(`${Constant.BASE_URL}/api/v1/customer/booking/delete`, {
      id: customerBookingId,
    });

    return customerBookingId;
  }
);

export const removeCustomerBookings = createAsyncThunk(
  'customerBookingsApp/customerBookings/removeCustomerBookings',
  async (customerBookingIds, { dispatch, getState }) => {
    await axios.post('/api/customerBookings-app/remove-customerBookings', { customerBookingIds });

    return customerBookingIds;
  }
);

export const toggleStarredCustomerBooking = createAsyncThunk(
  'customerBookingsApp/customerBookings/toggleStarredCustomerBooking',
  async (customerBookingId, { dispatch, getState }) => {
    const response = await axios.post('/api/customerBookings-app/toggle-starred-customerBooking', {
      customerBookingId,
    });
    const data = await response.data;

    dispatch(getCustomerBookingData());

    dispatch(getCustomerBookings());

    return data;
  }
);

export const toggleStarredCustomerBookings = createAsyncThunk(
  'customerBookingsApp/customerBookings/toggleStarredCustomerBookings',
  async (customerBookingIds, { dispatch, getState }) => {
    const response = await axios.post('/api/customerBookings-app/toggle-starred-customerBookings', {
      customerBookingIds,
    });
    const data = await response.data;

    dispatch(getCustomerBookingData());

    dispatch(getCustomerBookings());

    return data;
  }
);

export const setCustomerBookingsStarred = createAsyncThunk(
  'customerBookingsApp/customerBookings/setCustomerBookingsStarred',
  async (customerBookingIds, { dispatch, getState }) => {
    const response = await axios.post('/api/customerBookings-app/set-customerBookings-starred', {
      customerBookingIds,
    });
    const data = await response.data;

    dispatch(getCustomerBookingData());

    dispatch(getCustomerBookings());

    return data;
  }
);

export const setCustomerBookingsUnstarred = createAsyncThunk(
  'customerBookingsApp/customerBookings/setCustomerBookingsUnstarred',
  async (customerBookingIds, { dispatch, getState }) => {
    const response = await axios.post('/api/customerBookings-app/set-customerBookings-unstarred', {
      customerBookingIds,
    });
    const data = await response.data;

    dispatch(getCustomerBookingData());

    dispatch(getCustomerBookings());

    return data;
  }
);

const customerBookingsAdapter = createEntityAdapter({});

export const { selectAll: selectCustomerBookings, selectById: selectCustomerBookingsById } =
  customerBookingsAdapter.getSelectors((state) => state.customerBookingsApp.customerBookings);

const customerBookingsSlice = createSlice({
  name: 'customerBookingsApp/customerBookings',
  initialState: customerBookingsAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    customerBookingDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setCustomerBookingsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    openNewCustomerBookingDialog: (state, action) => {
      state.customerBookingDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewCustomerBookingDialog: (state, action) => {
      state.customerBookingDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditCustomerBookingDialog: (state, action) => {
      state.customerBookingDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditCustomerBookingDialog: (state, action) => {
      state.customerBookingDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateCustomerBooking.fulfilled]: customerBookingsAdapter.upsertOne,
    [addCustomerBooking.fulfilled]: customerBookingsAdapter.addOne,
    [removeCustomerBookings.fulfilled]: (state, action) =>
      customerBookingsAdapter.removeMany(state, action.payload),
    [removeCustomerBooking.fulfilled]: (state, action) =>
      customerBookingsAdapter.removeOne(state, action.payload),
    [getCustomerBookings.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      customerBookingsAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
  },
});

export const {
  setCustomerBookingsSearchText,
  openNewCustomerBookingDialog,
  closeNewCustomerBookingDialog,
  openEditCustomerBookingDialog,
  closeEditCustomerBookingDialog,
} = customerBookingsSlice.actions;

export default customerBookingsSlice.reducer;
