import React, { Component } from 'react'
import '../styles/TableHeader.css'

class TableHeader extends Component {

    render() {
        return(
            <div id="table-header">
                <div className="header-item">Name</div>
                <div className="header-item">Surname</div>
                <div className="header-item">Country</div>
                <div className="header-item">First Contact</div>
                <div className="header-item">Email</div>
                <div className="header-item">Sold</div>
                <div className="header-item">Owner</div>
            </div>
        )
    }
}

export default TableHeader