type PersonFormProps = {
  addPerson: (event: React.FormEvent<HTMLFormElement>) => void
  newName: string
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  newNumber: string
  handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }: PersonFormProps) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <input type="text" name="name" value={newName} onChange={handleNameChange} />
        <input type="number" name="number" value={newNumber} onChange={handleNumberChange} />
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default PersonForm