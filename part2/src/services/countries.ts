import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

export type Country = {
  name: {
    common: string;
  };
  capital: string[];
  population: number;
  flags: {
    png: string;
    alt: string;
  };
  languages: {
    [key: string]: string;
  };
};

const getAll = async (): Promise<Country[]> => {
  const response = await axios.get(`${baseUrl}/all`)
  return response.data
}

export default { getAll }