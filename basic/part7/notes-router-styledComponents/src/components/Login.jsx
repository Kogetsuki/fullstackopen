import { useNavigate } from 'react-router-dom'
import { Button, Input } from './Styled'

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <Input />
        </div>
        <div>
          password: <Input type='password' />
        </div>
        <Button type='submit' primary=''>
          login
        </Button>
      </form>
    </div>
  )
}

export default Login