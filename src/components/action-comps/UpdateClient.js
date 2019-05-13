import React, { Component } from 'react'
import ClientInput from './ClientInput';
import axios from 'axios';
import '../styles/UpdateClient.css'

class UpdateClient extends Component {

    constructor() {
        super()
        this.state = {
            clients: [],
            clientIdToUpdate: "",
            newOwner: "",
            newEmailType: "",
            disableEmptySelect: { newOwner: false, newEmailType: false }
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
            <select name="newEmailType" value={this.state.newEmailType} onChange={this.handleSelections}>
                <option selected disabled={this.state.disableEmptySelect.newEmailType ? true : null}> -- select an email -- </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
        )
    }

    createOwnerDropdownElement = () => {
        let availableOwners = []
        this.state.clients.forEach(c => availableOwners.some(ao => ao === c.owner) ?
            null : availableOwners.push(c.owner))

        return availableOwners.map(ao => <option value={ao}>{ao}</option>)
    }

    updateUser = async (propertyToUpdate, updateValue) => {
        await axios.put(`http://localhost:3001/client/${this.state.clientIdToUpdate}/?propToUpdate=${propertyToUpdate}`, {value: updateValue})
    }

    handleSelections = e => {
        if (this.state.disableEmptySelect[e.target.name]) {
            this.setState({ [e.target.name]: e.target.value })
        } else {
            let disableEmptySelect = { ...this.state.disableEmptySelect }
            disableEmptySelect[e.target.name] = true

            this.setState({ [e.target.name]: e.target.value, disableEmptySelect })
        }
    }

    checkState = () => this.state.clientIdToUpdate ? true : false

    transferOwnership = () => this.checkState() ? this.updateUser('owner', this.state.newOwner) : null

    sendEmail = () => this.checkState() ? this.updateUser('emailType', this.state.newEmailType) : null

    declareSale = () => this.checkState() ? this.updateUser('sold', true) : null

    render() {
        return (
            <div id="update-action">
                <h3>UPDATE</h3>
                <ClientInput updateClientID={this.updateClientID} clients={this.state.clients} />

                <div className="update-client" id="transfer-ownership">
                    <p>Transfer ownership to:</p>
                    <select name="newOwner" value={this.state.newOwner} onChange={this.handleSelections}>
                        <option selected disabled={this.state.disableEmptySelect.newOwner ? true : null}> -- select an owner -- </option>
                        {this.createOwnerDropdownElement()}
                    </select>
                    <div id="transfer-btn" onClick={this.transferOwnership}>TRANSFER</div>
                </div>

                <div className="update-client" id="send-email">
                    <p>Send email:</p>
                    {this.createEmailDropdownElement()}
                    <div id="send-email-btn" onClick={this.sendEmail}>SEND</div>
                </div>

                <div className="update-client" id="declare-sale">
                    <p>Declare sale!</p>
                    <div></div>
                    <div id="declare-sale-btn" onClick={this.declareSale}>DECLARE</div>
                </div >
            </div >
        )
    }
}

export default UpdateClient