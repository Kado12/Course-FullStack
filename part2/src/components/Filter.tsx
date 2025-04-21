type FilterProps = {
  filter: string
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Filter = ({ filter, handleFilterChange }: FilterProps) => {
  return (
    <>
      <label htmlFor="filter">Filter shown with: </label>
      <input type="text" name="filter" id="filter" placeholder="Filter by name" value={filter} onChange={handleFilterChange} />
    </>
  )
}

export default Filter