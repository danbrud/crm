import React, { Component, useState } from 'react'
import axios from 'axios';
import { API_ENDPOINT } from '../../config';
import { useSelector } from 'react-redux'
import { selectClientById } from '../../state/slices/clientsSlice';
import { useHistory } from 'react-router-dom';

const Modal = ({ clientId }) => {
    const history = useHistory()

    const client = useSelector(state => selectClientById(state, clientId))

    const [inputs, setInputs] = useState({ name: client.name, surname: client.surname, country: client.country })

    const handleInput = e => this.setState({ [e.target.name]: e.target.value })

    const userChangedInput = () => {
        if (this.state.nameInput === this.props.name &&
            this.state.surnameInput === this.props.surname &&
            this.state.countryInput === this.props.country) {

            return false
        }
        return true
    }

    const updateClient = async () => {
        if (!userChangedInput()) {
            alert("Please change a field or click the 'x' to exit.")
            return
        }

        const client = {
            name: `${inputs.name} ${inputs.surname}`,
            country: inputs.country
        }

        // await axios.put(`${API_ENDPOINT}/api/client/modal/${this.props.id}`, client)
        // this.props.updateClient()
    }

    const closeModal = () => history.push('/clients')

    return (
        <div id="modal">
            <div><i id="exit-modal-btn" onClick={closeModal} className="far fa-times-circle"></i></div>
            <div><span>Name:</span><input type="text" name="nameInput" value={inputs.name} onChange={handleInput} /></div>
            <div><span>Surname:</span><input type="text" name="surnameInput" value={inputs.surname} onChange={handleInput} /></div>
            <div><span>Country:</span><input type="text" name="countryInput" value={inputs.country} onChange={handleInput} /></div>
            <div onClick={updateClient} id="clients-update-btn">Update</div>
        </div>
    )
}

export default Modal