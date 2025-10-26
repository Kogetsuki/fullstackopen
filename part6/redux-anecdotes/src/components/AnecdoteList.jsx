import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleVote = () => {
    dispatch(vote(anecdote.id))

    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() =>
      dispatch(clearNotification()), 5000)
  }

  return (
    <>
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={handleVote}>
            Vote
          </button>
        </div>
      </div>
    </>
  )
}


const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote =>
      anecdote.content.includes(filter))
  })


  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
          />
        )}
    </>
  )
}


export default AnecdoteList