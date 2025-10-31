import { useState, useEffect, useRef, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import blogService from './services/blogs'
import loginService from './services/login'
import { getBlogs } from './requests'

import NotificationContext from './contexts/NotificationContext'

import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const blogFormRef = useRef()
  const [user, setUser] = useState(null)

  const { sendNotification } = useContext(NotificationContext)


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })

  const blogs = result.data


  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)

      sendNotification(`${user.name} logged in`, 'success')
    }
    catch {
      sendNotification('Wrong username or password', 'error')
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)

    sendNotification('Logged out', 'success')
  }


  return (
    <>
      <Notification />

      {result.isLoading && <div>loading data...</div>}
      {result.isError && (
        <>
          <h2>Error</h2>
          <p>Anecdote service not available due to server problems</p>
          <p>{result.error.message}</p>
        </>
      )}

      {!result.isLoading && !result.isError && (
        <>
          {!user && <LoginForm handleLogin={handleLogin} />}

          {user &&
            <>
              <h2>Blogs</h2>
              <UserInfo
                user={user}
                handleLogout={handleLogout}
              />

              <Togglable buttonLabel='New blog' ref={blogFormRef}>
                <BlogForm />
              </Togglable>

              <BlogDisplay
                blogs={blogs}
                user={user}
              />
            </>
          }
        </>
      )}
    </>
  )
}

export default App