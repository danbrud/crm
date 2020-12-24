import React, { useState } from 'react'
import TableHeader from './TableHeader';
import axios from 'axios'
import ClientRow from './ClientRow';
import '../styles/Clients.css'
import Modal from './Modal';
import { API_ENDPOINT } from '../../config';
import { useSelector } from 'react-redux'
import { selectAllClients } from '../../state/slices/clientsSlice'

const Clients = () => {
    const clients = useSelector(selectAllClients)
    const [filters, setFilters] = useState({ searchFilter: '', selectedFilter: 'name' })
    const [pageNum, setPageNum] = useState(1)
    // constructor() {
    //     super()
    //     this.state = {
    //
    //         showModal: false,
    //         modalClient: {}
    //     }
    // }

    const handleFilter = e => setFilters({ ...filters, [e.target.name]: e.target.value })

    const getClients = async () => {
        const clients = await axios.get(`${API_ENDPOINT}/api/clients`)
        return clients.data
    }

    // componentDidMount = async () => {
    // const clients = await this.getClients()
    // const clients = [
    //     {
    //         "_id": "5b9f48a2406b2cd74c55c663",
    //         "name": "Perkins Cunningham",
    //         "email": "perkinscunningham@imant.com",
    //         "firstContact": "2018-11-26T22:00:00.000Z",
    //         "emailType": "B",
    //         "sold": true,
    //         "owner": "Emily Durham",
    //         "country": "Romania"
    //     },
    //     {
    //         "_id": "5b9f48a25afcc00e1c1ddfbf",
    //         "name": "Fischer Hammond",
    //         "email": "fischerhammond@imant.com",
    //         "firstContact": "2017-05-15T21:00:00.000Z",
    //         "emailType": null,
    //         "sold": false,
    //         "owner": "Janice Alvarado",
    //         "country": "Turkey"
    //     },
    //     {
    //         "_id": "5b9f48a2717f46c7647d2792",
    //         "name": "Gonzalez Armstrong",
    //         "email": "gonzalezarmstrong@imant.com",
    //         "firstContact": "2018-04-05T21:00:00.000Z",
    //         "emailType": null,
    //         "sold": false,
    //         "owner": "Leila Howe",
    //         "country": "France"
    //     }
    // ]
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

    const closeModal = () => this.setState({ showModal: false, modalClient: {} })

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
                {filterClients().map(c => <ClientRow popModal={popModal} client={c} key={c._id} />)}
                {/* {showCurrentClientNum()} */}
            </div>
            {/* {this.state.showModal ? <Modal
                name={this.state.modalClient.name}
                surname={this.state.modalClient.surname}
                country={this.state.modalClient.country}
                id={this.state.modalClient.id}
                closeModal={this.closeModal}
                updateClient={this.updateClient} /> : null} */}
        </div>
    )
}

export default Clients