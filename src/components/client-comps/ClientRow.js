import React, { Component } from 'react'
import '../styles/ClientRow.css'

class ClientRow extends Component {

    getPartOfName = (name, part) => {
        const i = name.indexOf(" ")
        return part === "first" ? name.substring(0, i) : name.substring(i + 1)
    }

    formatDate = (date) => {
        date = new Date(date)

        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        return `${month}/${day}/${year}`
    }

    popModal = () => {
        const name = this.getPartOfName(this.props.client.name, "first")
        const surname = this.getPartOfName(this.props.client.name, 'surname')

        this.props.popModal(name, surname, this.props.client.country, this.props.client._id)
    }

    render() {
        const client = this.props.client

        return(
            <div className="client-row" onDoubleClick={this.popModal}>
                <div className="row-item">{this.getPartOfName(client.name, 'first')}</div>
                <div className="row-item">{this.getPartOfName(client.name, 'surname')}</div>
                <div className="row-item">{client.country}</div>
                <div className="row-item">{this.formatDate(client.firstContact)}</div>
                <div className="row-item">{client.emailType ? client.emailType : '.'}</div>
                <div className="row-item">{client.sold ? <i className="fas fa-check"></i> : '-'}</div>
                <div className="row-item">{client.owner}</div>
            </div>
        )
    }
}

export default ClientRow