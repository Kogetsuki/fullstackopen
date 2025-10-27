import { createSlice } from '@reduxjs/toolkit'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },

    createAnecdote(state, action) {
      state.push(action.payload)
    },

    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(a =>
        a.id === id
          ? changedAnecdote
          : a
      )
    }
  }
})


export const { setAnecdotes, createAnecdote, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer