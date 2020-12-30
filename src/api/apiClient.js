import axios from 'axios'
import { API_ENDPOINT } from '../CONSTS'

export const apiClient = {
  getClients: () => {
    return axios.get(`${API_ENDPOINT}/clients`)
  },
  addNewClient: client => {
    return axios.post(`${API_ENDPOINT}/clients`, client)
  },
  updateClient: (valuesToUpdate) => {
    const { clientId, payload, isModal } = valuesToUpdate
    return isModal
      ? axios.put(`${API_ENDPOINT}/clients/modal/${clientId}`, payload)
      : axios.put(`${API_ENDPOINT}/clients/${clientId}`, payload)
  }
}