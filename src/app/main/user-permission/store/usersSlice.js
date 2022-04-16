import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';
import * as Constant from '../../../Constant';

export const getUsers = createAsyncThunk(
  'usersPermission/users/getUsers',
  async (routeParams, { getState }) => {
    console.log('routeParams:', routeParams);
    routeParams = routeParams || getState().usersPermission.users.routeParams;
    const response = await axios.get(`${Constant.BASE_URL}/api/v1/user/get/all`, {});
    const data = await response.data.data.data;
    console.log('response:', response);
    console.log('data:', data);

    return { data, routeParams };
  }
);

export const addUser = createAsyncThunk(
  'usersPermission/users/addUser',
  async (user, { dispatch, getState }) => {
    console.log('user request:', user);
    const response = await axios.post(`${Constant.BASE_URL}/api/v1/user/create`, user);
    const data = await response.data;

    dispatch(getUsers());

    return data;
  }
);

export const updateUser = createAsyncThunk(
  'usersPermission/users/updateUser',
  async (user, { dispatch, getState }) => {
    console.log('input:', user);
    const response = await axios.post(`${Constant.BASE_URL}/api/v1/user/update/data`, user);
    const data = await response.data;

    dispatch(getUsers());

    return data;
  }
);

export const removeUser = createAsyncThunk(
  'usersPermission/users/removeUser',
  async (userId, { dispatch, getState }) => {
    await axios.post('/api/users-app/remove-user', { userId });

    return userId;
  }
);

export const removeUsers = createAsyncThunk(
  'usersPermission/users/removeUsers',
  async (userIds, { dispatch, getState }) => {
    await axios.post('/api/users-app/remove-users', { userIds });

    return userIds;
  }
);

export const toggleStarredUser = createAsyncThunk(
  'usersPermission/users/toggleStarredUser',
  async (userId, { dispatch, getState }) => {
    const response = await axios.post('/api/users-app/toggle-starred-user', { userId });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getUsers());

    return data;
  }
);

export const toggleStarredUsers = createAsyncThunk(
  'usersPermission/users/toggleStarredUsers',
  async (userIds, { dispatch, getState }) => {
    const response = await axios.post('/api/users-app/toggle-starred-users', { userIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getUsers());

    return data;
  }
);

export const setUsersStarred = createAsyncThunk(
  'usersPermission/users/setUsersStarred',
  async (userIds, { dispatch, getState }) => {
    const response = await axios.post('/api/users-app/set-users-starred', { userIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getUsers());

    return data;
  }
);

export const setUsersUnstarred = createAsyncThunk(
  'usersPermission/users/setUsersUnstarred',
  async (userIds, { dispatch, getState }) => {
    const response = await axios.post('/api/users-app/set-users-unstarred', { userIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getUsers());

    return data;
  }
);

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUsersById } = usersAdapter.getSelectors(
  (state) => state.usersPermission.users
);

const usersSlice = createSlice({
  name: 'usersPermission/users',
  initialState: usersAdapter.getInitialState({
    searchText: '',
    routeParams: {},
    userDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {
    setUsersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    openNewUserDialog: (state, action) => {
      state.userDialog = {
        type: 'new',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeNewUserDialog: (state, action) => {
      state.userDialog = {
        type: 'new',
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditUserDialog: (state, action) => {
      state.userDialog = {
        type: 'edit',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditUserDialog: (state, action) => {
      state.userDialog = {
        type: 'edit',
        props: {
          open: false,
        },
        data: null,
      };
    },
  },
  extraReducers: {
    [updateUser.fulfilled]: usersAdapter.upsertOne,
    [addUser.fulfilled]: usersAdapter.addOne,
    [removeUsers.fulfilled]: (state, action) => usersAdapter.removeMany(state, action.payload),
    [removeUser.fulfilled]: (state, action) => usersAdapter.removeOne(state, action.payload),
    [getUsers.fulfilled]: (state, action) => {
      const { data, routeParams } = action.payload;
      usersAdapter.setAll(state, data);
      state.routeParams = routeParams;
      state.searchText = '';
    },
  },
});

export const {
  setUsersSearchText,
  openNewUserDialog,
  closeNewUserDialog,
  openEditUserDialog,
  closeEditUserDialog,
} = usersSlice.actions;

export default usersSlice.reducer;
