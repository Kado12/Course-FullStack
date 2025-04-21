import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import App2 from './App2.jsx'
import Feedback from './Feedback.jsx'
import Anecdotes from './Anecdotes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <hr />
    <App2 />
    <hr />
    <Feedback />
    <hr />
    <Anecdotes />
  </StrictMode>,
)
