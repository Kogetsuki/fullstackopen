import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'


const Anecdote = ({ anecdote, handleVote }) => {
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
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <>
      <h2>Anecdotes</h2>

      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => dispatch(vote(anecdote.id))}
          />
        )}
    </>
  )
}


export default AnecdoteList