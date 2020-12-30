import React from 'react'
import TopEmployees from './TopEmployees';
import SalesBy from './SalesBy';
import SalesSince from './SalesSince';
import ClientAcquisition from './ClientAcquisition';
import '../../styles/Charts.css'

const Charts = () => {

    return (
        <div id="charts-container">
            <div id="top">
                <TopEmployees />
                <SalesBy />
            </div>
            <div id="bottom">
                <SalesSince />
                <ClientAcquisition />
            </div>
        </div>
    )
}

export default Charts