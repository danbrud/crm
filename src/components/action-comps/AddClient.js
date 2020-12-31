import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { addNewClient, selectAvailableOwners } from '../../state/slices/clientsSlice'
import { toProperCase } from '../../utils';
import { SNACKBAR_MESSAGES } from '../../CONSTS';
import Dropdown from './Dropdown'

const AddClient = ({ showSnackbar }) => {
    const availableOwners = useSelector(selectAvailableOwners)
    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({ firstName: '', surname: '', email: '', country: '', owner: '' })

    const handleInput = e => setInputs({ ...inputs, [e.target.name]: e.target.value })

    const clearInputs = () => setInputs({ firstName: '', surname: '', email: '', country: '', owner: '' })

    const isInputsValid = () => Object.keys(inputs).every(key => !!inputs[key])

    const addClient = async () => {
        if (isInputsValid()) {
            const resultAction = await dispatch(addNewClient(inputs))
            unwrapResult(resultAction)

            clearInputs()
            showSnackbar(SNACKBAR_MESSAGES.added)
        } else {
            showSnackbar(SNACKBAR_MESSAGES.notAdded)
        }
    }

    const splitFieldWithUpperCaseAndProperCase = field => {
        let upperCaseOccurences = field.match(/[A-Z]/g)
        if (upperCaseOccurences) {
            upperCaseOccurences = upperCaseOccurences.map(letter => field.indexOf(letter))
            upperCaseOccurences.forEach(index => {
                field = field.split('')
                field.splice(index, 0, ' ')
                field = field.join('')
            })
        }

        return field.split(' ').map(word => toProperCase(word)).join(' ')
    }

    const inputFields = ['firstName', 'surname', 'email', 'country']
    return (
        <div id="create-action">
            <h4>ADD CLIENT</h4>
            <div id="input-fields">
                {inputFields.map((field, i) => (
                    <TextField
                        key={i}
                        className="standard-name"
                        color='primary'
                        label={splitFieldWithUpperCaseAndProperCase(field)}
                        name={field}
                        value={inputs[field]}
                        onChange={handleInput}
                        margin="none"
                    />
                ))}
                <Dropdown
                    label='Owner'
                    value={inputs.owner}
                    handleSelections={handleInput}
                    name='owner'
                    disabled={!!inputs.owner}
                    dropdownItems={availableOwners}
                    disabledText='select an owner'
                />
                <Button id="add-client-btn" onClick={addClient} variant="contained" color="primary">
                    Add New Client
                </Button>
            </div>
        </div>
    )
}

export default AddClient