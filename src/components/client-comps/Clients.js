import React, { useState, useEffect } from 'react'
import TableHeader from './TableHeader';
import ClientRow from './ClientRow';
import '../styles/Clients.css'
import Modal from './Modal';
import { useSelector, useDispatch } from 'react-redux'
import { selectAllClients, fetchClients, selectClientStatus } from '../../state/slices/clientsSlice'
import { useParams } from 'react-router-dom';
import { CLIENT_STATUSES } from '../../state/clientStatuses';
import Loader from '../Loader';

const Clients = () => {
    const { clientId } = useParams()

    const dispatch = useDispatch()
    const clients = useSelector(selectAllClients)
    const clientStatus = useSelector(selectClientStatus)

    const [filters, setFilters] = useState({ searchFilter: '', selectedFilter: 'name' })
    const [pageNum, setPageNum] = useState(1)

    useEffect(() => {
        if (clientStatus === 'idle') {
            //add CLIENT_STATUSES in condition
            dispatch(fetchClients())
        }
    }, [clientStatus, dispatch]) //Come back and learn why I need to add this

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

    const showCurrentClientNum = () => {

        const topNum = pageNum * 20
        const lowNum = topNum - 19

        return (
            <div id="paging">
                <i className="fas fa-chevron-left" onClick={changePage('previous')}></i>
                <p>{lowNum} - {pageNum * 20 > clients.length && clients.length ? 'END' : topNum}</p>
                <i className="fas fa-chevron-right" onClick={changePage('next')}></i>
            </div>
        )
    }

    return (
        <div id="clients-page">
            <div id="search-container">

                <input type="text" name="searchFilter" placeholder="Search" value={filters.searchFilter} onChange={handleFilter} id="search-clients-input" />
                <select id="select-filter" name="selectedFilter" value={filters.selectedFilter} onChange={handleFilter}>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="sold">Sold</option>
                    <option value="owner">Owner</option>
                    <option value="country">Country</option>
                </select>
            </div>
            <div id="table">
                <TableHeader />
                {
                    clientStatus === CLIENT_STATUSES.succeeded
                        ? <>
                            {filterClients().map(c => <ClientRow client={c} key={c._id} />)}
                            {showCurrentClientNum()}
                        </>
                        : <Loader />
                }
            </div>
            {clientId && <Modal clientId={clientId} />}
        </div>
    )
}

export default Clients