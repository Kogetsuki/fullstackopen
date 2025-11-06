import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client/react'

import { ALL_PERSONS } from './queries'

import Notification from './components/Notification'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const result = useQuery(ALL_PERSONS)

  if (result.loading)
    return <div>loading...</div>


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  if (!token)
    return (
      <>
        <Notification errorMessage={errorMessage} />
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </>
    )


  return (
    <div>
      <Notification message={errorMessage} />
      <button onClick={logout}>Logout</button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}


export default App
