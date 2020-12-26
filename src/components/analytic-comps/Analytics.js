import React from 'react'
import Badges from './Badges'
import Charts from './Charts';
import Loader from '../Loader';
import { useSelector } from 'react-redux'
import { selectAllClients, selectClientStatus } from '../../state/slices/clientsSlice'
import { CLIENT_STATUSES } from '../../state/clientStatuses';

const Analytics = () => {
    const clients = useSelector(selectAllClients)
    const clientStatus = useSelector(selectClientStatus)

    return (
        <div>
            {
                clientStatus === CLIENT_STATUSES.succeeded
                    ? <div>
                        <Badges clients={clients} />
                        <Charts clients={clients} />
                    </div>
                    : <Loader />
            }
        </div>
    )
}

export default Analytics