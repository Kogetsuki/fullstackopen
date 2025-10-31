import Blog from './Blog'

const BlogDisplay = ({ blogs, user }) => {
  return (
    <>
      {[...blogs]
        .sort((a, b) => a.likes - b.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        )}
    </>
  )
}

export default BlogDisplay
