import React, { Component } from 'react'
import ClientInput from './ClientInput';
import axios from 'axios';
import '../styles/UpdateClient.css'

class UpdateClient extends Component {

    constructor() {
        super()
        this.state = {
            clients: [],
            clientIdToUpdate: ""
        }
    }

    updateClientID = clientIdToUpdate => this.setState({ clientIdToUpdate })

    getClients = async () => {
        let clients = await axios.get('http://localhost:3001/clients/actions')
        return clients.data
    }

    componentDidMount = async () => {
        let clients = await this.getClients()
        this.setState({ clients })
    }

    createEmailDropdownElement = () => {
        return (
            <select name="emailType">
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
            </select>
        )
    }

    createOwnerDropdownElement = () => {

    }

    render() {
        return (
            <div id="update-action">
                <h3>UPDATE</h3>
                <ClientInput updateClientID={this.updateClientID} clients={this.state.clients} />

                <div className="update-client" id="transfer-ownership">
                    <p>Transfer ownership to:</p>
                    <select name="" id=""></select>
                    <div id="transfer-btn">TRANSFER</div>
                </div>

                <div className="update-client" id="send-email">
                    <p>Send email:</p>
                    {this.createEmailDropdownElement()}
                    <div id="send-email-btn">SEND</div>
                </div>
                
                <div className="update-client" id="declare-sale">
                    <p>Declare sale!</p>
                    <div></div>
                    <div id="declare-sale-btn">DECLARE</div>
                </div >
            </div >
        )
    }
}

export default UpdateClient