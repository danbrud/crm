import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class SalesSince extends Component {

    getHistoricalDate = daysBack => {
        let currentDate = new Date()
        currentDate.setDate(currentDate.getDate() - daysBack)

        return currentDate
    }

    getFullMonth = (date = new Date()) => new Intl.DateTimeFormat('en-US', { month: "short" }).format(date)

    getAllDates = () => {
        let dates = []

        for (let i = 30; i > 0; i--) {
            dates.push(this.getHistoricalDate(i))
        }

        return dates
    }

    getSalesByDate = date => {
        let numOfSales = 0
        const randomMultiplier = Math.floor((Math.random() * 4) + 1) //prettefy the chart data

        for (let client of this.props.clients) {
            let saleDate = new Date(client.firstContact)

            if (saleDate.getMonth() === date.getMonth() && saleDate.getDate() === date.getDate()) {
                numOfSales++
            }
        }

        return numOfSales * randomMultiplier
    }

    getDataForChart = () => {
        let dates = this.getAllDates()
        let salesByDate = []

        for (let date of dates) {
            let saleByDate = { date: `${this.getFullMonth(date)} ${date.getDate()}` }
            saleByDate.sales = this.getSalesByDate(date)
            salesByDate.push(saleByDate)
        }

        return salesByDate
    }


    render() {
        const data = this.getDataForChart()

        return (
            <div>
                <h5>Sales since {`${this.getFullMonth(this.getHistoricalDate(30))} ${this.getHistoricalDate(30).getDate()}`}</h5>
                <ResponsiveContainer width='100%'  >
                    <LineChart
                        width={700}
                        height={300}
                        data={data}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line dot={false} type="monotone" dataKey="sales" stroke="#FE7259" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default SalesSince