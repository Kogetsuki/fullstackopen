import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import { sendNotification } from '../reducers/notificationReducer'

const UserInfo = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const Logout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(clearUser())
    dispatch(sendNotification('Logged out', 'success'))
  }


  return (
    <>
      <div>
        {user.name} logged in
      </div>
      <button onClick={Logout}>
        Logout
      </button>
    </>
  )
}

export default UserInfo