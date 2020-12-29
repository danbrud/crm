import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux'
import { selectSalesSinceChart } from '../../state/slices/clientsSlice';
import { getHistoricalDate, getMonthName } from '../../utils';

const SalesSince = () => {
    const chartData = useSelector(selectSalesSinceChart)
    const startDate = new Date(getHistoricalDate(30))

    return (
        <div>
            <h5>Sales since {`${getMonthName('short',startDate)} ${startDate.getDate()}`}</h5>
            <LineChart
                width={700}
                height={300}
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dot={false} type="monotone" dataKey="sales" stroke="#FE7259" strokeWidth={3} />
            </LineChart>

        </div>
    )
}

export default SalesSince