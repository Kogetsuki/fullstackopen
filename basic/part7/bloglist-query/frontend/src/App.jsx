import { useState, useEffect, useRef, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import blogService from './services/blogs'

import { getBlogs } from './requests'

import UserContext from './contexts/UserContext'

import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const blogFormRef = useRef()

  const { user, setUser } = useContext(UserContext)


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
          {!user && <LoginForm />}

          {user &&
            <>
              <h2>Blogs</h2>
              <UserInfo />

              <Togglable buttonLabel='New blog' ref={blogFormRef}>
                <BlogForm />
              </Togglable>

              <BlogDisplay
                blogs={blogs}
              />
            </>
          }
        </>
      )}
    </>
  )
}

export default App