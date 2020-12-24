import React, { Component } from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Clients from './components/client-comps/Clients';
import Actions from './components/action-comps/Actions';
import Analytics from './components/analytic-comps/Analytics';
import Home from './components/Home';

class App extends Component {

  constructor() {
    super()
    this.state = {
      pageName: ""
    }
  }

  changePage = e => this.setState({ pageName: e.target.name })

  isClientSelected = () => this.state.pageName === 'clients'

  isActionSelected = () => this.state.pageName === 'actions'

  isAnalyticSelected = () => this.state.pageName === 'analytics'

  redirectPage = () => this.setState({ pageName: 'clients' })

  render() {

    const clientSelectedClass = this.isClientSelected() ? "page-selected" : "page-not-selected"
    const actionSelectedClass = this.isActionSelected() ? "page-selected" : "page-not-selected"
    const analyticSelectedClass = this.isAnalyticSelected() ? "page-selected" : "page-not-selected"


    return (
      <Router>
        <div id="navbar">
          <div className={`${clientSelectedClass} nav-link`}><Link to='/clients' name="clients" onClick={this.changePage}>CLIENTS</Link></div>
          <div className={`${actionSelectedClass} nav-link`}><Link to='/actions' name="actions" onClick={this.changePage}>ACTIONS</Link></div>
          <div className={`${analyticSelectedClass} nav-link`}><Link to='/analytics' name="analytics" onClick={this.changePage}>ANALYTICS</Link></div>
        </div>

        <Route exact path='/' render={() => <Home redirectPage={this.redirectPage} />} />
        <Route exact path='/clients' render={() => <Clients />} />
        <Route exact path='/actions' render={() => <Actions />} />
        <Route exact path='/analytics' render={() => <Analytics />} />
      </Router>
    )
  }
}

export default App;
