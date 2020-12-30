import React, { useState } from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import { useSelector } from 'react-redux'
import { selectSalesByChart } from '../../state/slices/clientsSlice'
import { toProperCase } from '../../utils'


const SalesBy = () => {
    const [selection, setSelection] = useState('country')

    const chartData = useSelector(state => selectSalesByChart(state, selection))

    const handleSelection = e => setSelection(e.target.value)

    const selectionOptions = ['country', 'email', 'month', 'owner']
    return (
        <div id="sales-by" className="chart">
            <h5>Sales By:</h5>
            <select id="sales-by-selection" value={selection} onChange={handleSelection}>
                {selectionOptions.map((selection, i) => <option key={i} value={selection}>{toProperCase(selection)}</option>)}
            </select>
            <BarChart width={700} height={250} data={chartData}>
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

export default SalesBy