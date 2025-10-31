import { createContext, useReducer } from 'react'


const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload

    case 'CLEAR':
      return null

    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const sendNotification = (message, type, time = 3) => {
    notificationDispatch({ type: 'SET', payload: { message, type } })
    setTimeout(() =>
      notificationDispatch({ type: 'CLEAR' }), time * 1000)
  }


  return (
    <NotificationContext.Provider value={{ notification, sendNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext