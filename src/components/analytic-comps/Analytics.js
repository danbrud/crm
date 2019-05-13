import React, { Component } from 'react'
import Badges from './Badges'
import axios from 'axios'

class Analytics extends Component {

    constructor() {
        super()
        this.state = {
            clients: []
        }
    }


    getClients = async () => {
        let clients = await axios.get('http://localhost:3001/clients')
        return clients.data
    }

    componentDidMount = async () => {
        let clients = await this.getClients()
        this.setState({ clients })
    }

    render() {
        console.log(this.state.clients)

        return (
            <div>
                <Badges clients={this.state.clients}/>
            </div>
        )
    }
}

export default Analytics