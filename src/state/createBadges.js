const getMonthName = (date = new Date()) => new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)

const getNumNewClients = clients => {
  const currentMonth = new Date().getMonth()
  return clients.filter(c => new Date(c.firstContact).getMonth() === currentMonth).length
}

const getNumEmailsSent = clients => clients.filter(c => c.emailType).length

const getNumOutstandingClients = clients => clients.filter(c => !c.sold).length

const sumClientsPerCountry = clients => {
  const clientsPerCountry = {}
  clients.forEach(c => {
    if (clientsPerCountry[c.country]) {
      clientsPerCountry[c.country]++
    } else {
      clientsPerCountry[c.country] = 1
    }
  })

  return clientsPerCountry
}

const calculateHottestCountry = totalClientsPerCountry => {
  let maxClients = 0
  let hottestCountry = ""

  for (let country in totalClientsPerCountry) {
    if (totalClientsPerCountry[country] > maxClients) {
      maxClients = totalClientsPerCountry[country]
      hottestCountry = country
    }
  }

  return hottestCountry
}

const getHottestCountry = clients => {
  const totalClientsPerCountry = sumClientsPerCountry(clients)
  const hottestCountry = calculateHottestCountry(totalClientsPerCountry)

  return hottestCountry
}

export const createBadges = clients => {
  return {
    newClients: {
      data: getNumNewClients(clients),
      icon: 'fas fa-chart-line',
      sentence: `New ${getMonthName()} Clients`,
      color: '#2ECC71'
    },
    emailsSent: {
      data: getNumEmailsSent(clients),
      icon: 'fas fa-envelope',
      sentence: "Emails Sent",
      color: '#3498DB'
    },
    outstandingClients: {
      data: getNumOutstandingClients(clients),
      icon: 'fas fa-users',
      sentence: "Outstanding Clients",
      color: '#E74C3C'
    },
    hottestCountry: {
      data: getHottestCountry(clients),
      icon: 'fas fa-globe-americas',
      sentence: "Hottest Country",
      color: '#F1C40F'
    }
  }
}