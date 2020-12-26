import React, { Component } from 'react'
import Badges from './Badges'
import axios from 'axios'
import Charts from './Charts';
import '../styles/Loader.css'
import { API_ENDPOINT } from '../../config';
import Loader from '../Loader';

class Analytics extends Component {

    constructor() {
        super()
        this.state = {
            clients: [],
            isLoading: true
        }
    }


    getClients = async () => {
        const clients = await axios.get(`${API_ENDPOINT}/api/clients`)
        return clients.data
    }

    componentDidMount = async () => {
        const clients = await this.getClients()
        this.setState({ clients, isLoading: false })
    }

    render() {

        return (
            <div>
                {
                    this.state.isLoading
                        ? <Loader />
                        : <div>
                            <Badges clients={this.state.clients} />
                            <Charts clients={this.state.clients} />
                        </div>
                }
            </div>
        )
    }
}

export default Analytics