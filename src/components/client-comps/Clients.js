import React, { Component } from 'react'
import TableHeader from './TableHeader';
import axios from 'axios'
import ClientRow from './ClientRow';
import '../styles/Clients.css'
import Modal from './Modal';
import { API_ENDPOINT } from '../../config';


class Clients extends Component {

    constructor() {
        super()
        this.state = {
            clients: [],
            searchFilter: "",
            selectedFilter: "name",
            pageNum: 1,
            showModal: false,
            modalClient: {}
        }
    }

    handleFilter = e => this.setState({ [e.target.name]: e.target.value })

    getClients = async () => {
        let clients = await axios.get(`${API_ENDPOINT}/api/clients`)
        return clients.data
    }

    componentDidMount = async () => {
        let clients = await this.getClients()
        this.setState({ clients })
    }

    currentClients = () => this.state.clients.slice((this.state.pageNum * 20) - 20, this.state.pageNum * 20)

    filterClients = () => {

        if (this.state.selectedFilter !== "sold") {
            return this.currentClients()
                .filter(c => c[this.state.selectedFilter].toLowerCase()
                    .includes(this.state.searchFilter.toLowerCase()))
        } else {
            return this.currentClients().filter(c => c.sold)
        }
    }

    pageUp = () => {
        if (this.state.pageNum * 20 > this.state.clients.length) { return }

        let pageNum = this.state.pageNum + 1
        this.setState({ pageNum })
    }

    pageDown = () => {
        if (this.state.pageNum === 1) { return }

        let pageNum = this.state.pageNum - 1
        this.setState({ pageNum })
    }

    showCurrentClientNum = () => {

        let topNum = this.state.pageNum * 20
        let lowNum = topNum - 19

        return (
            <div id="paging">
                <i className="fas fa-chevron-left" onClick={this.pageDown}></i>
                <p>{lowNum} - {this.state.pageNum * 20 > this.state.clients.length && this.state.clients.length ? 'END' : topNum}</p>
                <i className="fas fa-chevron-right" onClick={this.pageUp}></i>
            </div>
        )
    }

    popModal = (name, surname, country, id) => {
        let modalClient = {name, surname, country, id}
        this.setState({showModal: true, modalClient})
    }

    closeModal = () => this.setState({showModal: false, modalClient: {}})

    updateClient = async () => {
        let clients = await this.getClients()
        this.setState({showModal: false, modalClient: {}, clients})
    }

    render() {

        return (
            <div id="clients-page">
                <div id="search-container">

                    <input type="text" name="searchFilter" placeholder="Search" value={this.state.search} onChange={this.handleFilter} id="search-clients-input" />
                    <select id="select-filter" name="selectedFilter" value={this.state.selectedFilter} onChange={this.handleFilter}>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="sold">Sold</option>
                        <option value="owner">Owner</option>
                        <option value="country">Country</option>
                    </select>
                </div>
                <div id="table">
                    <TableHeader />
                    {this.filterClients().map(c => <ClientRow popModal={this.popModal} client={c} key={c._id} />)}
                    {this.showCurrentClientNum()}
                </div>
                {this.state.showModal ? <Modal
                                name={this.state.modalClient.name}
                                surname={this.state.modalClient.surname}
                                country={this.state.modalClient.country}
                                id={this.state.modalClient.id}
                                closeModal={this.closeModal}
                                updateClient={this.updateClient} /> : null}
            </div>
        )
    }
}

export default Clients