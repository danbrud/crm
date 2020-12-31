import React, { useState } from 'react'
import '../../styles/Clients.css'
import Modal from './Modal';
import { useParams } from 'react-router-dom';
import ClientsFilter from './ClientsFiltter';
import ClientsTable from './ClientsTable';

const Clients = () => {
    const { clientId } = useParams()

    const [filters, setFilters] = useState({ searchFilter: '', selectedFilter: 'name' })

    return (
        <div id="clients-page">
            <ClientsFilter filters={filters} setFilters={setFilters} />
            <ClientsTable filters={filters} />
            {clientId && <Modal clientId={clientId} />}
        </div>
    )
}

export default Clients