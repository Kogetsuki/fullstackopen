import { useDispatch, useSelector } from 'react-redux'
import { clearLoggedUser } from '../reducers/loggedUserReducer'
import { sendNotification } from '../reducers/notificationReducer'

import { Button, Container } from '../styles/Styles'

const LoggedUserInfo = () => {
  const loggedUser = useSelector(state => state.loggedUser)
  const dispatch = useDispatch()

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(clearLoggedUser())
    dispatch(sendNotification('Logged out', 'success'))
  }


  return (
    <>
      <Container>
        <div>
          {loggedUser.name} logged in
        </div>
      </Container>
      <Button onClick={logout}>
        Logout
      </Button>
    </>
  )
}

export default LoggedUserInfo