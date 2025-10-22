import { useState, useEffect, use } from 'react'
import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
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
        setErrorMessage('Failed to fetch blogs')
        setTimeout(() =>
          setErrorMessage(null), 5000)
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
      setErrorMessage('Wrong credentials')
      setTimeout(() =>
        setErrorMessage(null), 5000)
    }
  }


  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')

    setUser('')
    setUsername('')
    setPassword('')
  }


  return (
    <>
      <Notification message={errorMessage} />
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