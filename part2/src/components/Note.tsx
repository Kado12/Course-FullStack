type NoteProps = {
  note: {
    id: string
    content: string
    important: boolean
  },
  toggleImportance: (id: string) => void
}

const Note = ({ note, toggleImportance }: NoteProps) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li key={note.id} className="note">
      {note.content} <strong>{note.important ? 'Important' : ''}</strong>
      <button onClick={() => toggleImportance(note.id)}>{label}</button>
    </li>
  )
}

export default Note