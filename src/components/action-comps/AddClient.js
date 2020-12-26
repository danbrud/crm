import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewClient } from '../../state/slices/clientsSlice'

const AddClient = (props) => {
    const [inputs, setInputs] = useState({ firstName: '', surname: '', email: '', country: '', owner: '' })

    const dispatch = useDispatch()

    const handleInput = e => setInputs({ ...inputs, [e.target.name]: e.target.value })

    const clearInputs = () => setInputs({ firstName: '', surname: '', email: '', country: '', owner: '' })

    const isInputsValid = () => Object.keys(inputs).every(key => !!inputs[key])

    const addClient = async () => {
        if (isInputsValid()) {
            const resultAction = await dispatch(addNewClient(inputs))
            unwrapResult(resultAction)

            clearInputs()
            props.showSnackbar("Added")
        } else {
            props.showSnackbar("Not added")
        }
    }

    return (
        <div id="create-action">
            <h4>ADD CLIENT</h4>
            <div id="input-fields">
                <TextField
                    className="standard-name"
                    label="First Name"
                    name="firstName"
                    value={inputs.firstName} onChange={handleInput}
                    margin="none"
                />
                <TextField
                    className="standard-name"
                    label="Surname"
                    name="surname"
                    value={inputs.surname} onChange={handleInput}
                    margin="none"
                />
                <TextField
                    className="standard-name"
                    label="Email"
                    name="email"
                    value={inputs.email} onChange={handleInput}
                    margin="none"
                />
                <TextField
                    className="standard-name"
                    label="Country"
                    name="country"
                    value={inputs.country} onChange={handleInput}
                    margin="none"
                />
                <TextField
                    className="standard-name"
                    label="Owner"
                    name="owner" value={inputs.owner} onChange={handleInput}
                    margin="none"
                />
                <Button id="add-client-btn" onClick={addClient} variant="contained" color="primary">
                    Add New Client
                </Button>
            </div>
        </div>
    )
}

export default AddClient