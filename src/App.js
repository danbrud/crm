import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import Clients from './components/client-comps/Clients';
import Actions from './components/action-comps/Actions';
import Analytics from './components/analytic-comps/Analytics';

class App extends Component {

  constructor() {
    super()
    this.state = {
      pageName: ""
    }
  }

  changePage = e => this.setState({pageName: e.target.name})

  isClientSelected = () => this.state.pageName === 'clients' ? true : false

  isActionSelected = () => this.state.pageName === 'actions' ? true : false

  isAnalyticSelected = () => this.state.pageName === 'analytics' ? true : false

  render() {

    let clientSelectedClass = this.isClientSelected() ? "page-selected" : "page-not-selected"
    let actionSelectedClass = this.isActionSelected() ? "page-selected" : "page-not-selected"
    let analyticSelectedClass = this.isAnalyticSelected() ? "page-selected" : "page-not-selected"


    return(
      <Router>
        <div id="navbar">
          <div className={`${clientSelectedClass} nav-link`}><Link to='/clients' name="clients" onClick={this.changePage}>CLIENTS</Link></div> 
          <div className={`${actionSelectedClass} nav-link`}><Link to='/actions' name="actions" onClick={this.changePage}>ACTIONS</Link></div>
          <div className={`${analyticSelectedClass} nav-link`}><Link to='/analytics' name="analytics" onClick={this.changePage}>ANALYTICS</Link></div>
        </div>

        <Route exact path='/clients' render={() => <Clients />}/>
        <Route exact path='/actions' render={() => <Actions />}/>
        <Route exact path='/analytics' render={() => <Analytics />}/>
      </Router>
    )
  }
}

export default App;
