import React, { Component } from 'react'
import UpdateClient from './UpdateClient';
import AddClient from './AddClient';
import Divider from '@material-ui/core/Divider';

class Actions extends Component {

    constructor() {
        super()
        this.state = {
            showSavedSnackbar: false
        }
    }

    showSuccess = message => {
        if (message === "Added") {
            this.setState({ showSavedSnackbar: true })
        }
    }

    showSavedSnackbar = () => {
       
    }

    render() {
        return (
            <div id="actions">
                <UpdateClient />
                <Divider id="divider" variant="middle" />
                <AddClient showSuccess={this.showSuccess}/>
            </div>
        )
    }
}

export default Actions