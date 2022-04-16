import { combineReducers } from '@reduxjs/toolkit';
import categories from './categoriesSlice';
import submit from './submitSlice';

const reducer = combineReducers({
  categories,
  submit,
});

export default reducer;
