import React, { Component } from 'react'
import '../styles/ClientRow.css'

class ClientRow extends Component {

    getPartOfName = (name, part) => {
        let i = name.indexOf(" ")
        return part === "first" ? name.substring(0, i) : name.substring(i + 1)
    }

    formatDate = (date) => {
        date = new Date(date)

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        return `${month}/${day}/${year}`
    }

    popModal = () => {
        let name = this.getPartOfName(this.props.client.name, "first")
        let surname = this.getPartOfName(this.props.client.name, 'surname')

        this.props.popModal(name, surname, this.props.client.country, this.props.client._id)
    }

    render() {
        let client = this.props.client

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