import React, { Component, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectClientById, clientUpdatedInModal } from '../../state/slices/clientsSlice';
import { useHistory } from 'react-router-dom';

const Modal = ({ clientId }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const client = useSelector(state => selectClientById(state, clientId))

    const [inputs, setInputs] = useState({ name: client.name, surname: client.surname, country: client.country })

    const handleInput = e => setInputs({ ...inputs, [e.target.name]: e.target.value })

    const userChangedInput = () => !Object.keys(inputs).every(key => inputs[key] === client[key])

    const updateClient = async () => {
        if (!userChangedInput()) {
            alert("Please change a field or click the 'x' to exit.")
            return
        }

        const client = {
            name: `${inputs.name} ${inputs.surname}`,
            country: inputs.country
        }
        dispatch(clientUpdatedInModal({ ...client, clientId }))
        closeModal()
    }

    const closeModal = () => history.push('/clients')

    return (
        <div id="modal">
            <div><i id="exit-modal-btn" onClick={closeModal} className="far fa-times-circle"></i></div>
            <div><span>Name:</span><input type="text" name="name" value={inputs.name} onChange={handleInput} /></div>
            <div><span>Surname:</span><input type="text" name="surname" value={inputs.surname} onChange={handleInput} /></div>
            <div><span>Country:</span><input type="text" name="country" value={inputs.country} onChange={handleInput} /></div>
            <div onClick={updateClient} id="clients-update-btn">Update</div>
        </div>
    )
}

export default Modal