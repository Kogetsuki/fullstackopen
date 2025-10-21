import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs))
  }, [])


  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

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


  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>

          <button type="submit">Login</button>
        </form>
      </>
    )
  }


  const blogDisplay = () => {
    return (
      <>
        <h2>Blogs</h2>
        <p>{user.name} logged in</p>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && blogDisplay()}
    </>
  )
}

export default App