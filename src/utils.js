export const getMonthName = (type, date = new Date()) => new Intl.DateTimeFormat('en-US', { month: type }).format(date)

export const toProperCase = str => str[0].toUpperCase() + str.slice(1).toLowerCase()

export const getHistoricalDate = daysBack => {
  const currentDate = new Date()
  return currentDate.setDate(currentDate.getDate() - daysBack)
}

export const getSalesByDate = (clients, date, shouldMultiply = true) => {
  const numOfSales = clients.reduce((accumulatedSales, currentClient) => {
    const saleDate = new Date(currentClient.firstContact)
    return (saleDate.getMonth() === date.getMonth() && saleDate.getDate() === date.getDate()) ? accumulatedSales + 1 : accumulatedSales
  }, 0)

  const randomMultiplier = Math.floor((Math.random() * 4) + 1) //prettify the chart data
  return shouldMultiply ? numOfSales * randomMultiplier : numOfSales
}