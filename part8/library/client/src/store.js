import { configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/authReducer'
import uiReducer from './reducers/uiReducer'
import genreReducer from './reducers/genreReducer'


const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    genre: genreReducer
  }
})


export default store