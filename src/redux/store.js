import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './slices/categoriesSlice';
import filterSlice from './slices/filterSlice';
import userLocationSlice from "./slices/userLocationSlice";
import cardsSlice from "./slices/cardsSlice";
import checkRedirectDetailOfferSlice from './slices/checkRedirectSlice';
import turnOffPopupKVSlice  from './slices/turnOffPopupKVSlice';
import districtSlice from './slices/districtSlice';
import rankCardSlice from './slices/rankCardSlice';
import loginTokenSlice from './slices/loginTokenSlice';

const rootReducer = {
  categories: categoriesSlice,
  filter: filterSlice,
  useLocationSlice: userLocationSlice,
  cards: cardsSlice,
  checkRedirectDetailOfferSlice: checkRedirectDetailOfferSlice,
  turnOffPopupKVSlice: turnOffPopupKVSlice,
  district: districtSlice,
  rankCard: rankCardSlice,
  loginToken: loginTokenSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
