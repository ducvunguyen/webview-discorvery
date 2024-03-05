import { createSlice } from '@reduxjs/toolkit'


const useLocationSlice = createSlice({
  name: 'useLocationSlice',
  initialState: {nameCity: null, latLng: null},
  reducers: {
    updateCity(state, action) {
      state.nameCity = action.payload;
    },
    updateLatLng(state, action) {
      state.latLng = action.payload;
    }
  },
})

export const { updateCity, updateLatLng } = useLocationSlice.actions
export default useLocationSlice.reducer
