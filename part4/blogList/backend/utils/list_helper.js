const _ = require('lodash')

const dummy = (blogs) =>
  1

const totalLikes = (blogs) => {
  const reducer = (sum, blog) =>
    sum + blog.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, current) =>
    favorite === null || current.likes > favorite.likes
      ? current
      : favorite

  return blogs.reduce(reducer, null)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return null

  const authorCounts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(_.keys(authorCounts), author =>
    authorCounts[author])

  return { author: topAuthor, blogs: authorCounts[topAuthor] }
}


const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return null

  return _(blogs)
    .groupBy('author')
    .map((posts, author) => ({
      author,
      likes: _.sumBy(posts, 'likes')
    }))
    .maxBy('likes')
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}