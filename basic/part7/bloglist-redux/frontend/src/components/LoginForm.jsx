import { useDispatch } from 'react-redux'
import { useField } from '../hooks'

import loginService from '../services/login'
import blogService from '../services/blogs'

import Notification from './Notification'

import { setLoggedUser } from '../reducers/loggedUserReducer'
import { sendNotification } from '../reducers/notificationReducer'
import { Form, Input, Label, Button, Title } from '../styles/Styles'


const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const dispatch = useDispatch()


  const onSubmit = async (event) => {
    event.preventDefault()

    await login()

    username.reset()
    password.reset()
  }


  const login = async () => {
    try {
      const credentials = {
        username: username.value,
        password: password.value
      }

      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setLoggedUser(user))

      blogService.setToken(user.token)
      dispatch(sendNotification(`Welcome ${user.name}`, 'success'))
    }
    catch {
      dispatch(sendNotification('Wrong username or password', 'error'))
    }
  }


  return (
    <>
      <Title>Log in to application</Title>

      <Notification />

      <Form onSubmit={onSubmit}>
        <Label>
          Username
          <Input {...username.input} />
        </Label>

        <Label>
          Password
          <Input {...password.input} />
        </Label>

        <Button type="submit" primary=''>Login</Button>
      </Form>
    </>
  )
}

export default LoginForm