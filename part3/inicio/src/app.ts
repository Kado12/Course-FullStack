import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import apiRouter from './routes/api'
import notesRouter from './routes/notes'
import phonebookRouter from './routes/phonebook'
import { unknownEndpoint, errorHandler } from './utils/middleware'
import { MONGO_URL } from './utils/config'

const app = express()

// ? Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

// ? Conexión a MongoDB
mongoose.set('strictQuery', false)
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

// ? Rutas
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Notes API</h1>')
})
app.use('/api', apiRouter)
app.use('/api/notes', notesRouter)
app.use('/api/phonebook', phonebookRouter)

// ? Middlewares personalizados
app.use(unknownEndpoint)
app.use(errorHandler)

export default app