import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ls} from '../../../utils/localStorage'
import {capitalizeFirstLetter} from '../../../utils/helpers'
import {logout} from '../../../redux/modules/authorization'
import {history} from '../../../history'
import {Path} from '../../routes'

// style
import ClassNames from './page-header.css'

// components
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import NewTask from './NewTask/index'
import Snackbar from '@material-ui/core/Snackbar'

class PageHeader extends Component {
  static propTypes = {
    // from reducer authorization
    logout: PropTypes.func,
    // from HOC snackbar
    showSnackbar: PropTypes.func,
    hideSnackbar: PropTypes.func,
    isSnackbarOpen: PropTypes.bool
  }

  state = {
    isDialogOpen: false
  }

  showDialog = () => this.setState({ isDialogOpen: true })
  hideDialog = () => this.setState({ isDialogOpen: false })

  getUserName = () => {
    if (!ls.get('user')) return
    const user = ls.get('user')
    return capitalizeFirstLetter(user.username)
  }

  onButtonLogoutClick = event => {
    event && event.preventDefault && event.preventDefault()
    const {logout} = this.props
    logout().then(() => history.replace(Path.login))
  }

  onButtonNewTaskClick = event => {
    event && event.preventDefault && event.preventDefault()
    this.showDialog()
  }

  render() {
    const {isDialogOpen} = this.state
    const {error, isSnackbarOpen, hideSnackbar} = this.props
    return (
      <header className={ClassNames.header}>
        {
          isSnackbarOpen && <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            onClose={hideSnackbar}
            open={error}
            autoHideDuration={2000}
            message={<span id="message-id">{error}</span>}
          />
        }
        <AppBar position="static">
          <Toolbar>
            {
              ls.get('user') ?
                <Typography
                  variant="h6"
                  color="inherit"
                  className={ClassNames.title}
                >
                  {this.getUserName()}
                </Typography>
                :
                null
            }
            <Button
              color="inherit"
              style={{marginRight: 15}}
              onClick={this.onButtonNewTaskClick}
            >
              Add new task
            </Button>
            <Button color="inherit" onClick={this.onButtonLogoutClick}>Logout</Button>
          </Toolbar>
        </AppBar>
        <NewTask
          open={isDialogOpen}
          hideDialog={this.hideDialog}
        />
      </header>
    )
  }
}

const mapStateToProps = state => ({ error: state.tasks.error })
const mapDispatchToProps = {logout}

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader)