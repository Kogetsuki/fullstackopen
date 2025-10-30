import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'

import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { sendNotification } from './reducers/notificationReducer'


const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      }
      catch {
        dispatch(sendNotification('Failed to fetch blogs', 'error'))
      }
    }

    fetchBlogs()
  }, [dispatch])


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      dispatch(sendNotification(`Welcome ${user.name}`, 'success'))

    }
    catch {
      dispatch(sendNotification('Wrong username or password', 'error'))
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    dispatch(sendNotification('Logged out', 'success'))
  }


  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    dispatch(sendNotification(`A new blog. ${blogObject.title} by ${blogObject.author} added`, 'success'))
  }


  const deleteBlog = async (id) => {
    await blogService.remove(id)

    setBlogs(blogs.filter(blog => blog.id !== id))
    dispatch(sendNotification('Blog deleted', 'success'))
  }


  const likeBlog = async (id) => {
    const blogToLike = blogs.find(blog => blog.id === id)

    const updatedBlogForServer =
      await blogService.update(id, {
        ...blogToLike,
        user: blogToLike.user.id,
        likes: blogToLike.likes + 1
      })

    const updatedBlog = {
      ...updatedBlogForServer,
      user: blogToLike.user
    }

    setBlogs(blogs.map(blog =>
      blog.id !== id
        ? blog
        : updatedBlog
    ))
  }


  return (
    <>
      <Notification />

      {!user && <LoginForm handleLogin={handleLogin} />}

      {user &&
        <>
          <h2>Blogs</h2>
          <UserInfo
            user={user}
            handleLogout={handleLogout}
          />

          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <BlogDisplay
            blogs={blogs}
            user={user}
            handleDelete={deleteBlog}
            handleLike={likeBlog}
          />
        </>
      }
    </>
  )
}

export default App