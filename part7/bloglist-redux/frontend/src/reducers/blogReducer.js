import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },

    createBlog(state, action) {
      state.push(action.payload)
    },

    updateBlog(state, action) {
      return state.map(b =>
        b.id === action.payload.id
          ? action.payload
          : b
      )
    },

    deleteBlog(state, action) {
      return state.filter(b => b.id !== action.payload)
    }
  }
})


const { setBlogs, createBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}


export const appendBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(createBlog(newBlog))
  }
}


export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogToChange = getState().blogs.find(b => b.id === id)

    const updatedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
      user: blogToChange.user.id
    }

    const returned = await blogService.update(id, updatedBlog)
    dispatch(updateBlog({
      ...returned,
      user: blogToChange.user
    }))
  }
}


export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}


export default blogSlice.reducer