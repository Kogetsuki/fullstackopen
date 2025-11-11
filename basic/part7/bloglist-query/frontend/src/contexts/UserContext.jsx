import { createContext, useReducer } from 'react'


const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload

    case 'CLEAR':
      return null

    default:
      return state
  }
}

const UserContext = createContext()

export const UserProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  const setUser = (user) =>
    userDispatch({ type: 'SET', payload: user })

  const clearUser = () =>
    userDispatch({ type: 'CLEAR' })


  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext