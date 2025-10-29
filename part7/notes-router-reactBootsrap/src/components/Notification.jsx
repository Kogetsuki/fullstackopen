import { Alert } from 'react-bootstrap'

const Notification = ({ message, variant = 'success' }) => {
  if (!message)
    return null

  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  )
}

export default Notification