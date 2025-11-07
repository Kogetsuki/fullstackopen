import { createSlice } from '@reduxjs/toolkit'


const genreSlice = createSlice({
  name: 'genre',
  initialState: 'All',
  reducers: {
    setGenre(state, action) {
      return action.payload
    },

    resetGenre() {
      return 'All'
    }
  }
})


export const { setGenre, resetGenre } = genreSlice.actions
export default genreSlice.reducer