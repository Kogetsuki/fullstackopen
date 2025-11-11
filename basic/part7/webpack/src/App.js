import React, { useState, useEffect } from 'react'
import PromisePolyfill from 'promise-polyfill'
import axios from 'axios'
import './index.css'

const useNotes = (url) => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get(url)
      .then(res =>
        setNotes(res.data))
  }, [url])

  return notes
}


const App = () => {
  // For promises to work on IE
  if (!window.Promise)
    window.Promise = PromisePolyfill

  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])

  const notes = useNotes(BACKEND_URL)

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }


  return (
    <div className='container'>
      hello webpack {counter} clicks
      <button onClick={handleClick}>
        press
      </button>
      <div>
        {notes.length} notes on server {BACKEND_URL}
      </div>
    </div>
  )
}

export default App