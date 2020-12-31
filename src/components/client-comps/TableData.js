import React from 'react'
import { useSelector } from 'react-redux'
import { CLIENT_STATUSES } from '../../CONSTS'
import { selectAllClients, selectClientStatus } from '../../state/slices/clientsSlice'
import Loader from '../Loader'
import ClientRow from './ClientRow'
import PaginationBar from './PaginationBar'

const TableData = ({ filters, pageNum, setPageNum }) => {
  const clients = useSelector(selectAllClients)
  const clientStatus = useSelector(selectClientStatus)

  let clientsToDisplay = clients
  const searchTerm = filters.searchFilter.toLowerCase()

  const isInBounds = (direction) => direction === 'next' ? pageNum * 20 <= clientsToDisplay.length : pageNum !== 1

  const changePage = (direction) => () => {
    if (isInBounds(direction)) {
      const updatedPageNumber = direction === 'next' ? pageNum + 1 : pageNum - 1
      setPageNum(updatedPageNumber)
    }
  }

  if (filters.selectedFilter === 'name') {
    clientsToDisplay = clients.filter(c => c.firstName.toLowerCase().includes(searchTerm) || c.surname.toLowerCase().includes(searchTerm))
  } else if (filters.selectedFilter === 'sold') {
    clientsToDisplay = clients.filter(c => c.sold)
  } else {
    clientsToDisplay = clients.filter(c => (c[filters.selectedFilter].toLowerCase().includes(searchTerm)))
  }

  return (
    clientStatus === CLIENT_STATUSES.succeeded
      ? <>
        {
          clientsToDisplay
            .slice((pageNum * 20) - 20, pageNum * 20)
            .map(c => <ClientRow client={c} key={c._id} />)
        }
        <PaginationBar changePage={changePage} pageNum={pageNum} totalClients={clientsToDisplay.length} />
      </>
      : <Loader />
  )
}

export default TableData