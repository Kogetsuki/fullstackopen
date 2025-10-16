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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}