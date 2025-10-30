import Blog from './Blog'

const BlogDisplay = ({ blogs, user, handleDelete, handleLike }) => {
  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleDelete={handleDelete}
            handleLike={handleLike}
          />
        )}
    </>
  )
}

export default BlogDisplay
