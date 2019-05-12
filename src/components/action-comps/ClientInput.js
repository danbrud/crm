import React, { Component } from 'react'

class ClientInput extends Component {

    render() {
        return(
            <div>
                <p>Client: </p>
                <input type="text" placeholder="Client Name" list="clients"/>
            </div>
        )
    }
}

export default ClientInput