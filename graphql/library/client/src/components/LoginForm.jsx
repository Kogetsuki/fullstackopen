import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client/react'

import { loginSuccess } from '../reducers/authReducer'
import { setPage } from '../reducers/uiReducer'

import { useField } from '../hooks'
import { LOGIN } from '../queries'


const LoginForm = (props) => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const [login] = useMutation(LOGIN, {
    onCompleted: ({ login }) => {
      dispatch(loginSuccess(login.value))
      dispatch(setPage('authors'))
    }
  })


  if (!props.show)
    return null


  const submit = (event) => {
    event.preventDefault()

    login({
      variables: {
        username: username.value,
        password: password.value
      }
    })

    username.reset()
    password.reset()
  }


  return (
    <>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <div>
          Username <input {...username.input} />
        </div>

        <div>
          Password <input {...password.input} />
        </div>

        <button type='submit'>Login</button>
      </form>
    </>
  )
}


export default LoginForm