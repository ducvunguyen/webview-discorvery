import { createSlice } from '@reduxjs/toolkit';

const turnOffPopupKVSlice = createSlice({
  name: 'turnOffPopupKVSlice',
  initialState: {isOpen: true},
  reducers: {
    updateTurnOffPopup: (state, action) => {
      state.isOpen = action.payload
    },
  },
})

const { actions, reducer } = turnOffPopupKVSlice;
export const { updateTurnOffPopup } = actions;
export default reducer;
