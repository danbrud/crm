import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
  "_id": "5b9f48a2406b2cd74c55c663",
  "name": "Perkins Cunningham",
  "email": "perkinscunningham@imant.com",
  "firstContact": "2018-11-26T22:00:00.000Z",
  "emailType": "B",
  "sold": true,
  "owner": "Emily Durham",
  "country": "Romania"
},
{
  "_id": "5b9f48a25afcc00e1c1ddfbf",
  "name": "Fischer Hammond",
  "email": "fischerhammond@imant.com",
  "firstContact": "2017-05-15T21:00:00.000Z",
  "emailType": null,
  "sold": false,
  "owner": "Janice Alvarado",
  "country": "Turkey"
},
{
  "_id": "5b9f48a2717f46c7647d2792",
  "name": "Gonzalez Armstrong",
  "email": "gonzalezarmstrong@imant.com",
  "firstContact": "2018-04-05T21:00:00.000Z",
  "emailType": null,
  "sold": false,
  "owner": "Leila Howe",
  "country": "France"
  }
]

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {}
})

export default clientsSlice.reducer;

export const selectAllClients = state => state.clients
