import React, { useEffect, useState } from 'react'
import TableData from './TableData'
import TableHeader from './TableHeader'

const ClientsTable = ({ filters }) => {
  const [pageNum, setPageNum] = useState(1)

  useEffect(() => {
      setPageNum(1)
  }, [filters.searchFilter])

  return (
    <div id="table">
      <TableHeader />
      <TableData filters={filters} pageNum={pageNum} setPageNum={setPageNum} />
    </div>
  )
}

export default ClientsTable