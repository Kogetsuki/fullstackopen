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


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])


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

        {user.name} logged in
        <button onClick={handleLogout}>
          Logout
        </button>

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