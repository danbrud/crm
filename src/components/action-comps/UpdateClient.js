import React, { useState } from 'react'
import ClientInput from './ClientInput';
import '../styles/Actions.css'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux'
import { selectClientsForDataList, updateClient } from '../../state/slices/clientsSlice';
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'


// const styles = theme => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//     },
//     formControl: {
//         margin: theme.spacing.unit,
//         minWidth: 120,
//     },
//     selectEmpty: {
//         marginTop: theme.spacing.unit * 2,
//     },
// });

// Overhaul this
const UpdateClient = (props) => {
    const clients = useSelector(selectClientsForDataList)
    const dispatch = useDispatch()

    const [clientIdToUpdate, setClientIdToUpdate] = useState('')
    // const [newOwner, setNewOwner] = useState('')
    // const [newEmailType, setNewEmailType] = useState('')
    const [selects, setSelects] = useState({ newOwner: '', newEmailType: '' })
    const [disableEmptySelect, setDisableEmptySelect] = useState({ newOwner: false, newEmailType: false })

    const updateClientID = clientIdToUpdate => setClientIdToUpdate(clientIdToUpdate)

    const handleSelections = e => {
        // fix this
        if (disableEmptySelect[e.target.name]) {
            setSelects({ ...selects, [e.target.name]: e.target.value })
        } else {
            setSelects({ ...selects, [e.target.name]: e.target.value })
            setDisableEmptySelect({ ...disableEmptySelect, [e.target.name]: true })
        }
    }

    const createEmailDropdownElement = () => {
        return (
            <select name="newEmailType" value={selects.newEmailType} onChange={handleSelections}>
                <option selected disabled={disableEmptySelect.newEmailType ? true : null}> -- select an email -- </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
        )
    }

    const createMaterialEmailDropdownElement = () => {
        return (
            <Select
                value={selects.newEmailType} onChange={handleSelections}
                inputProps={{
                    name: 'newEmailType',
                }}
            >
                <MenuItem disabled={disableEmptySelect.newOwner ? true : null}>
                    <em>-- select an owner --</em>
                </MenuItem>
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
            </Select>
        )
    }

    const createOwnerDropdownElement = () => {
        let availableOwners = []
        clients.forEach(c => availableOwners.some(ao => ao === c.owner) ?
            null : availableOwners.push(c.owner))

        return availableOwners.map(ao => <option value={ao}>{ao}</option>)
    }

    const createOwnerMaterialDropdownElement = () => {
        let availableOwners = []
        clients.forEach(c => availableOwners.some(ao => ao === c.owner) ?
            null : availableOwners.push(c.owner))

        return availableOwners.map(ao => <MenuItem key={ao} value={ao}>{ao}</MenuItem>)
    }

    const isClientSelected = () => !!clientIdToUpdate

    const updateClientClick = (property) => async () => {
        if (isClientSelected()) {
            const payload = {
                property,
                value: property === 'owner' ? selects.newOwner : property === 'emailType' ? selects.newEmailType : true
            }

            const resultAction = await dispatch(updateClient({ payload, clientId: clientIdToUpdate }))
            unwrapResult(resultAction)

            props.showSnackbar("Updated")
        } else {
            props.showSnackbar("Not updated")
        }
    }

    return (
        <div id="update-action">
            <h4>UPDATE</h4>


            <ClientInput updateClientID={updateClientID} clients={clients} />

            <div className="update-client" id="transfer-ownership">
                <FormControl >
                    <InputLabel>Transfer Ownership To</InputLabel>

                    <Select
                        value={selects.newOwner} onChange={handleSelections}
                        inputProps={{
                            name: 'newOwner',
                            id: 'age-simple',
                        }}
                    >
                        <MenuItem disabled={disableEmptySelect.newOwner ? true : null}>
                            <em>-- select an owner --</em>
                        </MenuItem>
                        {createOwnerMaterialDropdownElement()}
                    </Select>
                </FormControl>
                <Button id="transfer-btn" onClick={updateClientClick('owner')} className="action-btn">
                    TRANSFER
                </Button>




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
                    {createMaterialEmailDropdownElement()}
                </FormControl>
                <Button id="send-email-btn" onClick={updateClientClick('emailType')} className="action-btn">
                    SEND
                </Button>

                {/* <p>Send email:</p>
                    {this.createEmailDropdownElement()}
                    <div id="send-email-btn" onClick={this.sendEmail}>SEND</div> */}
            </div>

            <div className="update-client" id="declare-sale">

                <div id="declare-sale">Declare Sale!</div>
                <Button id="declare-sale-btn" onClick={updateClientClick('sold')} className="action-btn">
                    DECLARE
                </Button>

                {/* <p>Declare sale!</p>
                    <div></div>
                    <div id="declare-sale-btn" onClick={this.declareSale}>DECLARE</div> */}
            </div >
        </div >
    )
}

export default UpdateClient