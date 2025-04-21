type NotificationProps = {
  message: string | null
}

const Notification = ({ message }: NotificationProps) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error-notification">
      {message}
    </div>
  )
}

export default Notification