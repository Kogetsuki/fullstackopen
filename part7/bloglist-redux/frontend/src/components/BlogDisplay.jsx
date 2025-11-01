import { useSelector } from 'react-redux'
import Blog from './Blog'
import { Container } from '../styles/Styles'

const BlogDisplay = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <Container>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
    </Container>
  )
}

export default BlogDisplay
