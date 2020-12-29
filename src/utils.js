export const getMonthName = (type, date = new Date()) => new Intl.DateTimeFormat('en-US', { month: type }).format(date)

export const toProperCase = str => str[0].toUpperCase() + str.slice(1).toLowerCase()

export const getHistoricalDate = daysBack => {
  const currentDate = new Date()
  return currentDate.setDate(currentDate.getDate() - daysBack)
}