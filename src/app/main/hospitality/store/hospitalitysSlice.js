import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getHospitalityData } from './hospitalitySlice';
import * as Constant from '../../../Constant';

export const getHospitalitys = createAsyncThunk(
  'hospitalitysApp/hospitalitys/getHospitalitys',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().hospitalitysApp.hospitalitys.routeParams;
    const response = await axios.get(`${Constant.BASE_URL}/api/v1/hospitality/get/all`);
    const data = await response.data.data.Detail;

    return { data, routeParams };
  }
);

export const addHospitality = createAsyncThunk(
  'hospitalitysApp/hospitalitys/addHospitality',
  async (hospitality, { dispatch, getState }) => {
    const response = await axios.post(
      `${Constant.BASE_URL}/api/v1/hospitality/create`,
      hospitality
    );
    const data = await response.data;

    dispatch(getHospitalitys());

    return data;
  }
);

export const updateHospitality = createAsyncThunk(
  'hospitalitysApp/hospitalitys/updateHospitality',
  async (hospitality, { dispatch, getState }) => {
    const response = await axios.post(
      `${Constant.BASE_URL}/api/v1/hospitality/update`,
      hospitality
    );
    const data = await response.data;

    dispatch(getHospitalitys());

    return data;
  }
);

export const removeHospitality = createAsyncThunk(
  'hospitalitysApp/hospitalitys/removeHospitality',
  async (hospitalityId, { dispatch, getState }) => {
    await axios.post('/api/hospitalitys-app/remove-hospitality', { hospitalityId });

    return hospitalityId;
  }
);

export const removeHospitalitys = createAsyncThunk(
  'hospitalitysApp/hospitalitys/removeHospitalitys',
  async (hospitalityIds, { dispatch, getState }) => {
    await axios.post('/api/hospitalitys-app/remove-hospitalitys', { hospitalityIds });

    return hospitalityIds;
  }
);

export const toggleStarredHospitality = createAsyncThunk(
  'hospitalitysApp/hospitalitys/toggleStarredHospitality',
  async (hospitalityId, { dispatch, getState }) => {
    const response = await axios.post('/api/hospitalitys-app/toggle-starred-hospitality', {
      hospitalityId,
    });
    const data = await response.data;

    dispatch(getHospitalityData());

    dispatch(getHospitalitys());

    return data;
  }
);

export const toggleStarredHospitalitys = createAsyncThunk(
  'hospitalitysApp/hospitalitys/toggleStarredHospitalitys',
  async (hospitalityIds, { dispatch, getState }) => {
    const response = await axios.post('/api/hospitalitys-app/toggle-starred-hospitalitys', {
      hospitalityIds,
    });
    const data = await response.data;

    dispatch(getHospitalityData());

    dispatch(getHospitalitys());

    return data;
  }
);

export const setHospitalitysStarred = createAsyncThunk(
  'hospitalitysApp/hospitalitys/setHospitalitysStarred',
  async (hospitalityIds, { dispatch, getState }) => {
    const response = await axios.post('/api/hospitalitys-app/set-hospitalitys-starred', {
      hospitalityIds,
    });
    const data = await response.data;

    dispatch(getHospitalityData());

    dispatch(getHospitalitys());

    return data;
  }
);

export const setHospitalitysUnstarred = createAsyncThunk(
  'hospitalitysApp/hospitalitys/setHospitalitysUnstarred',
  async (hospitalityIds, { dispatch, getState }) => {
    const response = await axios.post('/api/hospitalitys-app/set-hospitalitys-unstarred', {
      hospitalityIds,
    });
    const data = await response.data;

    dispatch(getHospitalityData());

    dispatch(getHospitalitys());

    return data;
  }
);

const hospitalitysAdapter = createEntityAdapter({});

export const { selectAll: selectHospitalitys, selectById: selectHospitalitysById } =
  hospitalitysAdapter.getSelectors((state) => state.hospitalitysApp.hospitalitys);

const hospitalitysSlice = createSlice({
  name: 'hospitalitysApp/hospitalitys',
  initialState: hospitalitysAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    hospitalityDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setHospitalitysSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    openNewHospitalityDialog: (state, action) => {
      state.hospitalityDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewHospitalityDialog: (state, action) => {
      state.hospitalityDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditHospitalityDialog: (state, action) => {
      state.hospitalityDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditHospitalityDialog: (state, action) => {
      state.hospitalityDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateHospitality.fulfilled]: hospitalitysAdapter.upsertOne,
    [addHospitality.fulfilled]: hospitalitysAdapter.addOne,
    [removeHospitalitys.fulfilled]: (state, action) =>
      hospitalitysAdapter.removeMany(state, action.payload),
    [removeHospitality.fulfilled]: (state, action) =>
      hospitalitysAdapter.removeOne(state, action.payload),
    [getHospitalitys.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      hospitalitysAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
  },
});

export const {
  setHospitalitysSearchText,
  openNewHospitalityDialog,
  closeNewHospitalityDialog,
  openEditHospitalityDialog,
  closeEditHospitalityDialog,
} = hospitalitysSlice.actions;

export default hospitalitysSlice.reducer;
