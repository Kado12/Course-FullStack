type PersonsProps = {
  persons: {
    id: string
    name: string
    number: number
  }[]
  filteredPersons: {
    id: string
    name: string
    number: number
  }[]
  removePerson: (id: string) => void
}

const Persons = ({ persons, filteredPersons, removePerson }: PersonsProps) => {
  return (
    <>
      <ul>
        {persons.length > 0 ? filteredPersons.map((p) => (
          <li key={p.id}>
            {p.name} {p.number}
            <button onClick={() => removePerson(p.id)}>Remove</button>
          </li>
        )) : (
          <p>No hay contactos</p>
        )}
      </ul>
    </>
  )
}

export default Persons