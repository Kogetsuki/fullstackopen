import { Alert } from '@mui/material'

const Notification = ({ message, severity = 'success' }) => {
  if (!message)
    return null

  return (
    <Alert severity={severity}>
      {message}
    </Alert>
  )
}

export default Notification