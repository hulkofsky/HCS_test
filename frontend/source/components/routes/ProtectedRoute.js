import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {Path} from './index'

function ProtectedRoute(props) {
  const renderProtected = routeProps => {
    const {render: ProtectedComponent, isAuthorized, self} = props

    if (self) return isAuthorized ? <Redirect to={Path.home} /> : <ProtectedComponent {...routeProps} />
    return isAuthorized ? <ProtectedComponent {...routeProps} /> : <Redirect to={Path.login} />
  }

  const {component, ...rest} = props

  return <Route {...rest} render={renderProtected} />
}

ProtectedRoute.propTypes = {
  // from reducer authorization
  isAuthorized: PropTypes.bool.isRequired,
  // from parent component
  self: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthorized: state.authorization.isAuthorized
})

export default connect(mapStateToProps)(ProtectedRoute)