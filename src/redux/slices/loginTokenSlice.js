import { createSlice } from '@reduxjs/toolkit'
const initialState = { isLoginToken: false }

const loginTokenSlice = createSlice({
  name: 'loginToken',
  initialState,
  reducers: {
    updateLoginToken(state, action) {
      state.isLoginToken = action.payload;
    },
  },
})

export const {updateLoginToken} = loginTokenSlice.actions
export default loginTokenSlice.reducer
