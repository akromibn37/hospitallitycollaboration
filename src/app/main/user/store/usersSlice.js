import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';
import * as Constant from '../../../Constant';

export const getUsers = createAsyncThunk(
  'usersApp/users/getUsers',
  async (routeParams, { getState }) => {
    routeParams = routeParams || getState().usersApp.users.routeParams;
    const response = await axios.post(
      routeParams.id === 'all'
        ? `${Constant.BASE_URL}/api/v1/information/get/profile/all`
        : `${Constant.BASE_URL}/api/v1/information/get/profile`,
      routeParams
    );

    const data = await response.data.data.data;

    return { data, routeParams };
  }
);

export const addUser = createAsyncThunk(
  'usersApp/users/addUser',
  async (user, { dispatch, getState }) => {
    const response = await axios.post(`${Constant.BASE_URL}/api/v1/user/create`, user);
    const data = await response.data;

    dispatch(getUsers());

    return data;
  }
);

export const updateUser = createAsyncThunk(
  'usersApp/users/updateUser',
  async (user, { dispatch, getState }) => {
    const response = await axios.post(
      `${Constant.BASE_URL}/api/v1/information/update/profile`,
      user
    );
    const data = await response.data;

    dispatch(getUsers());

    return data;
  }
);

export const removeUser = createAsyncThunk(
  'usersApp/users/removeUser',
  async (userId, { dispatch, getState }) => {
    await axios.post('/api/users-app/remove-user', { userId });

    return userId;
  }
);

export const removeUsers = createAsyncThunk(
  'usersApp/users/removeUsers',
  async (userIds, { dispatch, getState }) => {
    await axios.post('/api/users-app/remove-users', { userIds });

    return userIds;
  }
);

export const toggleStarredUser = createAsyncThunk(
  'usersApp/users/toggleStarredUser',
  async (userId, { dispatch, getState }) => {
    const response = await axios.post('/api/users-app/toggle-starred-user', { userId });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getUsers());

    return data;
  }
);

export const toggleStarredUsers = createAsyncThunk(
  'usersApp/users/toggleStarredUsers',
  async (userIds, { dispatch, getState }) => {
    const response = await axios.post('/api/users-app/toggle-starred-users', { userIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getUsers());

    return data;
  }
);

export const setUsersStarred = createAsyncThunk(
  'usersApp/users/setUsersStarred',
  async (userIds, { dispatch, getState }) => {
    const response = await axios.post('/api/users-app/set-users-starred', { userIds });
    const data = await response.data;

    dispatch(getUserData());

    dispatch(getUsers());

    return data;
  }
);

export const setUsersUnstarred = createAsyncThunk(
  'usersApp/users/setUsersUnstarred',
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
  (state) => state.usersApp.users
);

const usersSlice = createSlice({
  name: 'usersApp/users',
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
