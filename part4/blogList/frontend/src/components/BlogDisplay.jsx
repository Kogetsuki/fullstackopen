import Blog from './Blog'

const BlogDisplay = ({ blogs }) => {
  return (
    <>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </>
  )
}

export default BlogDisplay
