import express, { Request, Response } from 'express'
import NoteMongo from '../models/note'
import ContactMongo from '../models/contact'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    const [notes, phonebook] = await Promise.all([
      NoteMongo.find({}).exec(),
      ContactMongo.find({}).exec(),
    ])
    res.json({
      notes,
      phonebook,
    })
  } catch (error) {
    console.error('Error fetching notes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/info', async (req: Request, res: Response) => {
  const date = new Date()
  const [notes, phonebook] = await Promise.all([
    NoteMongo.find({}).exec(),
    ContactMongo.find({}).exec(),
  ])
  const info = `Notes has info for ${notes.length} notes<br>
  Phonebook has info for ${phonebook.length} people<br>${date}`
  res.send(info)
})

export default router