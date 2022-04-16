import { combineReducers } from '@reduxjs/toolkit';
import services from './servicesSlice';
import service from './serviceSlice';

const reducer = combineReducers({
  services,
  service,
});

export default reducer;
