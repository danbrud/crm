import React, { Component } from 'react'
import { ComposedChart, ResponsiveContainer, CartesianAxis, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

class TopEmployees extends Component {

    constructor(props) {
        super(props)
        this.state = {
            clients: this.props.clients,
            dataForChart: this.generateTopEmployees(this.props.clients)
        }
    }

    createOwnerClientObj = clients => {
        let employeeSales = {}

        clients.forEach(c => {
            if (c.sold) {
                employeeSales[c.owner] ? employeeSales[c.owner]++ : employeeSales[c.owner] = 1
            }
        })

        return employeeSales
    }

    getDataForChart = (numOfEmployees, employeeSales) => {
        let dataForChart = []
        let employeeNames = Object.keys(employeeSales)

        for (let i = 0; i < employeeNames.length; i++) {
            if (dataForChart.length === numOfEmployees) { break }

            let highestSales = 0
            let employeeName = ''

            for (let j = 0; j < employeeNames.length; j++) {
                if (employeeSales[employeeNames[j]] > highestSales) {
                    highestSales = employeeSales[employeeNames[j]]
                    employeeName = employeeNames[j]
                }
            }

            
            let indexOfEmployee = employeeNames.findIndex(en => en === employeeName)
            employeeNames.splice(indexOfEmployee, 1)

            if (!dataForChart.some(d => d.name === employeeName)) {
                dataForChart.unshift({ name: employeeName, sales: highestSales })
            }
        }

        return dataForChart
    }

    generateTopEmployees = clients => {
        let numOfEmployees = 3
        let employeeSales = this.createOwnerClientObj(clients)
        console.log(employeeSales)
        let dataForChart = this.getDataForChart(numOfEmployees, employeeSales)

        return dataForChart
    }

    render() {

        let dataForChart = this.generateTopEmployees(this.props.clients)

        return (
            <div>
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

                    <Bar dataKey="sales" barSize={25} fill="#413ea0" />

                </ComposedChart>

                {/* <ResponsiveContainer width='100%'> */}
                {/* {<BarChart width={730} height={250} data={data} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis  />
                        <YAxis dataKey="pv"/>
                        <Legend />
                        <Bar dataKey="name" fill="#8884d8" />
                    </BarChart>} */}
                {/* </ResponsiveContainer> */}

                {/*  <BarChart width={730} height={250} data={this.state.data} layout="vertical">
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                {/* <XAxis dataKey="sales" />
                    <YAxis reversed={true} dataKey="name" type="category" />
                    <Bar dataKey="sales" fill="#8884d8" barSize={30} />
                </BarChart> */}

            </div>
        )
    }
}

export default TopEmployees