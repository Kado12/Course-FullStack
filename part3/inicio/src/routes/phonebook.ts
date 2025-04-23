import express, { Request, Response } from 'express'
import ContactMongo from '../models/contact'
import { Contact } from '../types/contact'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const contacts = await ContactMongo.find({})
  res.json(contacts)
})

router.get('/:id', async (req: Request, res: Response) => {
  const contact = await ContactMongo.findById(req.params.id)
  if (contact) {
    res.json(contact)
  } else {
    res.status(404).json({ error: 'contact not found' })
  }
})

router.post('/', async (req: Request, res: Response) => {
  const { name, number }: Omit<Contact, 'id'> = req.body
  if (!name || !number) {
    return res.status(400).json({ error: 'name or number missing' })
  }
  const contact = new ContactMongo({ name, number })
  const savedContact = await contact.save()
  res.status(201).json(savedContact)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const result = await ContactMongo.findByIdAndDelete(req.params.id)
  if (result) {
    res.status(204).end()
  } else {
    res.status(404).json({ error: 'contact not found' })
  }
})

export default router