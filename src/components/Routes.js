import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NotFound from './NotFound'
import Clients from './client-comps/Clients'
import Actions from './action-comps/Actions'
import Analytics from './analytic-comps/Analytics'

const Routes = () => {
  const routeData = [
    { path: '/clients/:clientId?', component: <Clients /> },
    { path: '/actions', component: <Actions /> },
    { path: '/analytics', component: <Analytics /> },
    { path: '*', component: <NotFound /> }
  ]

  return (
    <Switch>
      {routeData.map((route, i) => <Route key={i} exact path={route.path} render={() => route.component} />)}
    </Switch>
  )
}

export default Routes