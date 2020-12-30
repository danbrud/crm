import React from 'react'
import { toProperCase } from '../../utils'
import '../styles/TableHeader.css'

const TableHeader = () => {
    const headerItems = ['name', 'surname', 'country', 'first contact', 'email', 'sold', 'owner']

    return (
        <div id="table-header">
            {headerItems.map(headerItem => <p className="header-item">{headerItem.toUpperCase()}</p>)}
        </div>
    )
}

export default TableHeader