import React, { Component } from 'react'
import UpdateClient from './UpdateClient';
import AddClient from './AddClient';
import Divider from '@material-ui/core/Divider';

class Actions extends Component {

    render() {
        return(
            <div id="actions">
                <UpdateClient />
                <Divider id="divider" variant="middle" />
                <AddClient />
            </div>
        )
    }
}

export default Actions