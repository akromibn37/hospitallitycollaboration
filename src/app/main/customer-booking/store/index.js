import { combineReducers } from '@reduxjs/toolkit';
import customerBookings from './customerBookingsSlice';
import customerBooking from './customerBookingSlice';
import hospitalitys from './hospitalitysSlice';
import customerServices from './customerServiceSlice';

const reducer = combineReducers({
  customerBookings,
  customerBooking,
  hospitalitys,
  customerServices,
});

export default reducer;
