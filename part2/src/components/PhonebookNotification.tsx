type PhonebookNotificationProps = {
  notificationMessage: string[] | null
}

const PhonebookNotification = ({ notificationMessage }: PhonebookNotificationProps) => {

  if (notificationMessage === null) {
    return null
  }

  return (
    <>
      {notificationMessage[0] === 'Error' ? (
        <div style={{ color: 'red', borderColor: 'red' }} className="phonebook-notification">
          {notificationMessage[0]} {notificationMessage[1]} {notificationMessage[2]}
        </div>
      ) : (
        <div style={{ color: 'green', borderColor: 'green' }} className="phonebook-notification">
          {notificationMessage[0]} {notificationMessage[1]} {notificationMessage[2]}
        </div>
      )}
    </>
  )
}

export default PhonebookNotification