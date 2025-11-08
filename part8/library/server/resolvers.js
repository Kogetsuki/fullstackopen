const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')


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


module.exports = resolvers