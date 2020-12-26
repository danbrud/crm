import axios from 'axios'
import { API_ENDPOINT } from '../config'

export const apiClient = {
  getClients: () => {
    return axios.get(`${API_ENDPOINT}/clients`)
  },
  addNewClient: (client) => {
    return axios.post(`${API_ENDPOINT}/clients`, client)
  }
}