import { useApolloClient } from '@apollo/client/react'
import { useSelector, useDispatch } from 'react-redux'

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import Recommandations from './components/Recommandations'

import { logout } from './reducers/authReducer'
import { setPage } from './reducers/uiReducer'


const App = () => {
  const dispatch = useDispatch()
  const client = useApolloClient()

  const token = useSelector(state => state.auth.token)
  const page = useSelector(state => state.ui.page)


  const handleLogout = () => {
    dispatch(logout())
    client.clearStore()

    dispatch(setPage('login'))
  }


  return (
    <>
      <div>
        <button onClick={() => dispatch(setPage('authors'))}>Authors</button>
        <button onClick={() => dispatch(setPage('books'))}>Books</button>

        {token ? (
          <>
            <button onClick={() => dispatch(setPage('add'))}>Add book</button>
            <button onClick={() => dispatch(setPage('recommend'))}>Recommend</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button onClick={() => dispatch(setPage('login'))}>Login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <BookForm show={page === 'add'} />
      <LoginForm show={page === 'login'} />
      <Recommandations show={page === 'recommend'} />
    </>
  )
}

export default App
