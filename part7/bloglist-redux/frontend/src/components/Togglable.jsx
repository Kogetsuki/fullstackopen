import { useState, useImperativeHandle } from 'react'
import { Button } from '../styles/Styles'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible
      ? 'none'
      : ''
  }

  const showWhenVisible = {
    display: visible
      ? ''
      : 'none'
  }

  const toggleVisibility = () =>
    setVisible(!visible)

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </>
  )
}

export default Togglable