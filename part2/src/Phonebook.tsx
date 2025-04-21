import { useEffect, useState } from "react"
import phonebookServices, { Person as PersonType } from "./services/phonebook"

// * Componentes
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import PhonebookNotification from "./components/PhonebookNotification"

const Phonebook = () => {

  // ? Colocar las variables primero
  const [persons, setPersons] = useState<PersonType[]>([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [notificationMessage, setNotificationMessage] = useState<string[] | null>(null)

  // * UseEffect para cargar los datos de la API
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const getAllPersons = await phonebookServices.getAll()
        setPersons(getAllPersons)
      }
      catch (error) {
        console.error('Error fetching notes:', error)
      }
    }
    fetchNotes()
  }, [])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  const addPerson = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      if (newName === '' || newNumber === '' || persons.find(p => p.name === newName)) {
        alert('No puees agregar este contacto')
        return
      }
      const personObject = {
        name: newName,
        number: Number(newNumber),
      }
      const newPersonCreated = await phonebookServices.create(personObject)
      setPersons(persons.concat(newPersonCreated.data))
      setNewName('')
      setNewNumber('')
      setNotificationMessage(['Success', 'Added', newName])
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch (error) {
      console.error('Error adding note:', error)
    }
  }

  const removePerson = async (id: string) => {
    try {
      if (!window.confirm('¿Estás seguro de eliminar este contacto?')) {
        return
      }
      const response = await phonebookServices.remove(id)
      setPersons(persons.filter((p) => p.id !== id))
      setNotificationMessage(['Success', 'Remove', response.data.name])
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
    catch (error) {
      setNotificationMessage(['Error', 'Remove'])
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
      console.error('Error removing person:', error)
    }
  }

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase()) || p.number.toString().includes(filter)
  )

  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <PhonebookNotification notificationMessage={notificationMessage} />
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <h2>Add new</h2>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
        <h2>Numbers</h2>
        <Persons persons={persons} filteredPersons={filteredPersons} removePerson={removePerson} />
      </div>
    </>
  )
}

export default Phonebook