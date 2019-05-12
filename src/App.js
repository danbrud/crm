import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Clients from './components/client-comps/Clients';
import Actions from './components/action-comps/Actions';
import Analytics from './components/analytic-comps/Analytics';

class App extends Component {

  render() {
    return(
      <Router>
        <div id="navbar">
          <Link to='/clients'>CLIENTS</Link>
          <Link to='/actions'>ACTIONS</Link>
          <Link to='/analytics'>ANALYTICS</Link>
        </div>

        <Route exact path='/clients' render={() => <Clients />}/>
        <Route exact path='/actions' render={() => <Actions />}/>
        <Route exact path='/analytics' render={() => <Analytics />}/>
      </Router>
    )
  }
}

export default App;
