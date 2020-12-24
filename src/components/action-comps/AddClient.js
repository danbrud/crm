import React, { Component } from 'react'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { API_ENDPOINT } from '../../config';

class AddClient extends Component {

    constructor() {
        super()
        this.state = {
            firstName: "",
            surname: "",
            email: "",
            country: "",
            owner: ""
        }
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    isStateSet = () => {
        let isStateSet = true
        const stateKeys = Object.keys(this.state)
        stateKeys.forEach(sk => this.state[sk] ? null : isStateSet = false)

        return isStateSet
    }

    saveClient = async (client) => {
        await axios.post(`${API_ENDPOINT}/client`, client)
    }

    clearInputs = () => this.setState({
        firstName: "",
        surname: "",
        email: "",
        country: "",
        owner: ""
    })

    addClient = () => {
        if (this.isStateSet()) {
            const client = {
                name: `${this.state.firstName} ${this.state.surname}`,
                email: this.state.email,
                firstContact: new Date(),
                owner: this.state.owner,
                country: this.state.country
            }
            this.saveClient(client)
            this.clearInputs()
            this.props.showSnackbar("Added")
        } else {
            this.props.showSnackbar("Not added")
        }
    }

    render() {
        return (
            <div id="create-action">
                <h4>ADD CLIENT</h4>

                <div id="input-fields">


                    <TextField
                        className="standard-name"
                        label="First Name"
                        name="firstName"
                        value={this.state.firstName} onChange={this.handleInput}
                        margin="none"
                    />

                    <TextField
                        className="standard-name"
                        label="Surname"
                        name="surname" value={this.state.surname} onChange={this.handleInput}
                        margin="none"
                    />

                    <TextField
                        className="standard-name"
                        label="Email"
                        name="email" value={this.state.email} onChange={this.handleInput}
                        margin="none"
                    />

                    <TextField
                        className="standard-name"
                        label="Country"
                        name="country" value={this.state.country} onChange={this.handleInput}
                        margin="none"
                    />

                    <TextField
                        className="standard-name"
                        label="Owner"
                        name="owner" value={this.state.owner} onChange={this.handleInput}
                        margin="none"
                    />

                    <Button id="add-client-btn" onClick={this.addClient} variant="contained" color="primary">Add New Client</Button>

                </div>
            </div>
        )
    }
}

export default AddClient