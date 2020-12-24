import { configureStore } from '@reduxjs/toolkit'
import clientsReducer from './slices/clientsSlice'

export const store = configureStore({
  reducer: {
    clients: clientsReducer
  }
})