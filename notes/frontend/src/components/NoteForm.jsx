import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
    event.preventDefault()

    createNote({
      content: newNote,
      important: true
    })

    setNewNote('')
  }

  const handleNoteChange = (event) =>
    setNewNote(event.target.value)

  return (
    <>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />

        <button type="submit">
          Save
        </button>
      </form>
    </>
  )
}

export default NoteForm