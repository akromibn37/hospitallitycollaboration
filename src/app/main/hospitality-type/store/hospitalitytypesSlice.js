import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getHospitalitytypeData } from './hospitalitytypeSlice';
import * as Constant from '../../../Constant';

export const getHospitalitytypes = createAsyncThunk(
  'hospitalitytypesApp/hospitalitytypes/getHospitalitytypes',
  async (routeParams, { getState }) => {
    console.log('routeParams:', routeParams);
    routeParams = routeParams || getState().hospitalitytypesApp.hospitalitytypes.routeParams;
    const response = await axios.get(`${Constant.BASE_URL}/api/v1/hospitality/type/get/all`);
    const data = await response.data.data.Detail;
    console.log('hospitalitytype response:', response);

    return { data, routeParams };
  }
);

export const addHospitalitytype = createAsyncThunk(
  'hospitalitytypesApp/hospitalitytypes/addHospitalitytype',
  async (hospitalitytype, { dispatch, getState }) => {
    console.log('hospitalitytype:', hospitalitytype);
    const response = await axios.post(
      `${Constant.BASE_URL}/api/v1/hospitality/type/create`,
      hospitalitytype
    );
    const data = await response.data;

    dispatch(getHospitalitytypes());

    return data;
  }
);

export const updateHospitalitytype = createAsyncThunk(
  'hospitalitytypesApp/hospitalitytypes/updateHospitalitytype',
  async (hospitalitytype, { dispatch, getState }) => {
    const response = await axios.post(
      `${Constant.BASE_URL}/api/v1/hospitality/type/update`,
      hospitalitytype
    );
    const data = await response.data;

    dispatch(getHospitalitytypes());

    return data;
  }
);

export const removeHospitalitytype = createAsyncThunk(
  'hospitalitytypesApp/hospitalitytypes/removeHospitalitytype',
  async (hospitalitytypeId, { dispatch, getState }) => {
    await axios.post(`${Constant.BASE_URL}/api/v1/hospitality/type/delete`, {
      id: hospitalitytypeId,
    });

    return hospitalitytypeId;
  }
);

export const removeHospitalitytypes = createAsyncThunk(
  'hospitalitytypesApp/hospitalitytypes/removeHospitalitytypes',
  async (hospitalitytypeIds, { dispatch, getState }) => {
    await axios.post('/api/hospitalitytypes-app/remove-hospitalitytypes', { hospitalitytypeIds });

    return hospitalitytypeIds;
  }
);

export const toggleStarredHospitalitytype = createAsyncThunk(
  'hospitalitytypesApp/hospitalitytypes/toggleStarredHospitalitytype',
  async (hospitalitytypeId, { dispatch, getState }) => {
    const response = await axios.post('/api/hospitalitytypes-app/toggle-starred-hospitalitytype', {
      hospitalitytypeId,
    });
    const data = await response.data;

    dispatch(getHospitalitytypeData());

    dispatch(getHospitalitytypes());

    return data;
  }
);

export const toggleStarredHospitalitytypes = createAsyncThunk(
  'hospitalitytypesApp/hospitalitytypes/toggleStarredHospitalitytypes',
  async (hospitalitytypeIds, { dispatch, getState }) => {
    const response = await axios.post('/api/hospitalitytypes-app/toggle-starred-hospitalitytypes', {
      hospitalitytypeIds,
    });
    const data = await response.data;

    dispatch(getHospitalitytypeData());

    dispatch(getHospitalitytypes());

    return data;
  }
);

export const setHospitalitytypesStarred = createAsyncThunk(
  'hospitalitytypesApp/hospitalitytypes/setHospitalitytypesStarred',
  async (hospitalitytypeIds, { dispatch, getState }) => {
    const response = await axios.post('/api/hospitalitytypes-app/set-hospitalitytypes-starred', {
      hospitalitytypeIds,
    });
    const data = await response.data;

    dispatch(getHospitalitytypeData());

    dispatch(getHospitalitytypes());

    return data;
  }
);

export const setHospitalitytypesUnstarred = createAsyncThunk(
  'hospitalitytypesApp/hospitalitytypes/setHospitalitytypesUnstarred',
  async (hospitalitytypeIds, { dispatch, getState }) => {
    const response = await axios.post('/api/hospitalitytypes-app/set-hospitalitytypes-unstarred', {
      hospitalitytypeIds,
    });
    const data = await response.data;

    dispatch(getHospitalitytypeData());

    dispatch(getHospitalitytypes());

    return data;
  }
);

const hospitalitytypesAdapter = createEntityAdapter({});

export const { selectAll: selectHospitalitytypes, selectById: selectHospitalitytypesById } =
  hospitalitytypesAdapter.getSelectors((state) => state.hospitalitytypesApp.hospitalitytypes);

const hospitalitytypesSlice = createSlice({
  name: 'hospitalitytypesApp/hospitalitytypes',
  initialState: hospitalitytypesAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    hospitalitytypeDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setHospitalitytypesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    openNewHospitalitytypeDialog: (state, action) => {
      state.hospitalitytypeDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewHospitalitytypeDialog: (state, action) => {
      state.hospitalitytypeDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditHospitalitytypeDialog: (state, action) => {
      state.hospitalitytypeDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditHospitalitytypeDialog: (state, action) => {
      state.hospitalitytypeDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateHospitalitytype.fulfilled]: hospitalitytypesAdapter.upsertOne,
    [addHospitalitytype.fulfilled]: hospitalitytypesAdapter.addOne,
    [removeHospitalitytypes.fulfilled]: (state, action) =>
      hospitalitytypesAdapter.removeMany(state, action.payload),
    [removeHospitalitytype.fulfilled]: (state, action) =>
      hospitalitytypesAdapter.removeOne(state, action.payload),
    [getHospitalitytypes.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      hospitalitytypesAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
  },
});

export const {
  setHospitalitytypesSearchText,
  openNewHospitalitytypeDialog,
  closeNewHospitalitytypeDialog,
  openEditHospitalitytypeDialog,
  closeEditHospitalitytypeDialog,
} = hospitalitytypesSlice.actions;

export default hospitalitytypesSlice.reducer;
