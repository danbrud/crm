import React, { Component } from 'react'
import Badges from './Badges'
import axios from 'axios'
import Charts from './Charts';
import '../styles/Analytics.css'
import { API_ENDPOINT } from '../../config';

class Analytics extends Component {

    constructor() {
        super()
        this.state = {
            clients: [],
            isLoading: true
        }
    }


    getClients = async () => {
        let clients = await axios.get(`${API_ENDPOINT}/api/clients`)
        return clients.data
    }

    componentDidMount = async () => {
        let clients = await this.getClients()
        this.setState({ clients, isLoading: false })
    }

    showLoader = () => {
        return (
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        )
    }

    showData = () => {
        return (
            <div>
                <Badges clients={this.state.clients} />
                <Charts clients={this.state.clients} />
            </div>
        )
    }

    render() {

        return (
            <div>
                {this.state.isLoading ? this.showLoader() : this.showData()}
            </div>
        )
    }
}

export default Analytics