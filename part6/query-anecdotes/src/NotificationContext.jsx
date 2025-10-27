import { createContext, useReducer } from 'react'


const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload

    case 'CLEAR':
      return ''

    default:
      return state
  }
}


const NotificationContext = createContext()

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const setNotification = (message, duration = 5000) => {
    notificationDispatch({ type: 'SET', payload: message })
    setTimeout(() =>
      notificationDispatch({ type: 'CLEAR' }), duration)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}


export default NotificationContext