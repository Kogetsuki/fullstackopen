import { useState, useEffect, use } from 'react'
import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


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


  const addBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    const returnedBlog = await blogService.create(blogObject)

    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')

    showNotification(`A new blog. ${blogObject.title} by ${blogObject.author} added`, 'success')
  }


  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername(username)
      setPassword(password)
    }
    catch {
      showNotification('Wrong username or password', 'error')
    }
  }


  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')

    setUser('')
    setUsername('')
    setPassword('')
  }


  const showNotification = (message, type, timeToShow = 3000) => {
    setNotification({ message, type })
    setTimeout(() =>
      setNotification(null), timeToShow)
  }


  return (
    <>
      <Notification notification={notification} />

      {!user &&
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      }

      {user &&
        <>
          <h2>Blogs</h2>
          <UserInfo
            user={user}
            handleLogout={handleLogout}
          />

          <BlogForm
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            addBlog={addBlog}
          />

          <BlogDisplay
            blogs={blogs}
          />
        </>
      }
    </>
  )
}

export default App