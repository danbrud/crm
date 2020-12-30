import React from 'react'
import { useHistory } from 'react-router-dom'
import Moment from 'react-moment'
import '../../styles/ClientRow.css'

const ClientRow = ({ client }) => {
    const history = useHistory()

    const showModal = () => {
        history.push(`/clients/${client._id}`)
    }

    return (
        <div className="client-row" onDoubleClick={showModal}>
            <p className="row-item">{client.firstName}</p>
            <p className="row-item">{client.surname}</p>
            <p className="row-item">{client.country}</p>
            <p className="row-item"><Moment format='MM/DD/YYYY'>{client.firstContact}</Moment></p>
            <p className="row-item">{client.emailType ? client.emailType : '.'}</p>
            <p className="row-item">{client.sold ? <i className='fas fa-check'></i> : '-'}</p>
            <p className="row-item">{client.owner}</p>
        </div>
    )
}

export default ClientRow