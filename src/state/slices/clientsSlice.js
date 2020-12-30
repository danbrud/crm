import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiClient } from '../../api/apiClient'
import { CLIENT_STATUSES } from '../../CONSTS'
import { generateBadges } from '../helpers/generateBadges'
import { generateClientAquisitionChart } from '../helpers/generateClientAquisitionChart'
import { generateSalesByChart } from '../helpers/generateSalesByChart'
import { generateSalesSinceChart } from '../helpers/generateSalesSinceChart'
import { generateTopEmployeeChart } from '../helpers/generateTopEmployeeChart'

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const response = await apiClient.getClients()
  return response.data
})

export const addNewClient = createAsyncThunk('clients/addNewClient', async client => {
  const response = await apiClient.addNewClient(client)
  return response.data
})

export const updateClient = createAsyncThunk('clients/updateClient', async valuesToUpdate => {
  const response = await apiClient.updateClient(valuesToUpdate)
  return response.data
})

const initialState = {
  data: [],
  status: CLIENT_STATUSES.idle,
  error: null,
}

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchClients.pending]: (state, action) => {
      state.status = CLIENT_STATUSES.pending
    },
    [fetchClients.fulfilled]: (state, action) => {
      state.status = CLIENT_STATUSES.succeeded
      state.data = state.data.concat(action.payload)
    },
    [fetchClients.rejected]: (state, action) => {
      state.status = CLIENT_STATUSES.failed
      state.error = action.error.message
    },
    [addNewClient.fulfilled]: (state, action) => {
      state.data.push(action.payload)
    },
    [updateClient.fulfilled]: (state, action) => {
      const { _id: clientId } = action.payload

      const clientIndex = state.data.findIndex(client => client._id === clientId)
      state.data[clientIndex] = action.payload
    }
  }
})

export default clientsSlice.reducer;

export const selectAllClients = state => state.clients.data

export const selectClientById = (state, clientId) => state.clients.data.find(client => client._id === clientId)

export const selectClientsForDataList = state => state.clients.data.map(client => ({ _id: client._id, name: `${client.firstName} ${client.surname}`, owner: client.owner }))

export const selectAvailableOwners = state => [...new Set(state.clients.data.map(client => client.owner))]

export const selectClientStatus = state => state.clients.status

export const selectBadges = state => generateBadges(state.clients.data)

export const selectTopEmployeeChart = state => generateTopEmployeeChart(state.clients.data)

export const selectSalesByChart = (state, salesBySelection) => generateSalesByChart(state.clients.data, salesBySelection)

export const selectSalesSinceChart = state => generateSalesSinceChart(state.clients.data)

export const selectClientAquisitionChart = state => generateClientAquisitionChart(state.clients.data)

