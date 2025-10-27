import { createSlice, current } from '@reduxjs/toolkit'


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


export const { setNotes, createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer