import { combineReducers } from '@reduxjs/toolkit';
import customerProfiles from './customerProfilesSlice';
import customerProfile from './customerProfileSlice';
import categories from './categoriesSlice';

const reducer = combineReducers({
  customerProfiles,
  customerProfile,
  categories,
});

export default reducer;
