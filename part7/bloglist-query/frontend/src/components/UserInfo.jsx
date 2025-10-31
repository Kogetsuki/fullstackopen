import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'


const UserInfo = () => {
  const { sendNotification } = useContext(NotificationContext)
  const { user, setUser } = useContext(UserContext)


  const Logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)

    sendNotification('Logged out', 'success')
  }


  return (
    <>
      {user.name} logged in
      <button onClick={Logout}>
        Logout
      </button>
    </>
  )
}

export default UserInfo