export const API_ENDPOINT = process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.REACT_APP_API_PORT}/api` : '/api'

export const CLIENT_STATUSES = {
  idle: 'idle',
  pending: 'pending',
  succeeded: 'succeeded',
  failed: 'failed'
}

export const MONTHS_TO_NUMBERS = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12
}

export const SNACKBAR_MESSAGES = {
  added: 'Client added!',
  notAdded: 'Enter all fields & try again',
  updated: 'Client updated!',
  notUpdated: 'Make sure to select an option & try again'
}