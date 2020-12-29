const getOwnerBySales = clients => {
  const ownersBySales = {}

  clients.forEach(client => {
    if (client.sold) {
      if (ownersBySales[client.owner]) {
        ownersBySales[client.owner]++
      } else {
        ownersBySales[client.owner] = 1
      }
    }
  })

  return ownersBySales
}

const generateChartData = (ownersBySales) => {
  const chartData = []
  for(let owner in ownersBySales){
    chartData.push({ name: owner, sales: ownersBySales[owner] })
  }

  return chartData
}

export const generateTopEmployeeChart = clients => {
  const numOwnersToDisplay = 3
  const ownersBySales = getOwnerBySales(clients)

  const chartData = generateChartData(ownersBySales).sort((a, b) => a.sales - b.sales)
  return chartData.slice(0, chartData.length - numOwnersToDisplay)
}