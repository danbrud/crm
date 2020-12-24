import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/ClientRow.css'

const ClientRow = ({ client, popModal }) => {
    const history = useHistory()

    const getPartOfName = (name, part) => {
        const i = name.indexOf(" ")
        return part === "first" ? name.substring(0, i) : name.substring(i + 1)
    }

    const formatDate = (date) => {
        date = new Date(date)

        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        return `${month}/${day}/${year}`
    }

    const showModal = () => {
        history.push(`/clients/${client._id}`)
    }

    return (
        <div className="client-row" onDoubleClick={showModal}>
            <div className="row-item">{getPartOfName(client.name, 'first')}</div>
            <div className="row-item">{getPartOfName(client.name, 'surname')}</div>
            <div className="row-item">{client.country}</div>
            <div className="row-item">{formatDate(client.firstContact)}</div>
            <div className="row-item">{client.emailType ? client.emailType : '.'}</div>
            <div className="row-item">{client.sold ? <i className="fas fa-check"></i> : '-'}</div>
            <div className="row-item">{client.owner}</div>
        </div>
    )
}

export default ClientRow