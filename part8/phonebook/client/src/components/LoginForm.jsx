import { useEffect } from 'react'
import { useMutation } from '@apollo/client/react'
import { useField } from '../hooks'
import { LOGIN } from '../queries'


const LoginForm = ({ setToken, setError }) => {
  const username = useField('text')
  const password = useField('password')


  const [login, result] = useMutation(LOGIN, {
    onError: (error) =>
      setError(error.graphQLErrors[0]?.message || error.message)
  })


  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)

      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data])


  const submit = async (event) => {
    event.preventDefault()

    login({
      variables: {
        username: username.value,
        password: password.value
      }
    })
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