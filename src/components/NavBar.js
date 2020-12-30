import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
  const location = useLocation()

  const isNavItemSelected = (path, selection) => path.includes(selection)

  const navItems = ['clients', 'actions', 'analytics']
  return (
    <div id="navbar">
      {navItems.map((navItem, i) => (
        <div key={i} className={`page${isNavItemSelected(location.pathname, navItem) ? '-selected' : '-not-selected'} nav-link`}>
          <Link to={`/${navItem}`} name={navItem}>{navItem.toUpperCase()}</Link>
        </div>
      ))}
    </div>
  )
}

export default NavBar