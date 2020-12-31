import React from 'react'
import { PieChart, Pie, Tooltip } from 'recharts';
import { useSelector } from 'react-redux'
import { selectClientAquisitionChart } from '../../state/slices/clientsSlice';

const ClientAcquisition = () => {
    const chartData = useSelector(selectClientAquisitionChart)

    return(
            <div>
                <h5 id="client-acq-header">Client Acquisition By Period</h5>
                <PieChart width={400} height={300} >
                    <Pie dataKey="clients" isAnimationActive={true} data={chartData} cx={200} cy={150} outerRadius={80} label />
                    <Tooltip />
                </PieChart>
            </div >
        )
}

export default ClientAcquisition