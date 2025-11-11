import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { sendNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(appendAnecdote(content))
    dispatch(sendNotification(`You created '${content}'`, 3))
  }


  return (
    <>
      <h2>Create new</h2>

      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>Create</button>
      </form>
    </>
  )
}


export default AnecdoteForm