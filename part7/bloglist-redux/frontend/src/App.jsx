import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'

import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'


const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])


  return (
    <>
      <Notification />

      {!user && <LoginForm />}

      {user &&
        <>
          <h2>Blogs</h2>

          <UserInfo />

          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>

          <BlogDisplay />
        </>
      }
    </>
  )
}

export default App