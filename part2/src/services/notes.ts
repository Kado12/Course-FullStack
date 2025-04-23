import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

export type Note = {
  id: string
  content: string
  important: boolean
}

const getAll = async (): Promise<Note[]> => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject: Omit<Note, 'id'>) => {
  return axios.post(baseUrl, newObject)
}

const update = async (id: string, newObject: Partial<Note>) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, update }