import React, { Component } from 'react'
import UpdateClient from './UpdateClient';
import AddClient from './AddClient';
import Divider from '@material-ui/core/Divider';


class Actions extends Component {

    constructor() {
        super()
        this.state = {
            showSavedMessage: false
        }
    }

    showSuccess = message => {
        if (message === "Added") {
            this.setState({ showSavedMessage: true })
        }
    }

    clearSavedMessage = () => {
       this.setState({showSavedMessage: false})
    }

    render() {
        return (
            <div id="actions">
                <UpdateClient />
                <Divider id="divider" variant="middle" />
                <AddClient showSuccess={this.showSuccess}/>
                {this.state.showSavedMessage ? <div id="saved-message"><span>New client has been saved.</span><span id="saved-ok-btn" onClick={this.clearSavedMessage}>OK</span></div> : null}
            </div>
        )
    }
}

export default Actions