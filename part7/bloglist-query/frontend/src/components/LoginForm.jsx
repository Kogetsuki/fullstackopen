import { useContext } from 'react'
import { useField } from '../hooks'

import loginService from '../services/login'
import blogService from '../services/blogs'

import UserContext from '../contexts/UserContext'
import NotificationContext from '../contexts/NotificationContext'


const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const { sendNotification } = useContext(NotificationContext)
  const { setUser } = useContext(UserContext)


  const onSubmit = async (event) => {
    event.preventDefault()

    await Login()

    username.reset()
    password.reset()
  }


  const Login = async () => {
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)

      sendNotification(`${user.name} logged in`, 'success')
    }
    catch {
      sendNotification('Wrong username or password', 'error')
    }
  }


  return (
    <>
      <h2>Log in to application</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Username
            <input {...username.input} />
          </label>
        </div>

        <div>
          <label>
            Password
            <input {...password.input} />
          </label>
        </div>

        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default LoginForm