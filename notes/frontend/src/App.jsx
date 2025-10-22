import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import NoteForm from './components/NoteForm'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes =>
        setNotes(initialNotes))
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])


  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }


  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote =>
        setNotes(notes.map(note =>
          note.id !== id
            ? note
            : returnedNote
        ))
      )
      .catch(() => {
        setErrorMessage(`Note '${note.content}' was already removed from server`)
        setTimeout(() =>
          setErrorMessage(null), 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }


  const handleNoteChange = event =>
    setNewNote(event.target.value)


  const handleUsernameChange = event =>
    setUsername(event.target.value)


  const handlePasswordChange = event =>
    setPassword(event.target.value)


  const notesToShow =
    showAll
      ? notes
      : notes.filter(note => note.important)


  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)
      setUser(user)
      setUsername(username)
      setPassword(password)
    }
    catch {
      setErrorMessage('Wrong credentials')
      setTimeout(() =>
        setErrorMessage(null), 5000)
    }
  }


  const loginForm = () => (
    <Togglable buttonLabel="Login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleLogin}
      />
    </Togglable >
  )


  const noteForm = () => (
    <Togglable buttonLabel="New note">
      <NoteForm
        onSubmit={addNote}
        handleChange={handleNoteChange}
        value={newNote}
      />
    </Togglable>
  )


  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}

      {user && (
        <>
          <p>{user.name} logged in</p>
          {noteForm()}
        </>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <Footer />
    </>
  )
}

export default App
