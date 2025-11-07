import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  token: localStorage.getItem('library-user-token') || null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload
      localStorage.setItem('library-user-token', action.payload)
    },

    logout(state, action) {
      state.token = null
      localStorage.removeItem('library-user-token')
    }
  }
})


export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer