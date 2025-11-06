const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')


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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
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
      Author.find({})
  },

  Author: {
    bookCount: async (root) =>
      await Book.countDocuments({ author: root._id })
  },

  Mutation: {
    addBook: async (root, args) => {
      let author

      try {
        author = await Author.findOne({ name: args.author })

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

        const book = new Book({ ...args, author: author })

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
      }
      catch (error) {
        throw new GraphQLError('Unexpected error while adding book', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            error
          }
        })
      }
    },


    editAuthor: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.name })
        if (!author)
          return null

        author.born = args.setBornTo
        await author.save()

        return author
      }
      catch (error) {
        throw new GraphQLError('Failed to edit author', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})


startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})