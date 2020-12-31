import React from 'react'
import { CLIENT_STATUSES } from '../../CONSTS'
import TableData from './TableData'
import TableHeader from './TableHeader'

const ClientsTable = ({ filters }) => {

  return (
    <div id="table">
      <TableHeader />
      <TableData filters={filters} />
    </div>
  )
}

export default ClientsTable