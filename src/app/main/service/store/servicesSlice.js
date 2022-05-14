import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getServiceData } from './serviceSlice';
import * as Constant from '../../../Constant';

export const getServices = createAsyncThunk(
  'servicesApp/services/getServices',
  async (routeParams, { getState }) => {
    console.log('routeParams:', routeParams);
    routeParams = routeParams || getState().servicesApp.services.routeParams;
    const response = await axios.get(`${Constant.BASE_URL}/api/v1/service/get/all`);
    const data = await response.data.data.Detail;
    console.log('service response:', response);

    return { data, routeParams };
  }
);

export const addService = createAsyncThunk(
  'servicesApp/services/addService',
  async (service, { dispatch, getState }) => {
    const response = await axios.post(`${Constant.BASE_URL}/api/v1/service/create`, service);
    const data = await response.data;

    dispatch(getServices());

    return data;
  }
);

export const updateService = createAsyncThunk(
  'servicesApp/services/updateService',
  async (service, { dispatch, getState }) => {
    const response = await axios.post(`${Constant.BASE_URL}/api/v1/service/update`, service);
    const data = await response.data;

    dispatch(getServices());

    return data;
  }
);

export const removeService = createAsyncThunk(
  'servicesApp/services/removeService',
  async (serviceId, { dispatch, getState }) => {
    await axios.post(`${Constant.BASE_URL}/api/v1/service/delete`, { id: serviceId });

    return serviceId;
  }
);

export const removeServices = createAsyncThunk(
  'servicesApp/services/removeServices',
  async (serviceIds, { dispatch, getState }) => {
    await axios.post('/api/services-app/remove-services', { serviceIds });

    return serviceIds;
  }
);

export const toggleStarredService = createAsyncThunk(
  'servicesApp/services/toggleStarredService',
  async (serviceId, { dispatch, getState }) => {
    const response = await axios.post('/api/services-app/toggle-starred-service', {
      serviceId,
    });
    const data = await response.data;

    dispatch(getServiceData());

    dispatch(getServices());

    return data;
  }
);

export const toggleStarredServices = createAsyncThunk(
  'servicesApp/services/toggleStarredServices',
  async (serviceIds, { dispatch, getState }) => {
    const response = await axios.post('/api/services-app/toggle-starred-services', {
      serviceIds,
    });
    const data = await response.data;

    dispatch(getServiceData());

    dispatch(getServices());

    return data;
  }
);

export const setServicesStarred = createAsyncThunk(
  'servicesApp/services/setServicesStarred',
  async (serviceIds, { dispatch, getState }) => {
    const response = await axios.post('/api/services-app/set-services-starred', {
      serviceIds,
    });
    const data = await response.data;

    dispatch(getServiceData());

    dispatch(getServices());

    return data;
  }
);

export const setServicesUnstarred = createAsyncThunk(
  'servicesApp/services/setServicesUnstarred',
  async (serviceIds, { dispatch, getState }) => {
    const response = await axios.post('/api/services-app/set-services-unstarred', {
      serviceIds,
    });
    const data = await response.data;

    dispatch(getServiceData());

    dispatch(getServices());

    return data;
  }
);

const servicesAdapter = createEntityAdapter({});

export const { selectAll: selectServices, selectById: selectServicesById } =
  servicesAdapter.getSelectors((state) => state.servicesApp.services);

const servicesSlice = createSlice({
  name: 'servicesApp/services',
  initialState: servicesAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    serviceDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setServicesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    openNewServiceDialog: (state, action) => {
      state.serviceDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewServiceDialog: (state, action) => {
      state.serviceDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditServiceDialog: (state, action) => {
      state.serviceDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditServiceDialog: (state, action) => {
      state.serviceDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateService.fulfilled]: servicesAdapter.upsertOne,
    [addService.fulfilled]: servicesAdapter.addOne,
    [removeServices.fulfilled]: (state, action) =>
      servicesAdapter.removeMany(state, action.payload),
    [removeService.fulfilled]: (state, action) => servicesAdapter.removeOne(state, action.payload),
    [getServices.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      servicesAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
  },
});

export const {
  setServicesSearchText,
  openNewServiceDialog,
  closeNewServiceDialog,
  openEditServiceDialog,
  closeEditServiceDialog,
} = servicesSlice.actions;

export default servicesSlice.reducer;
