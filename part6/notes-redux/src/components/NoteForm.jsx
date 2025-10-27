import { useDispatch } from 'react-redux'
import { appendNotes } from '../reducers/noteReducer'


const NoteForm = () => {
  const dispatch = useDispatch()

  const addNote = async (event) => {
    event.preventDefault()

    const content = event.target.note.value
    event.target.note.value = ''

    dispatch(appendNotes(content))
  }


  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>Add</button>
    </form>
  )
}


export default NoteForm