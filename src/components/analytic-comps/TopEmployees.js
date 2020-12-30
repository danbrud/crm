import React from 'react'
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { useSelector } from 'react-redux'
import { selectTopEmployeeChart } from '../../state/slices/clientsSlice'

const TopEmployees = () => {
    const chartData = useSelector(selectTopEmployeeChart)

    return (
        <div id="top-emp" className="chart">
            <h5>Top Employees</h5>
            <ComposedChart
                layout="vertical"
                width={500}
                height={250}
                data={chartData}
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

export default TopEmployees