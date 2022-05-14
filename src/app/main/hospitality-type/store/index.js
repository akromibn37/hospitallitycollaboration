import { combineReducers } from '@reduxjs/toolkit';
import hospitalitytypes from './hospitalitytypesSlice';
import hospitalitytype from './hospitalitytypeSlice';

const reducer = combineReducers({
  hospitalitytypes,
  hospitalitytype,
});

export default reducer;
