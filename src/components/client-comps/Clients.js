import React, { useState } from 'react'
import TableHeader from './TableHeader';
import ClientRow from './ClientRow';
import '../../styles/Clients.css'
import Modal from './Modal';
import { useSelector } from 'react-redux'
import { selectAllClients, selectClientStatus } from '../../state/slices/clientsSlice'
import { useParams } from 'react-router-dom';
import { CLIENT_STATUSES } from '../../CONSTS';
import Loader from '../Loader';
import PaginationBar from './PaginationBar';
import { toProperCase } from '../../utils';

const Clients = () => {
    const { clientId } = useParams()

    const clients = useSelector(selectAllClients)
    const clientStatus = useSelector(selectClientStatus)

    const [filters, setFilters] = useState({ searchFilter: '', selectedFilter: 'name' })
    const [pageNum, setPageNum] = useState(1)

    const handleFilter = e => setFilters({ ...filters, [e.target.name]: e.target.value })

    const currentClients = () => clients.slice((pageNum * 20) - 20, pageNum * 20)

    const filterClients = () => {
        const searchTerm = filters.searchFilter.toLowerCase()

        if (filters.selectedFilter === 'name') {
            return currentClients().filter(c => c.firstName.toLowerCase().includes(searchTerm) || c.surname.toLowerCase().includes(searchTerm))
        } else if (filters.selectedFilter === 'sold') {
            return currentClients().filter(c => c.sold)
        } else {
            return currentClients().filter(c => (c[filters.selectedFilter].toLowerCase().includes(searchTerm)))
        }
    }

    const isInBounds = (direction) => {
        if (direction === 'next') {
            return pageNum * 20 <= clients.length
        } else {
            return pageNum !== 1
        }
    }

    const changePage = (direction) => () => {
        if (isInBounds(direction)) {
            const updatedPageNumber = direction === 'next' ? pageNum + 1 : pageNum - 1
            setPageNum(updatedPageNumber)
        }
    }

    const filterOptions = ['name', 'email', 'sold', 'owner', 'country']
    return (
        <div id="clients-page">
            <div id="search-container">
                <input type="text" name="searchFilter" placeholder="Search" value={filters.searchFilter} onChange={handleFilter} id="search-clients-input" />
                <select id="select-filter" name="selectedFilter" value={filters.selectedFilter} onChange={handleFilter}>
                    {filterOptions.map((filter, i) => <option key={i} value={filter}>{toProperCase(filter)}</option>)}
                </select>
            </div>
            <div id="table">
                <TableHeader />
                {
                    clientStatus === CLIENT_STATUSES.succeeded
                        ? <>
                            {filterClients().map(c => <ClientRow client={c} key={c._id} />)}
                            <PaginationBar changePage={changePage} pageNum={pageNum} totalClients={clients.length}/>
                        </>
                        : <Loader />
                }
            </div>
            {clientId && <Modal clientId={clientId} />}
        </div>
    )
}

export default Clients