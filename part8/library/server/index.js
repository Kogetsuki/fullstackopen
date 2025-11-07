const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')


mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI

console.log(`Connecting to ${MONGODB_URI}`)

mongoose.connect(MONGODB_URI)
  .then(() =>
    console.log('Connected to MongoDB'))
  .catch((error) =>
    console.log(`Error connecting to MongoDB: ${error.message}`))



const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`


const resolvers = {
  Query: {
    bookCount: async () =>
      Book.collection.countDocuments(),

    authorCount: async () =>
      Author.collection.countDocuments(),


    allBooks: async (root, args) => {
      const filter = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (!author)
          return []

        filter.author = author._id
      }

      if (args.genre)
        filter.genres = { $in: [args.genre] }

      return Book.find(filter).populate('author')
    },

    allAuthors: async () =>
      Author.find({}),

    me: (root, args, context) =>
      context.currentUser
  },

  Author: {
    bookCount: async (root) =>
      await Book.countDocuments({ author: root._id })
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser)
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })

        try {
          await author.save()
        }
        catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author })
      try {
        await book.save()
      }
      catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }

      return book.populate('author')
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser)
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })

      const author = await Author.findOne({ name: args.name })
      if (!author)
        return null

      author.born = args.setBornTo
      await author.save()

      return author
    },

    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret')
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })

      const userForToken = {
        ...user,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}


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

    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET)

      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})