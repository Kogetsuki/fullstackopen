import { useSelector } from 'react-redux'
import { Notification as NotificationStyle } from '../styles/Styles'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification)
    return null

  return (
    <NotificationStyle type={notification.type}>
      {notification.message}
    </NotificationStyle>
  )
}

export default Notification