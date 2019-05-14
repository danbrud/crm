import React, { Component } from 'react'
import UpdateClient from './UpdateClient';
import AddClient from './AddClient';
import Divider from '@material-ui/core/Divider';

class Actions extends Component {

    render() {
        return(
            <div>
                <UpdateClient />
                <Divider variant="middle" />
                <AddClient />
            </div>
        )
    }
}

export default Actions