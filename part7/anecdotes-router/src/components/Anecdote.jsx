import { Link } from 'react-router-dom'

const Anecdote = ({ anecdote }) => {
  return (
    <>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has votes {anecdote.votes}</div>
      <div>for mote info see <Link to={anecdote.info}>{anecdote.info}</Link></div>
    </>
  )
}

export default Anecdote