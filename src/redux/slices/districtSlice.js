import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cityCode: null,
  districtCode: null,
  cities: [],
  districts: [],
  isResetForm: false
};

const districtSlice = createSlice({
  name: 'district',
  initialState,
  reducers: {
    updateDistrict: (state, action) => {
      const {
        payload: { data, nameObject },
      } = action;
      state[nameObject] = data;
    },
    resetFilterDistrict: () => initialState,
  },
});

export const { actions, reducer } = districtSlice;

export const { updateDistrict, resetFilterDistrict } = actions;

export default reducer;
