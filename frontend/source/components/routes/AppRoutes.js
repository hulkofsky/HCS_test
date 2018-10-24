import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Path} from './index'

// components
import ProtectedRoute from './ProtectedRoute'
import NotFound from '../pages/NotFound/AsyncNotFound'
import Login from '../pages/Login/AsyncLogin'
import Home from '../pages/Home/AsyncHome'

function AppRoutes() {
  return (
    <Switch>
      <ProtectedRoute
        exact
        self
        path={Path.login}
        render={() => <Login />}
      />
      <ProtectedRoute
        exact
        path={Path.home}
        render={() => <Home />}
      />
      <Redirect exact from='/' to={Path.login} />
      <Route exact path='*' render={() => <NotFound />} />
    </Switch>
  )
}

export default AppRoutes