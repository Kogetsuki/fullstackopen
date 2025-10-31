import { useDispatch, useSelector } from 'react-redux'
import { clearLoggedUser } from '../reducers/loggedUserReducer'
import { sendNotification } from '../reducers/notificationReducer'

const LoggedUserInfo = () => {
  const loggedUser = useSelector(state => state.loggedUser)
  const dispatch = useDispatch()

  const Logout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(clearLoggedUser())
    dispatch(sendNotification('Logged out', 'success'))
  }


  return (
    <>
      <div>
  {loggedUser.name} logged in
      </div>
      <button onClick={Logout}>
        Logout
      </button>
    </>
  )
}

export default LoggedUserInfo