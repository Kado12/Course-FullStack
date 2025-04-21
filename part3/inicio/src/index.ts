import express, { Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
// ? Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())


interface Note {
  id: number
  content: string
  important: boolean
}

interface Contact {
  id: number
  name: string
  number: number
}

interface Database {
  notes: Note[]
  phonebook: Contact[]
}

let db: Database = {
  notes: [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ],
  phonebook: [
    {
      id: 1,
      name: "Arto Hellas",
      number: 912151197
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: 920026404
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: 946566624
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: 953789365
    }
  ],
}

const generateId = (data: { id: number }[]): number => {
  const maxId = data.length > 0 ? Math.max(...data.map((d) => d.id)) : 0;
  return maxId + 1;
}


// * API

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Welcome to the Phonebook API</h1>')
})

app.get('/api', (req: Request, res: Response) => {
  res.json(db)
})

app.get('/api/info', (req: Request, res: Response) => {
  const date = new Date()
  const info = `Notes has info for ${db.notes.length} notes<br>
  Phonebook has info for ${db.phonebook.length} people<br>${date}`
  res.send(info)
})

// * API Notes

app.get('/api/notes', (req: Request, res: Response) => {
  res.json(db.notes)
})

app.get('/api/notes/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const note = db.notes.find(note => note.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.post('/api/notes', (req: Request, res: Response) => {
  const note: Omit<Note, 'id'> = req.body
  if (!note || !note.content) {
    return res.status(400).json({ error: 'content missing' })
  }
  const newNote: Note = {
    id: generateId(db.notes),
    content: note.content,
    important: note.important || false
  }
  db.notes = db.notes.concat(newNote)
  res.status(201).json(newNote)
})

app.put('/api/notes/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const note = db.notes.find(note => note.id === id)
  if (!note) {
    return res.status(404).json({ error: 'note not found' })
  }
  const updatedNote: Note = {
    ...note,
    content: req.body.content !== undefined ? req.body.content : note.content,
    important: req.body.important !== undefined ? req.body.important : note.important
  }
  db.notes = db.notes.map(n => (n.id !== id ? n : updatedNote))
  res.json(updatedNote)
})

app.delete('/api/notes/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  db.notes = db.notes.filter(note => note.id !== id)
  res.status(204).end()
})

// * Phonebook API

app.get('/api/phonebook', (req: Request, res: Response) => {
  res.json(db.phonebook)
})

app.get('/api/phonebook/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const contact = db.phonebook.find((contact) => contact.id === id)
  if (contact) {
    res.json(contact)
  } else {
    res.status(404).end()
  }
})

app.post('/api/phonebook', (req: Request, res: Response) => {
  const contact: Omit<Contact, 'id'> = req.body
  if (!contact || !contact.name || !contact.number) {
    return res.status(400).json({ error: 'content missing' })
  }
  const existingContact = db.phonebook.find((c) => c.name === contact.name)
  if (existingContact) {
    return res.status(400).json({ error: 'name must be unique' })
  }
  const newContact: Contact = {
    id: generateId(db.phonebook),
    name: contact.name,
    number: contact.number,
  }
  db.phonebook = db.phonebook.concat(newContact)
  res.status(201).json(newContact)
})

app.delete('/api/phonebook/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id)
  db.phonebook = db.phonebook.filter((contact) => contact.id !== id)
  res.status(204).end()
})

// * Puerto
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})