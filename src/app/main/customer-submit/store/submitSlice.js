import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import * as Constant from '../../../Constant';

export const addSubmit = createAsyncThunk(
  'submitApp/submit/addSubmit',
  async (customerData, { dispatch, getState }) => {
    const response = await axios.post(`${Constant.BASE_URL}/customer/profile/create`, customerData);
    const data = await response.data;

    if (data.code === 200) {
      dispatch(showMessage({ message: 'Save User Information Successfully' }));
    } else {
      dispatch(showMessage({ message: 'User Repeat or Something wrong:)' }));
    }

    return data;
  }
);

const submitAdapter = createEntityAdapter({});

export const { selectAll: selectSubmits, selectById: selectSubmitsById } =
  submitAdapter.getSelectors((state) => state.submitApp.submit);

const submitSlice = createSlice({
  name: 'submitApp/submit',
  initialState: submitAdapter.getInitialState({
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
    setSubmitsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    extraReducers: {
      [addSubmit.fulfilled]: submitAdapter.addOne,
    },
  },
});

export const {
  setSubmitsSearchText,
  openNewSubmitDialog,
  closeNewSubmitDialog,
  openEditSubmitDialog,
  closeEditSubmitDialog,
} = submitSlice.actions;

export default submitSlice.reducer;
