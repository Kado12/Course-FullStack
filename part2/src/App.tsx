import { useEffect, useState } from "react"

// * Servicios
import notesServices, { Note as NoteType } from "./services/notes"

// * Componentes
import Note from "./components/Note"
import Notification from "./components/Notification"
import Footer from "./components/Footer"

// * Estilos
import "./styles/index.css"

const App = () => {

  const [allNotes, setAllNotes] = useState<NoteType[]>([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const notesToShow = showAll ? allNotes : allNotes.filter(note => note.important)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const addNote = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      // * Al momento de hacer POST a la API, se obvia el ID para que el servidor lo genere
      const noteObject = {
        content: newNote,
        important: Math.random() < 0.5,
      }
      const newNoteCreated = await notesServices.create(noteObject)
      setAllNotes(allNotes.concat(newNoteCreated.data))
      setNewNote('')
    } catch (error) {
      console.error('Error adding note:', error)

    }
  }

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value)
  }

  const toggleImportance = async (id: number) => {
    const note = allNotes.find(n => n.id === id)
    if (!note) {
      console.error(`Note with id ${id} not found`);
      return;
    }
    const changedNote = { ...note, important: !note.important }
    try {
      await notesServices.update(id, changedNote)
      setAllNotes(allNotes.map(note => (note.id !== id ? note : changedNote)))
    } catch (error) {
      setErrorMessage(`Note '${note.content}' was already removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setAllNotes(allNotes.filter(n => n.id !== id))
      console.error('Error updating note:', error)

    }
  }

  // * UseEffect para cargar los datos de la API
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const getAllNotes = await notesServices.getAll()
        setAllNotes(getAllNotes)
      }
      catch (error) {
        console.error('Error fetching notes:', error)
      }
    }
    fetchNotes()
  }, [])

  return (
    <>
      <div>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'Important' : 'All'}
        </button>
        <ul>
          {notesToShow.map(note => {
            return (
              <Note key={note.id} note={note} toggleImportance={toggleImportance} />
            )
          })}
        </ul>

        <form onSubmit={addNote}>
          <input type="text" name="note" value={newNote} onChange={handleNoteChange} />
          <button type="submit">Save</button>
        </form>
        <Footer />
      </div>
    </>
  )
}

export default App
