import { MONTHS_TO_NUMBERS } from "../../CONSTS"
import { getMonthName } from "../../utils"

const sortMonths = monthsArr => monthsArr.sort((a, b) => MONTHS_TO_NUMBERS[a] - MONTHS_TO_NUMBERS[b])

const generateDataObject = (clients, selection) => {
  const dataObj = {}

  clients.forEach(client => {
    if (client.sold) {
      if (selection === "firstContact") {
        const date = getMonthName('short', new Date(client[selection]))
        dataObj[date] ? dataObj[date]++ : dataObj[date] = 1
      } else {
        const selectionType = client[selection]
        dataObj[selectionType] ? dataObj[selectionType]++ : dataObj[selectionType] = 1
      }
    }
  })

  return dataObj
}

const generateChartData = (clients, selection) => {
  const dataObj = generateDataObject(clients, selection)
  const dataKeys = selection === "firstContact" ? sortMonths(Object.keys(dataObj)) : Object.keys(dataObj)
  const dataArr = dataKeys.map(key => ({ name: key.split(" ")[0], sales: dataObj[key] }))

  return dataArr
}

export const generateSalesByChart = (clients, salesBySelection) => {
  const selection = salesBySelection === 'email' ? 'emailType' : salesBySelection === 'month' ? 'firstContact' : salesBySelection
  return generateChartData(clients, selection)
}