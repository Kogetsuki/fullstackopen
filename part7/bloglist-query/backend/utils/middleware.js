const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Path:', req.path)
  logger.info('Body', req.body)
  logger.info('---')
  next()
}


const unknownEndpoint = (req, res) =>
  res.status(404).send({ error: 'unknown endpoint' })


const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization')

  if (auth && auth.startsWith('Bearer '))
    req.token = auth.replace('Bearer ', '')

  else
    req.token = null

  next()
}

const userExtractor = async (req, res, next) => {
  if (!req.token)
    return res.status(401).json({ error: 'missing token' })

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id)
    return res.status(401).json({ error: 'invalid token' })

  const user = await User.findById(decodedToken.id)
  if (!user)
    return res.status(400).json({ error: 'user not found' })

  req.user = user

  next()

}


const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  switch (error.name) {
    case 'CastError':
      return res.status(400).send({ error: 'Malformatted ID' })

    case 'ValidationError':
      return res.status(400).json({ error: error.message })

    case 'MongoServerError':
      if (error.message.includes('E11000 duplicate key error'))
        return res.status(400).json({ error: 'expected `username` to be unique' })
      break

    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' })

    case 'TokenExpiredError':
      return res.status(401).json({ error: 'token expired' })

    default:
      break
  }

  next(error)
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}