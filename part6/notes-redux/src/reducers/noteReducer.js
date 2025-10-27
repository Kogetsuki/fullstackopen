import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../services/notes'


const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    setNotes(state, action) {
      return action.payload
    },

    createNote(state, action) {
      state.push(action.payload)
    },

    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(note => note.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }

      console.log(current(state))

      return state.map(note =>
        note.id === id
          ? changedNote
          : note
      )
    }
  }
})


const { setNotes, createNote } = noteSlice.actions

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}

export const appendNotes = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content)
    dispatch(createNote(newNote))
  }
}


export const { toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer