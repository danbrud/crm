import React, { Component } from 'react'
import TableHeader from './TableHeader';
import axios from 'axios'
import ClientRow from './ClientRow';

class Clients extends Component {

    constructor() {
        super()
        this.state = {
            clients: [],
            searchFilter: "",
            selectedFilter: "name"
        }
    }

    handleFilter = e => this.setState({ [e.target.name]: e.target.value })

    getClients = async () => {
        let clients = await axios.get('http://localhost:3001/clients')
        return clients.data
    }

    componentDidMount = async () => {
        let clients = await this.getClients()
        this.setState({ clients })
    }

    filterClients = () => {

        if (this.state.selectedFilter !== "sold") {
            return this.state.clients
                .filter(c => c[this.state.selectedFilter].toLowerCase()
                    .includes(this.state.searchFilter.toLowerCase()))
        } else {
            return this.state.clients.filter(c => c.sold)
        }
    }

    render() {
        return (
            <div>
                <input type="text" name="searchFilter" placeholder="Search" value={this.state.search} onChange={this.handleFilter} />
                <select name="selectedFilter" value={this.state.selectedFilter} onChange={this.handleFilter}>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="sold">Sold</option>
                    <option value="owner">Owner</option>
                    <option value="country">Country</option>
                </select>
                <TableHeader />
                {this.filterClients().map(c => <ClientRow client={c} key={c._id} />)}
            </div>
        )
    }
}

export default Clients