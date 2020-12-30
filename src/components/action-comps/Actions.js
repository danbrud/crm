import React, { useState } from 'react'
import UpdateClient from './UpdateClient';
import AddClient from './AddClient';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';

const Actions = () => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '' })

    const showSnackbar = message => {
        setSnackbar({ open: true, message })
    }

    return (
        <div id="actions">
            <UpdateClient showSnackbar={showSnackbar} />
            <Divider id="divider" variant="middle" />
            <AddClient showSnackbar={showSnackbar} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={snackbar.open}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span>{snackbar.message}</span>}
                autoHideDuration={2000}
                onClose={() => setSnackbar({ open: false, message: '' })}
            />
        </div>
    )
}

export default Actions