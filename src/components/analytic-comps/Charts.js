import React, { Component } from 'react'
import TopEmployees from './TopEmployees';
import SalesBy from './SalesBy';
import SalesSince from './SalesSince';
import ClientAcquisition from './ClientAcquisition';

class Charts extends Component {

    render() {
        return(
            <div>
                <TopEmployees clients={this.props.clients}/>
                <SalesBy clients={this.props.clients}/>
                <SalesSince clients={this.props.clients}/>
                <ClientAcquisition clients={this.props.clients}/>
            </div>
        )
    }
}

export default Charts