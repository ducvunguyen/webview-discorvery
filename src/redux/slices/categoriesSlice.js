import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [],
  reducers: {
    updateCategories: (state, action) => action.payload,
  },
});

const { actions, reducer } = categoriesSlice;
export const { updateCategories } = actions;
export default reducer;
