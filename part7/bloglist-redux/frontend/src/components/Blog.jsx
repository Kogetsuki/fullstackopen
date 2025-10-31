import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div className='blog' style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}> {blog.title} {blog.author}</Link>
    </div>
  )
}


export default Blog