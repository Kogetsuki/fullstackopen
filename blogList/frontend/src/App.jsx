import { useState, useEffect, useRef } from 'react'
import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const blogFormRef = useRef()
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      }
      catch {
        showNotification('Failed to fetch blogs', 'error')
      }
    }

    fetchBlogs()
  }, [])


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
    }
    catch {
      showNotification('Wrong username or password', 'error')
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }


  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    showNotification(`A new blog. ${blogObject.title} by ${blogObject.author} added`, 'success')
  }


  const deleteBlog = async (id) => {
    await blogService.remove(id)

    setBlogs(blogs.filter(blog => blog.id !== id))
    showNotification('Blog deleted', 'success')
  }


  const showNotification = (message, type, timeToShow = 3000) => {
    setNotification({ message, type })
    setTimeout(() =>
      setNotification(null), timeToShow)
  }


  return (
    <>
      <Notification notification={notification} />

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
          />
        </>
      }
    </>
  )
}
// TODO: when liking a blog and it exceeds the one above in likes number, swap them
export default App