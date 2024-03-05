import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  issuers: null, //1
  cardType: null, //2
  cardClass: null, //3
}

const rankCardSlice = createSlice({
  name: 'rankCard',
  initialState,
  reducers: {
    updateRankCard: (state, action) => action.payload,
    resetRankCard: (state, action) => initialState,
  },
})

export const { actions, reducer } = rankCardSlice;
export const { updateRankCard, resetRankCard } = actions;
export default reducer; 