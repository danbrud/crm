import React from 'react'
import { toProperCase } from '../../utils'

const ClientsFilter = ({ filters, setFilters }) => {
  const handleFilter = e => setFilters({ ...filters, [e.target.name]: e.target.value })

  const filterOptions = ['name', 'email', 'sold', 'owner', 'country']
  return (
    <div id="search-container">
      <input type="text" name="searchFilter" placeholder="Search" value={filters.searchFilter} onChange={handleFilter} id="search-clients-input" />
      <select id="select-filter" name="selectedFilter" value={filters.selectedFilter} onChange={handleFilter}>
        {filterOptions.map((filter, i) => (
          <option key={i} value={filter}>{toProperCase(filter)}</option>
        ))}
      </select>
    </div>
  )
}

export default ClientsFilter