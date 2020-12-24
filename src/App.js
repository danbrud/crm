import React, { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Clients from './components/client-comps/Clients';
import Actions from './components/action-comps/Actions';
import Analytics from './components/analytic-comps/Analytics';
import Home from './components/Home';

const App = () => {
  const [pageName, setPageName] = useState('')

  const changePage = e => setPageName(e.target.name)

  const isClientSelected = () => pageName === 'clients'

  const isActionSelected = () => pageName === 'actions'

  const isAnalyticSelected = () => pageName === 'analytics'

  const redirectPage = () => setPageName('clients')


  const clientSelectedClass = isClientSelected() ? 'page-selected' : 'page-not-selected'
  const actionSelectedClass = isActionSelected() ? 'page-selected' : 'page-not-selected'
  const analyticSelectedClass = isAnalyticSelected() ? 'page-selected' : 'page-not-selected'


  return (
    <Router>
      <div id="navbar">
        <div className={`${clientSelectedClass} nav-link`}><Link to='/clients' name="clients" onClick={changePage}>CLIENTS</Link></div>
        <div className={`${actionSelectedClass} nav-link`}><Link to='/actions' name="actions" onClick={changePage}>ACTIONS</Link></div>
        <div className={`${analyticSelectedClass} nav-link`}><Link to='/analytics' name="analytics" onClick={changePage}>ANALYTICS</Link></div>
      </div>

      <Route exact path='/' render={() => <Home redirectPage={redirectPage} />} />
      <Route exact path='/clients/:clientId?' render={() => <Clients />} />
      <Route exact path='/actions' render={() => <Actions />} />
      <Route exact path='/analytics' render={() => <Analytics />} />
    </Router>
  )
}

export default App;
