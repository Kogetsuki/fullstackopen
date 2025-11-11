import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  const handleUsernameChange = (event) =>
    setUsername(event.target.value)

  const handlePasswordChange = (event) =>
    setPassword(event.target.value)

  return (
    <>
      <h2>Log in to application</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Username
            <input
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm