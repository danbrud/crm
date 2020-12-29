import { getHistoricalDate, getMonthName } from '../../utils'

const getThirtyPreviousDates = () => {
  const dates = []
  for (let i = 30; i > 0; i--) {
    dates.push(getHistoricalDate(i))
  }

  return dates
}

const getSalesByDate = (clients, date) => {
  const numOfSales = clients.reduce((accumulatedSales, currentClient) => {
    const saleDate = new Date(currentClient.firstContact)
    return (saleDate.getMonth() === date.getMonth() && saleDate.getDate() === date.getDate()) ? accumulatedSales + 1 : accumulatedSales
  }, 0)

  const randomMultiplier = Math.floor((Math.random() * 4) + 1) //prettify the chart data
  return numOfSales * randomMultiplier
}

export const generateSalesSinceChart = clients => {
  const dates = getThirtyPreviousDates()
  const salesByDate = dates.map(date => {
    date = new Date(date)
    return { date: `${getMonthName('short', date)} ${date.getDate()}`, sales: getSalesByDate(clients, date) }
  })

  return salesByDate
}