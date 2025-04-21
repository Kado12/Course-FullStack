import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/phonebook'

export type Contact = {
  id: number
  name: string
  number: number
}

const getAll = async (): Promise<Contact[]> => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject: Omit<Contact, 'id'>) => {
  return axios.post(baseUrl, newObject)
}

const update = async (id: number, newObject: Partial<Contact>) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = async (id: number) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, remove }