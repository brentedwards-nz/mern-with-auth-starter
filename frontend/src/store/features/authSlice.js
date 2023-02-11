import { createSlice } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'

const initialState = {
  user: {},
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userDetails } = action.payload
      state.user = {
        email: userDetails.email,
        firstName: userDetails.firstName,
        secondName: userDetails.secondName
      }
      state.token = userDetails.token
    },
    logOut: (state, action) => {
      state.user = {}
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      state.user = action?.payload?.user ? action?.payload?.user : {}
      state.token = action?.payload?.token
    });
  }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUser = (state) => state.auth.user