import Blog from './Blog'

const BlogDisplay = ({ blogs, user, handleDelete }) => {
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
          />
        )}
    </>
  )
}

export default BlogDisplay
