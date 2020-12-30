import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectClientById, updateClient} from '../../state/slices/clientsSlice';
import { unwrapResult } from '@reduxjs/toolkit'
import { Redirect, useHistory } from 'react-router-dom';

const Modal = ({ clientId }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const client = useSelector(state => selectClientById(state, clientId))

    const [inputs, setInputs] = useState({ firstName: client?.firstName, surname: client?.surname, country: client?.country })

    const handleInput = e => setInputs({ ...inputs, [e.target.name]: e.target.value })

    const userChangedInput = () => !Object.keys(inputs).every(key => inputs[key] === client[key])

    const updateClientClick = async () => {
        if (!userChangedInput()) {
            alert("Please change a field or click the 'x' to exit.")
            return
        }

        const resultAction = await dispatch(updateClient({ payload: inputs, clientId, isModal: true }))
        unwrapResult(resultAction)
        closeModal()
    }

    const closeModal = () => history.push('/clients')

    return (
        client
            ? <div id="modal">
                <div><i id="exit-modal-btn" onClick={closeModal} className="far fa-times-circle"></i></div>
                <div><span>Name:</span><input type="text" name="firstName" value={inputs.firstName} onChange={handleInput} /></div>
                <div><span>Surname:</span><input type="text" name="surname" value={inputs.surname} onChange={handleInput} /></div>
                <div><span>Country:</span><input type="text" name="country" value={inputs.country} onChange={handleInput} /></div>
                <div onClick={updateClientClick} id="clients-update-btn">Update</div>
            </div>
            : <Redirect to='/clients' />
    )
}

export default Modal