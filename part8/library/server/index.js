const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()

const User = require('./models/user')

import typeDefs from './schema'
import resolvers from './resolvers'


mongoose.set('strictQuery', false)
const MONGODB_URI = process.env.MONGODB_URI
console.log(`Connecting to ${MONGODB_URI}`)
mongoose.connect(MONGODB_URI)
  .then(() =>
    console.log('Connected to MongoDB'))
  .catch((error) =>
    console.log(`Error connecting to MongoDB: ${error.message}`))


const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
})


startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth =
      req
        ? req.headers.authorization
        : null
    // make token verification resilient: don't throw on invalid token
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      try {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET)

        const currentUser = await User
          .findById(decodedToken.id)

        return { currentUser }
      }
      catch (e) {
        return {}
      }
    }

    return {}
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})