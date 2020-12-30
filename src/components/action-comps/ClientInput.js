import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectClientsForDataList } from '../../state/slices/clientsSlice'

const ClientInput = ({ updateClientID }) => {
    const clients = useSelector(selectClientsForDataList)

    const [selectedName, setSelectedName] = useState('')

    useEffect(() => {
        const client = clients.find(client => client.name === selectedName)
        if (client) {
            updateClientID(client._id)
        }
    }, [selectedName, updateClientID, clients])

    const updateName = e => setSelectedName(e.target.value)

    return (
        <div>
            <span>Client: </span>
            <input
                type="text"
                id="update-client-input"
                placeholder="Client Name"
                list="clients"
                value={selectedName}
                onChange={updateName}
            />
            <datalist id="clients">
                {clients.map(c => <option key={c._id} value={c.name} />)}
            </datalist>
        </div>
    )
}

export default ClientInput