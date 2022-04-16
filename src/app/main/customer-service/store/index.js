import { combineReducers } from '@reduxjs/toolkit';
import customerServices from './customerServicesSlice';
import customerService from './customerServiceSlice';
import categories from './categoriesSlice';
import hospitalitys from './hospitalitysSlice';
import users from './usersSlice';
import customers from './customersSlice';

const reducer = combineReducers({
  customerServices,
  customerService,
  hospitalitys,
  categories,
  users,
  customers,
});

export default reducer;
