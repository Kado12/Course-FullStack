import express, { Request, Response } from 'express'
import NoteMongo from '../models/note'
import { Note } from '../types/note'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const notes = await NoteMongo.find({})
  res.json(notes)
})

router.get('/:id', async (req: Request, res: Response) => {
  const note = await NoteMongo.findById(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).json({ error: 'note not found' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  const { content, important }: Omit<Note, 'id'> = req.body
  if (!content) {
    return res.status(400).json({ error: 'content missing' })
  }
  const note = new NoteMongo({ content, important: important || false })
  const savedNote = await note.save()
  res.status(201).json(savedNote)
})

router.put('/:id', async (req: Request, res: Response) => {
  const { content, important }: Omit<Note, 'id'> = req.body
  const updatedNote = await NoteMongo.findByIdAndUpdate(
    req.params.id,
    { content, important },
    { new: true }
  )
  if (updatedNote) {
    res.json(updatedNote)
  } else {
    res.status(404).json({ error: 'note not found' })
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await NoteMongo.findByIdAndDelete(req.params.id)
  if (result) {
    res.status(204).end()
  } else {
    res.status(404).json({ error: 'note not found' })
  }
})

export default router