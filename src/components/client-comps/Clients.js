import React, { Component } from 'react'
import TableHeader from './TableHeader';
import axios from 'axios'
import ClientRow from './ClientRow';

class Clients extends Component {

    constructor() {
        super()
        this.state = {
            clients: [],
            search: ""
        }
    }

    handleInput = e => this.setState({search: e.target.value})

    getClients = async () => {
        let clients = await axios.get('http://localhost:3001/clients')
        return clients.data
    }

    componentDidMount = async () => {
        let clients = await this.getClients()
        this.setState({ clients })
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Search" value={this.state.search} onChange={this.handleInput} />
                <select name="filter">
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="sold">Sold</option>
                    <option value="owner">Owner</option>
                    <option value="country">Country</option>
                </select>
                <TableHeader />
                {this.state.clients.map(c => <ClientRow client={c} key={c._id}/>)}
            </div>
        )
    }
}

export default Clients