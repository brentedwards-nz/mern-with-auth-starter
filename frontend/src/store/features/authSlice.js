import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { userDetails } = action.payload
      console.table(userDetails)
      console.log(userDetails.email)
      console.log(userDetails.firstName)
      console.log(userDetails.secondName)
      console.log(userDetails.token)
      state.user = {
        email: userDetails.email,
        firstName: userDetails.firstName,
        secondName: userDetails.secondName
      }
      state.token = userDetails.token
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUser = (state) => state.auth.user