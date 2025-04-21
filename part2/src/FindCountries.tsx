
import { useEffect, useState } from "react"
import countriesServices, { Country as CountryType } from "./services/countries"

const FindCountries = () => {
  const [allCountries, setAllCountries] = useState<CountryType[]>([])
  const [filter, setFilter] = useState('')


  useEffect(() => {
    const fecthCountries = async () => {
      try {
        const getAllCountries = await countriesServices.getAll()
        setAllCountries(getAllCountries)
      }
      catch (error) {
        console.error('Error fetching notes:', error)
      }
    }
    fecthCountries()
  }, [])

  const filteredCountries = allCountries.filter((countrie) =>
    countrie.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  const handleShowButtonClick = (countrie: CountryType) => {
    console.log('Button clicked for:', countrie.name.common)
    setFilter(countrie.name.common)
  }

  return (
    <>
      <h1>Buscar Paises</h1>
      <input type="text" placeholder="Busca un país..." value={filter} onChange={handleFilterChange} />
      <ul>
        {filteredCountries.length > 10 ? (
          <p>Demasiados resultados, especifica más la búsqueda</p>
        ) : filteredCountries.length === 1 ? (
          <div>
            <h2>{filteredCountries[0].name.common}</h2>
            <p>Capital: {filteredCountries[0].capital}</p>
            <p>Población: {filteredCountries[0].population}</p>
            <h3>Idiomas:</h3>
            <ul>
              {Object.values(filteredCountries[0].languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <img src={filteredCountries[0].flags.png} alt={filteredCountries[0].flags.alt} />
          </div>
        ) : (
          filteredCountries.map((countrie) => (
            <>
              <li key={countrie.name.common}>{countrie.name.common}
                <button onClick={() => handleShowButtonClick(countrie)}>Show</button>
              </li>
            </>
          ))
        )}
      </ul>
    </>
  )
}

export default FindCountries