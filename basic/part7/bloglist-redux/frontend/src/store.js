import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: usersReducer,
    loggedUser: loggedUserReducer,
    notification: notificationReducer
  }
})

export default store