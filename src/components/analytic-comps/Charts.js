import React, { Component } from 'react'
import TopEmployees from './TopEmployees';
import SalesBy from './SalesBy';
import SalesSince from './SalesSince';
import ClientAcquisition from './ClientAcquisition';
import '../styles/Charts.css'

class Charts extends Component {

    render() {
        return(
            <div id="charts-container">
                <div id="first-two">
                <TopEmployees clients={this.props.clients}/>
                <SalesBy clients={this.props.clients}/>
                </div>
                <SalesSince clients={this.props.clients}/>
                <ClientAcquisition clients={this.props.clients}/>
            </div>
        )
    }
}

export default Charts