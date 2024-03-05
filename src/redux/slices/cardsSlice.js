import { createSlice } from '@reduxjs/toolkit'

const cardsSlice = createSlice({
  name: 'cards',
  initialState: [],
  reducers: {
    updateCards: (state, action) => action.payload,
  },
})

export const { updateCards } = cardsSlice.actions
export default cardsSlice.reducer


