import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import Clients from './client-comps/Clients'
import Actions from './action-comps/Actions'
import Analytics from './analytic-comps/Analytics'

const Routes = () => {
  const routeData = [
    { path: '/', component: <Home /> },
    { path: '/clients/:clientId?', component: <Clients /> },
    { path: '/actions', component: <Actions /> },
    { path: '/analytics', component: <Analytics /> },
  ]

  return (
    <>
      {routeData.map(route => <Route exact path={route.path} render={() => route.component} />)}
    </>
  )
}

export default Routes