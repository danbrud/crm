import React, { Component } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'


class SalesBy extends Component {

    constructor() {
        super()
        this.state = {
            selection: "country",
        }
    }

    handleSelection = e => this.setState({ selection: e.target.value })

    getFullMonth = date => new Intl.DateTimeFormat('en-US', { month: "short" }).format(date)

    sortMonths = monthsArr => {
        const monthsOrder = {
            "Jan": 1,
            "Feb": 2,
            "Mar": 3,
            "Apr": 4,
            "May": 5,
            "Jun": 6,
            "Jul": 7,
            "Aug": 8,
            "Sep": 9,
            "Oct": 10,
            "Nov": 11,
            "Dec": 12
          }

          return monthsArr.sort((a, b) => monthsOrder[a] - monthsOrder[b])
    }

    createDataObject = (clients, selection) => {
        let dataObj = {}

        for (let client of clients) {

            if (client.sold) {
                if (selection === "firstContact") {
                    let date = this.getFullMonth(new Date(client[selection]))
                    dataObj[date] ? dataObj[date]++ : dataObj[date] = 1
                } else {
                    dataObj[client[selection]] ? dataObj[client[selection]]++ : dataObj[client[selection]] = 1
                }
            }
        }

        return dataObj
    }

    generateSalesByDataPoint = (clients, selection) => {

        let dataObj = this.createDataObject(clients, selection)
        let dataArr = []
        let dataKeys = selection === "firstContact" ? this.sortMonths(Object.keys(dataObj)) : Object.keys(dataObj)

        for (let item of dataKeys) {
            dataArr.push({ name: item.split(" ")[0], sales: dataObj[item] })
        }

        return dataArr
    }

    getChartDataBySelection = () => {
        if (this.state.selection === "country") {
            return this.generateSalesByDataPoint(this.props.clients, "country")
        } else if (this.state.selection === "email") {
            return this.generateSalesByDataPoint(this.props.clients, "emailType")
        } else if (this.state.selection === "month") {
            return this.generateSalesByDataPoint(this.props.clients, "firstContact")
        } else if (this.state.selection === "owner") {
            return this.generateSalesByDataPoint(this.props.clients, "owner")
        }
    }

    render() {

        const data = this.getChartDataBySelection()

        return (
            <div id="sales-by" className="chart">
                <h5>Sales By:</h5>
                <select id="sales-by-selection" value={this.state.selection} onChange={this.handleSelection}>
                    <option value="country">Country</option>
                    <option value="email">Email</option>
                    <option value="month">Month</option>
                    <option value="owner">Owner</option>
                </select>
                <BarChart width={700} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#955196" />
                </BarChart>
            </div>
        )
    }
}

export default SalesBy