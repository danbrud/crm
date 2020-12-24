import React, { Component } from 'react'
import axios from 'axios';
import { API_ENDPOINT } from '../../config';

class Modal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nameInput: this.props.name,
            surnameInput: props.surname,
            countryInput: props.country
        }
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    userChangedInput = () => {
        if (this.state.nameInput === this.props.name &&
            this.state.surnameInput === this.props.surname &&
            this.state.countryInput === this.props.country) {

            return false
        }
        return true
    }

    updateClient = async () => {
        if (!this.userChangedInput()) {
            alert("Please change a field or click the 'x' to exit.")
            return
        }

        let client = {
            name: `${this.state.nameInput} ${this.state.surnameInput}`,
            country: this.state.countryInput
        }

        await axios.put(`${API_ENDPOINT}/api/client/modal/${this.props.id}`, client)
        this.props.updateClient()
    }

    closeModal = () => this.props.closeModal()

    render() {
        return (
            <div id="modal">
                <div><i id="exit-modal-btn" onClick={this.closeModal} className="far fa-times-circle"></i></div>
                <div><span>Name:</span><input type="text" name="nameInput" value={this.state.nameInput} onChange={this.handleInput} /></div>
                <div><span>Surname:</span><input type="text" name="surnameInput" value={this.state.surnameInput} onChange={this.handleInput} /></div>
                <div><span>Country:</span><input type="text" name="countryInput" value={this.state.countryInput} onChange={this.handleInput} /></div>
                <div onClick={this.updateClient} id="clients-update-btn">Update</div>
            </div>
        )
    }
}

export default Modal