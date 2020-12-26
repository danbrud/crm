import axios from 'axios'
import { API_ENDPOINT } from '../config'

export const client = {
  getClients: () => {
    return axios.get(`${API_ENDPOINT}/api/clients`)
  }
}