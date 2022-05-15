import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import history from '@history';
import { createUserSettingsFirebase } from './userSlice';

export const submitRegister =
  ({ displayName, username, password }) =>
  async (dispatch) => {
    return jwtService
      .createUser({
        username,
        password,
        userType: 'user',
        displayName,
        createBy: displayName,
        updateBy: displayName,
      })
      .then((data) => {
        // dispatch(setUserData(user));

        history.push({
          pathname: '/login',
        });

        dispatch(showMessage({ message: 'Register User SuccessFully' }));

        return dispatch(registerSuccess());
      })
      .catch((errors) => {
        dispatch(showMessage({ message: 'Register User Error' }));
        return dispatch(registerError(errors));
      });
  };

export const registerWithFirebase = (model) => async (dispatch) => {
  if (!firebaseService.auth) {
    console.warn("Firebase Service didn't initialize, check your configuration");

    return () => false;
  }
  const { email, password, displayName } = model;

  return firebaseService.auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      dispatch(
        createUserSettingsFirebase({
          ...response.user,
          displayName,
          email,
        })
      );

      return dispatch(registerSuccess());
    })
    .catch((error) => {
      const usernameErrorCodes = [
        'auth/operation-not-allowed',
        'auth/user-not-found',
        'auth/user-disabled',
      ];

      const emailErrorCodes = ['auth/email-already-in-use', 'auth/invalid-email'];

      const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

      const response = [];

      if (usernameErrorCodes.includes(error.code)) {
        response.push({
          type: 'username',
          message: error.message,
        });
      }

      if (emailErrorCodes.includes(error.code)) {
        response.push({
          type: 'email',
          message: error.message,
        });
      }

      if (passwordErrorCodes.includes(error.code)) {
        response.push({
          type: 'password',
          message: error.message,
        });
      }

      if (error.code === 'auth/invalid-api-key') {
        dispatch(showMessage({ message: error.message }));
      }

      return dispatch(registerError(response));
    });
};

const initialState = {
  success: false,
  errors: [],
};

const registerSlice = createSlice({
  name: 'auth/register',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    registerError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
