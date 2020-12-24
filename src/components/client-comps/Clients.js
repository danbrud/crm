import React, { useState } from 'react'
import TableHeader from './TableHeader';
import axios from 'axios'
import ClientRow from './ClientRow';
import '../styles/Clients.css'
import Modal from './Modal';
import { API_ENDPOINT } from '../../config';
import { useSelector } from 'react-redux'
import { selectAllClients } from '../../state/slices/clientsSlice'
import { useParams } from 'react-router-dom';

const Clients = () => {
    const { clientId } = useParams()

    const clients = useSelector(selectAllClients)

    const [filters, setFilters] = useState({ searchFilter: '', selectedFilter: 'name' })
    const [pageNum, setPageNum] = useState(1)

    const handleFilter = e => setFilters({ ...filters, [e.target.name]: e.target.value })

    const getClients = async () => {
        const clients = await axios.get(`${API_ENDPOINT}/api/clients`)
        return clients.data
    }

    // componentDidMount = async () => {
    // const clients = await this.getClients()
    // this.setState({ clients })
    // }

    const currentClients = () => clients.slice((pageNum * 20) - 20, pageNum * 20)

    const filterClients = () => {

        if (filters.selectedFilter !== "sold") {
            return currentClients()
                .filter(c => c[filters.selectedFilter].toLowerCase()
                    .includes(filters.searchFilter.toLowerCase()))
        } else {
            return currentClients().filter(c => c.sold)
        }
    }

    const pageUp = () => {
        if (this.state.pageNum * 20 > this.state.clients.length) { return }

        const pageNum = this.state.pageNum + 1
        this.setState({ pageNum })
    }

    const pageDown = () => {
        if (this.state.pageNum === 1) { return }

        const pageNum = this.state.pageNum - 1
        this.setState({ pageNum })
    }

    const showCurrentClientNum = () => {

        const topNum = this.state.pageNum * 20
        const lowNum = topNum - 19

        return (
            <div id="paging">
                <i className="fas fa-chevron-left" onClick={this.pageDown}></i>
                <p>{lowNum} - {this.state.pageNum * 20 > this.state.clients.length && this.state.clients.length ? 'END' : topNum}</p>
                <i className="fas fa-chevron-right" onClick={this.pageUp}></i>
            </div>
        )
    }

    const popModal = (name, surname, country, id) => {
        const modalClient = { name, surname, country, id }
        this.setState({ showModal: true, modalClient })
    }

    const updateClient = async () => {
        const clients = await this.getClients()
        this.setState({ showModal: false, modalClient: {}, clients })
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
                {filterClients().map(c => <ClientRow client={c} key={c._id} />)}
                {/* {showCurrentClientNum()} */}
            </div>
            {clientId && <Modal clientId={clientId} />}
        </div>
    )
}

export default Clients