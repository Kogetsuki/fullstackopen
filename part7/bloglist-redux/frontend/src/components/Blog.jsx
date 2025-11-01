import { Link } from 'react-router-dom'
import { BlogCard, BlogTitle } from '../styles/Styles'

const Blog = ({ blog }) => {

  return (
    <BlogCard className='blog'>
      <BlogTitle>
        <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {blog.title} by {blog.author}
        </Link>
      </BlogTitle>
    </BlogCard>
  )
}


export default Blog