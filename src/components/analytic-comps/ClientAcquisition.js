import React, { Component } from 'react'
import { PieChart, Pie, Tooltip } from 'recharts';

class ClientAcquisition extends Component {


    getDateRange = (start, end) => {
        const dates = []
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - start)

        const endDate = new Date()
        endDate.setDate(endDate.getDate() - end)

        while (startDate < endDate) {
            startDate.setDate(startDate.getDate() + 1)

            const date = new Date(startDate)
            dates.push(date)
        }

        return dates
    }

    getSalesByDate = date => {
        let numOfClients = 0

        for (let client of this.props.clients) {
            const contactDate = new Date(client.firstContact)

            if (contactDate.getMonth() === date.getMonth() && contactDate.getDate() === date.getDate()) {
                numOfClients++
            }
        }

        return numOfClients
    }

    getClientsByDate = (periodName, startDate, endDate, color) => {
        const dates = this.getDateRange(startDate, endDate)
        const clientsByPeriod = { name: periodName, clients: 0, fill: color }

        for (let date of dates) {
            clientsByPeriod.clients += this.getSalesByDate(date)
        }

        return clientsByPeriod
    }

    getDataForChart = () => {
        const data = []

        data.push(this.getClientsByDate('Last Month', 30, 0, "#795548"))
        data.push(this.getClientsByDate('1-6 Months', 180, 31, "#34495E"))
        data.push(this.getClientsByDate('6-12 Months', 365, 181, "#95A5A6"))

        return data
    }

    render() {

        const data = this.getDataForChart()

        return (
            <div>
                <h5 id="client-acq-header">Client Acquisition</h5>

                <PieChart width={400} height={300} >
                    <Pie dataKey="clients" isAnimationActive={true} data={data} cx={200} cy={150} outerRadius={80} label />
                    <Tooltip />
                </PieChart>

            </div>
        )
    }
}

export default ClientAcquisition