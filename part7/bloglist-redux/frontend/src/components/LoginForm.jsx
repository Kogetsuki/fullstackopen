import { useDispatch } from 'react-redux'
import { useField } from '../hooks'

import loginService from '../services/login'
import blogService from '../services/blogs'

import Notification from './Notification'

import { setUser } from '../reducers/userReducer'
import { sendNotification } from '../reducers/notificationReducer'


const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()


  const onSubmit = async (event) => {
    event.preventDefault()

    await Login()

    username.reset()
    password.reset()
  }


  const Login = async () => {
    try {
      const credentials = {
        username: username.value,
        password: password.value
      }
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))

      blogService.setToken(user.token)
      dispatch(sendNotification(`Welcome ${user.name}`, 'success'))
    }
    catch {
      dispatch(sendNotification('Wrong username or password', 'error'))
    }
  }


  return (
    <>
      <h2>Log in to application</h2>

      <Notification />

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

        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm