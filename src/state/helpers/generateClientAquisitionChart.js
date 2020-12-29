import { getHistoricalDate, getSalesByDate } from "../../utils"

const getDateRange = (start, end) => {
  const startDate = new Date(getHistoricalDate(start))
  const endDate = new Date(getHistoricalDate(end))

  const dates = []
  while (startDate < endDate) {
      startDate.setDate(startDate.getDate() + 1)
      dates.push(new Date(startDate))
  }

  return dates
}

const getClientsByPeriod = (clients, period) => {
  const clientsByPeriod = { name: period.name, clients: 0, fill: period.color }

  const dates = getDateRange(period.startDate, period.endDate)
  for (let date of dates) {
      clientsByPeriod.clients += getSalesByDate(clients, date, false)
  }

  return clientsByPeriod
}


export const generateClientAquisitionChart = clients => {
  const periodsData = [
    { name: 'Last Month', startDate: 30, endDate: 0, color: '#795548' },
    { name: '1-6 Months', startDate: 180, endDate: 31, color: '#34495E' },
    { name: '6-12 Months', startDate: 365, endDate: 181, color: '#95A5A6' },
  ]
  const chartData = periodsData.map(period => getClientsByPeriod(clients, period))

  return chartData
}