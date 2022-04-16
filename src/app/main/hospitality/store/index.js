import { combineReducers } from '@reduxjs/toolkit';
import hospitalitys from './hospitalitysSlice';
import hospitality from './hospitalitySlice';

const reducer = combineReducers({
  hospitalitys,
  hospitality,
});

export default reducer;
