import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  email: undefined,
  firstName: undefined,
  secondName: undefined,
  token: undefined
}

const userdetailsSlice = createSlice({
  name: 'userdetails',
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return action.payload
    },
    resetUserDetailsRedux: (state) => {
      //localStorage.setItem('userDetails', JSON.stringify({}))
      state = initialState
    },
    setUserDetailsRedux: (state, action) => {
      const details = action.payload
      state.isLoggedIn = details.isLoggedIn
      state.email = details.email
      state.firstName = details.firstName
      state.secondName = details.secondName
      state.token = details.token
    }
  }
})

export default userdetailsSlice.reducer
export const { hydrate, resetUserDetailsRedux, setUserDetailsRedux } = userdetailsSlice.actions