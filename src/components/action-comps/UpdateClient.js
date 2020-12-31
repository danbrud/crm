import React, { useState } from 'react'
import ClientInput from './ClientInput';
import '../../styles/Actions.css'
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux'
import { selectAvailableOwners, updateClient } from '../../state/slices/clientsSlice';
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { SNACKBAR_MESSAGES } from '../../CONSTS';
import Dropdown from './Dropdown';


const UpdateClient = ({ showSnackbar }) => {
    const availableOwners = useSelector(selectAvailableOwners)
    const dispatch = useDispatch()

    const [clientIdToUpdate, setClientIdToUpdate] = useState('')
    const [selects, setSelects] = useState({ owner: '', emailType: '' })

    const updateClientID = clientIdToUpdate => setClientIdToUpdate(clientIdToUpdate)

    const handleSelections = e => setSelects({ ...selects, [e.target.name]: e.target.value })

    const isClientSelected = () => !!clientIdToUpdate

    const isDropDownSelected = property => property === 'sold' || !!selects[property]

    const updateClientClick = property => async () => {
        if (isClientSelected() && isDropDownSelected(property)) {
            const payload = { property, value: property === 'sold' || selects[property] }

            const resultAction = await dispatch(updateClient({ payload, clientId: clientIdToUpdate }))
            unwrapResult(resultAction)

            showSnackbar(SNACKBAR_MESSAGES.updated)
        } else {
            showSnackbar(SNACKBAR_MESSAGES.notUpdated)
        }
    }


    return (
        <div id="update-action">
            <h4>UPDATE</h4>
            <ClientInput updateClientID={updateClientID} />
            <div className="update-client" id="transfer-ownership">
                <Dropdown
                    label='Transfer Ownership To'
                    value={selects.owner}
                    handleSelections={handleSelections}
                    name='owner'
                    disabled={!!selects.owner}
                    dropdownItems={availableOwners}
                    disabledText='select an owner'
                />
                <Button id="transfer-btn" onClick={updateClientClick('owner')} className="action-btn">
                    TRANSFER
                </Button>
            </div>
            <div className="update-client" id="send-email">
                <Dropdown
                    label='Send Email'
                    value={selects.emailType}
                    handleSelections={handleSelections}
                    name='emailType'
                    disabled={!!selects.emailType}
                    dropdownItems={['A', 'B', 'C', 'D']}
                    disabledText='select an email'
                />
                <Button id="send-email-btn" onClick={updateClientClick('emailType')} className="action-btn">
                    SEND
                </Button>
            </div>
            <div className="update-client" id="declare-sale">
                <p id="declare-sale">Declare Sale!</p>
                <Button id="declare-sale-btn" onClick={updateClientClick('sold')} className="action-btn">
                    DECLARE
                </Button>
            </div >
        </div >
    )
}

export default UpdateClient