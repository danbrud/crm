import { getHistoricalDate, getMonthName, getSalesByDate } from '../../utils'

const getThirtyPreviousDates = () => {
  const dates = []
  for (let i = 30; i > 0; i--) {
    dates.push(getHistoricalDate(i))
  }

  return dates
}

export const generateSalesSinceChart = clients => {
  const dates = getThirtyPreviousDates()
  const salesByDate = dates.map(date => {
    date = new Date(date)
    return { date: `${getMonthName('short', date)} ${date.getDate()}`, sales: getSalesByDate(clients, date) }
  })

  return salesByDate
}