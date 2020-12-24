import React, { Component } from 'react'
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

class TopEmployees extends Component {

    createOwnerClientObj = clients => {
        const employeeSales = {}

        clients.forEach(c => {
            if (c.sold) {
                employeeSales[c.owner] ? employeeSales[c.owner]++ : employeeSales[c.owner] = 1
            }
        })

        return employeeSales
    }

    createDataArray = (employeeSales) => {
        const dataArr = []
        const employees = Object.keys(employeeSales)

        employees.forEach(e => {
            dataArr.push({ name: e, sales: employeeSales[e] })
        })

        return dataArr
    }

    generateTopEmployees = clients => {
        const numOfEmployees = 3
        const employeeSales = this.createOwnerClientObj(clients)

        let dataForChart = this.createDataArray(employeeSales)

        dataForChart = dataForChart.sort((a, b) => a.sales - b.sales)
        dataForChart.splice(0, dataForChart.length - numOfEmployees)

        return dataForChart
    }

    render() {

        const dataForChart = this.generateTopEmployees(this.props.clients)

        return (
            <div id="top-emp" className="chart">
                <h5>Top Employees</h5>

                <ComposedChart
                    layout="vertical"
                    width={500}
                    height={250}
                    data={dataForChart}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >

                    <XAxis type="number" />
                    <YAxis reversed={true} dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />

                    <Bar dataKey="sales" barSize={25} fill="#003f5c" />

                </ComposedChart>

            </div>
        )
    }
}

export default TopEmployees