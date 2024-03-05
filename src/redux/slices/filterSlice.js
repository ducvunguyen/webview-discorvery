import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formValue: {},
  text: '',
  isShowSearchHistory: false,
  countSubmitSearch: 0
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    updateFieldFilter: (state, action) => {
      const {
        payload: { field, value },
      } = action;
      state[field] = value;
    },
    resetFilter: () => initialState,
    showSearchHistory: (state, action) => {
      state.isShowSearchHistory = action.payload;
    },
  },
});

export const { actions, reducer } = filterSlice;

export const { updateFieldFilter, resetFilter, showSearchHistory } = actions;

export default reducer;
