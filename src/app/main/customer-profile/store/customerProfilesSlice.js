import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCustomerProfileData } from './customerProfileSlice';
import * as Constant from '../../../Constant';

export const getCustomerProfiles = createAsyncThunk(
  'customerProfilesApp/customerProfiles/getCustomerProfiles',
  async (routeParams, { getState }) => {
    console.log('routeParams:', routeParams);
    routeParams = routeParams || getState().customerProfilesApp.customerProfiles.routeParams;
    const response = await axios.get(`${Constant.BASE_URL}/api/v1/customer/profile/get/all`);
    const data = await response.data.data.Detail;
    console.log('Data:', data);

    return { data, routeParams };
  }
);

export const addCustomerProfile = createAsyncThunk(
  'customerProfilesApp/customerProfiles/addCustomerProfile',
  async (customerProfile, { dispatch, getState }) => {
    console.log('customerProfile:', customerProfile);
    const response = await axios.post(
      `${Constant.BASE_URL}/customer/profile/create`,
      customerProfile
    );
    const data = await response.data;

    dispatch(getCustomerProfiles());

    return data;
  }
);

export const updateCustomerProfile = createAsyncThunk(
  'customerProfilesApp/customerProfiles/updateCustomerProfile',
  async (customerProfile, { dispatch, getState }) => {
    console.log('customerProfile:', customerProfile);
    const response = await axios.post(
      `${Constant.BASE_URL}/api/v1/customer/profile/update`,
      customerProfile
    );
    const data = await response.data;

    dispatch(getCustomerProfiles());

    return data;
  }
);

export const removeCustomerProfile = createAsyncThunk(
  'customerProfilesApp/customerProfiles/removeCustomerProfile',
  async (customerProfileId, { dispatch, getState }) => {
    await axios.post('/api/customerProfiles-app/remove-customerProfile', { customerProfileId });

    return customerProfileId;
  }
);

export const removeCustomerProfiles = createAsyncThunk(
  'customerProfilesApp/customerProfiles/removeCustomerProfiles',
  async (customerProfileIds, { dispatch, getState }) => {
    await axios.post('/api/customerProfiles-app/remove-customerProfiles', { customerProfileIds });

    return customerProfileIds;
  }
);

export const toggleStarredCustomerProfile = createAsyncThunk(
  'customerProfilesApp/customerProfiles/toggleStarredCustomerProfile',
  async (customerProfileId, { dispatch, getState }) => {
    const response = await axios.post('/api/customerProfiles-app/toggle-starred-customerProfile', {
      customerProfileId,
    });
    const data = await response.data;

    dispatch(getCustomerProfileData());

    dispatch(getCustomerProfiles());

    return data;
  }
);

export const toggleStarredCustomerProfiles = createAsyncThunk(
  'customerProfilesApp/customerProfiles/toggleStarredCustomerProfiles',
  async (customerProfileIds, { dispatch, getState }) => {
    const response = await axios.post('/api/customerProfiles-app/toggle-starred-customerProfiles', {
      customerProfileIds,
    });
    const data = await response.data;

    dispatch(getCustomerProfileData());

    dispatch(getCustomerProfiles());

    return data;
  }
);

export const setCustomerProfilesStarred = createAsyncThunk(
  'customerProfilesApp/customerProfiles/setCustomerProfilesStarred',
  async (customerProfileIds, { dispatch, getState }) => {
    const response = await axios.post('/api/customerProfiles-app/set-customerProfiles-starred', {
      customerProfileIds,
    });
    const data = await response.data;

    dispatch(getCustomerProfileData());

    dispatch(getCustomerProfiles());

    return data;
  }
);

export const setCustomerProfilesUnstarred = createAsyncThunk(
  'customerProfilesApp/customerProfiles/setCustomerProfilesUnstarred',
  async (customerProfileIds, { dispatch, getState }) => {
    const response = await axios.post('/api/customerProfiles-app/set-customerProfiles-unstarred', {
      customerProfileIds,
    });
    const data = await response.data;

    dispatch(getCustomerProfileData());

    dispatch(getCustomerProfiles());

    return data;
  }
);

const customerProfilesAdapter = createEntityAdapter({});

export const { selectAll: selectCustomerProfiles, selectById: selectCustomerProfilesById } =
  customerProfilesAdapter.getSelectors((state) => state.customerProfilesApp.customerProfiles);

const customerProfilesSlice = createSlice({
  name: 'customerProfilesApp/customerProfiles',
  initialState: customerProfilesAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    customerProfileDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setCustomerProfilesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    openNewCustomerProfileDialog: (state, action) => {
      state.customerProfileDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewCustomerProfileDialog: (state, action) => {
      state.customerProfileDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditCustomerProfileDialog: (state, action) => {
      state.customerProfileDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditCustomerProfileDialog: (state, action) => {
      state.customerProfileDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateCustomerProfile.fulfilled]: customerProfilesAdapter.upsertOne,
    [addCustomerProfile.fulfilled]: customerProfilesAdapter.addOne,
    [removeCustomerProfiles.fulfilled]: (state, action) =>
      customerProfilesAdapter.removeMany(state, action.payload),
    [removeCustomerProfile.fulfilled]: (state, action) =>
      customerProfilesAdapter.removeOne(state, action.payload),
    [getCustomerProfiles.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      customerProfilesAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
  },
});

export const {
  setCustomerProfilesSearchText,
  openNewCustomerProfileDialog,
  closeNewCustomerProfileDialog,
  openEditCustomerProfileDialog,
  closeEditCustomerProfileDialog,
} = customerProfilesSlice.actions;

export default customerProfilesSlice.reducer;
