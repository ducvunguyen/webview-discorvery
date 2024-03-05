import { createSlice } from '@reduxjs/toolkit';

const checkRedirectDetailOfferSlice = createSlice({
  name: 'checkRedirectDetailOfferSlice',
  initialState: {isCheck: false},
  reducers: {
    updateRedirect: (state, action) => {
      state.isCheck = action.payload
    }
  },
});

const { actions, reducer } = checkRedirectDetailOfferSlice;
export const { updateRedirect } = actions;
export default reducer;
