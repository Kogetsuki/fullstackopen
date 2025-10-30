import { useNavigate } from 'react-router-dom'
import { useField } from '../src/hooks'

const AnecdoteForm = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('url')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    navigate('/')
  }

  const reset = () => {
    content.reset()
    author.reset()
    info.reset()
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.input} />
        </div>
        <div>
          author
          <input {...author.input} />
        </div>
        <div>
          url for more info
          <input {...info.input} />
        </div>
        <button type='submit'>
          create
        </button>
        <button type='button' onClick={reset}>
          reset
        </button>
      </form>
    </div>
  )
}


export default AnecdoteForm
