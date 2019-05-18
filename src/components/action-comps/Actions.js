import React, { Component } from 'react'
import UpdateClient from './UpdateClient';
import AddClient from './AddClient';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';



class Actions extends Component {

    constructor() {
        super()
        this.state = {
            showSavedMessage: false,
            showUpdatedMessage: false,
            showNotUpdatedMessage: false,
            showNotAddedMessage: false
        }
    }

    showSnackbar = message => {
        if (message === "Added") {
            this.setState({ showSavedMessage: true })
            this.clearSnackbar("showSavedMessage")
        } else if(message === "Updated") {
            this.setState({showUpdatedMessage: true})
            this.clearSnackbar("showUpdatedMessage")
        } else if(message === "Not updated") {
            this.setState({showNotUpdatedMessage: true})
            this.clearSnackbar("showNotUpdatedMessage")
        } else if(message === "Not added") {
            this.setState({showNotAddedMessage: true})
            this.clearSnackbar("showNotAddedMessage")
        }
    }

    clearSnackbar = snackbar => {
        setTimeout(() => this.setState({ [snackbar]: false }), 2000)
    }

    render() {

        return (
            <div id="actions">
                <UpdateClient showSnackbar={this.showSnackbar}/>
                <Divider id="divider" variant="middle" />
                <AddClient showSnackbar={this.showSnackbar} />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.showSavedMessage}
                    message={<span>Client Added</span>}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.showNotAddedMessage}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span>Enter all fields &amp; try again</span>}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.showUpdatedMessage}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span>Client Updated</span>}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.showNotUpdatedMessage}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span>Select a client &amp; try again</span>}
                />
            </div>
        )
    }
}

export default Actions