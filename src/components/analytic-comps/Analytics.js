import React from 'react'
import Badges from './Badges'
import Charts from './Charts';
import Loader from '../Loader';
import { useSelector } from 'react-redux'
import { selectClientStatus } from '../../state/slices/clientsSlice'
import { CLIENT_STATUSES } from '../../CONSTS';

const Analytics = () => {
    const clientStatus = useSelector(selectClientStatus)

    return (
        <div>
            {
                clientStatus === CLIENT_STATUSES.succeeded
                    ? <div>
                        <Badges />
                        <Charts />
                    </div>
                    : <Loader />
            }
        </div>
    )
}

export default Analytics