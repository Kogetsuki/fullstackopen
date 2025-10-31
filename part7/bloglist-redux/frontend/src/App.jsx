import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'

import blogService from './services/blogs'

import Home from './views/Home'
import Users from './views/Users'
import User from './views/User'

import LoginForm from './components/LoginForm'
import LoggedUserInfo from './components/LoggedUserInfo'
import Notification from './components/Notification'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'



const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setLoggedUser(user))
      blogService.setToken(user.token)
    }
  }, [])


  if (!loggedUser)
    return <LoginForm />

  return (
    <>
      <h2>Blogs</h2>
      <Notification />
      <LoggedUserInfo />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </>
  )
}

export default App