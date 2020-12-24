import React, { Component } from 'react'

class ClientInput extends Component {

    constructor(){
        super()
        this.state = {
            selectedName: ""
        }
    }

    updateName = e => this.setState({selectedName: e.target.value}, function() { this.updateClientID() })

    createDataListOptions = () => this.props.clients.map(c => <option key={c._id} value={c.name} />)

    updateClientID = () => {
        const client = this.props.clients.find(c => c.name === this.state.selectedName)
        if(client) { this.props.updateClientID(client._id) }
    }

    render() {
        return (
            <div>
                <span>Client: </span>
                <input type="text" id="update-client-input" placeholder="Client Name" list="clients" value={this.state.selectedName} onInput={this.updateName}/>
                <datalist id="clients">
                    {this.createDataListOptions()}
                </datalist>
            </div>
        )
    }
}

export default ClientInput