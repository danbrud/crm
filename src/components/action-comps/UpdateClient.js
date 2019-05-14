import React, { Component } from 'react'
import ClientInput from './ClientInput';
import axios from 'axios';
import '../styles/UpdateClient.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

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

    createMaterialEmailDropdownElement = () => {
        return (
            <Select
                value={this.state.newEmailType} onChange={this.handleSelections}
                inputProps={{
                    name: 'newEmailType',
                }}
            >
                <MenuItem disabled={this.state.disableEmptySelect.newOwner ? true : null}>
                    <em>-- select an owner --</em>
                </MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
            </Select>
        )
    }

    createOwnerDropdownElement = () => {
        let availableOwners = []
        this.state.clients.forEach(c => availableOwners.some(ao => ao === c.owner) ?
            null : availableOwners.push(c.owner))

        return availableOwners.map(ao => <option value={ao}>{ao}</option>)
    }

    createOwnerMaterialDropdownElement = () => {
        let availableOwners = []
        this.state.clients.forEach(c => availableOwners.some(ao => ao === c.owner) ?
            null : availableOwners.push(c.owner))

        return availableOwners.map(ao => <MenuItem value={ao}>{ao}</MenuItem>)
    }

    updateUser = async (propertyToUpdate, updateValue) => {
        await axios.put(`http://localhost:3001/client/${this.state.clientIdToUpdate}/?propToUpdate=${propertyToUpdate}`, { value: updateValue })
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
                    <FormControl >
                        <InputLabel>Transfer Ownership To</InputLabel>

                        <Select
                            value={this.state.newOwner} onChange={this.handleSelections}
                            inputProps={{
                                name: 'newOwner',
                                id: 'age-simple',
                            }}
                        >
                            <MenuItem disabled={this.state.disableEmptySelect.newOwner ? true : null}>
                                <em>-- select an owner --</em>
                            </MenuItem>
                            {this.createOwnerMaterialDropdownElement()}
                        </Select>
                    </FormControl>
                    <Button id="transfer-btn" onClick={this.transferOwnership} className="action-btn">TRANSFER</Button>




                    {/* <p>Transfer ownership to:</p>
                    <select name="newOwner" value={this.state.newOwner} onChange={this.handleSelections}>
                        <option selected disabled={this.state.disableEmptySelect.newOwner ? true : null}> -- select an owner -- </option>
                        {this.createOwnerDropdownElement()}
                    </select>
                    <div id="transfer-btn" onClick={this.transferOwnership}>TRANSFER</div> */}
                </div>

                <div className="update-client" id="send-email">

                    <FormControl >
                        <InputLabel>Send Email</InputLabel>
                        {this.createMaterialEmailDropdownElement()}
                    </FormControl>
                    <Button id="send-email-btn" onClick={this.sendEmail} className="action-btn">SEND</Button>

                {/* <p>Send email:</p>
                    {this.createEmailDropdownElement()}
                    <div id="send-email-btn" onClick={this.sendEmail}>SEND</div> */}
            </div>

            <div className="update-client" id="declare-sale">

            <div>Declare sale!</div>
            <Button id="declare-sale-btn" onClick={this.declareSale} className="action-btn">DECLARE</Button>

                {/* <p>Declare sale!</p>
                    <div></div>
                    <div id="declare-sale-btn" onClick={this.declareSale}>DECLARE</div> */}
            </div >
            </div >
        )
    }
}

export default UpdateClient