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