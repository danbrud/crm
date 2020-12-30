import React from 'react'
import '../../styles/TableHeader.css'

const TableHeader = () => {
    const headerItems = ['name', 'surname', 'country', 'first contact', 'email', 'sold', 'owner']

    return (
        <div id="table-header">
            {headerItems.map((headerItem, i) => <p key={i} className="header-item">{headerItem.toUpperCase()}</p>)}
        </div>
    )
}

export default TableHeader