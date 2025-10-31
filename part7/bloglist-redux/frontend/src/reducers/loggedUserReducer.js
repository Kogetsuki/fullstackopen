import { createSlice } from '@reduxjs/toolkit'


const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload
    },

    clearLoggedUser(state, action) {
      return null
    }
  }
})

export const { setLoggedUser, clearLoggedUser } = loggedUserSlice.actions
export default loggedUserSlice.reducer