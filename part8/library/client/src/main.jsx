import ReactDOM from 'react-dom/client'
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql
} from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { Provider } from 'react-redux'

import store from './store'
import App from './App'


const token = localStorage.getItem('library-user-token')


const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000',
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  }),
  cache: new InMemoryCache()
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
)