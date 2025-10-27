import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import NoteForm from './components/NoteForm'
import Notes from './components/Note'
import VisibilityFilter from './components/VisibilityFilter'
import { setNotes } from './reducers/noteReducer'
import noteService from './services/notes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService.getAll()
      .then(notes =>
        dispatch(setNotes(notes)))
  }, [dispatch])


  return (
    <>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </>
  )
}


export default App
