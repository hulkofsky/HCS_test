import React, {Component} from 'react'

export default function (WrappedComponent) {
  class Snackbar extends Component {
    state = {
      isSnackbarOpen: false
    }

    showSnackbar = () => this.setState({isSnackbarOpen: true})

    hideSnackbar = () => this.setState({isSnackbarOpen: false})

    render() {
      return <WrappedComponent
        {...this.state}
        {...this.props}
        showSnackbar={this.showSnackbar}
        hideSnackbar={this.hideSnackbar}
      />
    }
  }

  Snackbar.displayName = `Snackbar(${WrappedComponent.displayName ||
  WrappedComponent.name ||
  `Component`})`

  return Snackbar
}
