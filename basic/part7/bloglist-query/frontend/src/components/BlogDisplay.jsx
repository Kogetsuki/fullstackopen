import Blog from './Blog'

const BlogDisplay = ({ blogs }) => {
  return (
    <>
      {[...blogs]
        .sort((a, b) => a.likes - b.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
    </>
  )
}

export default BlogDisplay
