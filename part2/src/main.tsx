import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Courses from './Courses.tsx'
import Phonebook from './Phonebook.tsx'
import FindCountries from './FindCountries.tsx'

// const notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true
//   }
// ]

// type Persons = { id: number; name: string; number: number }[];
// const persons: Persons = [];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <hr />
    <Courses />
    <hr />
    <Phonebook />
    <hr />
    <FindCountries />
    <hr />
  </StrictMode>,
)
