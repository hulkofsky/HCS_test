import React from 'react'
import PropTypes from 'prop-types'
import BaseForm from '../../elements/BaseForm/index'
import {connect} from 'react-redux'
import {login} from '../../../redux/modules/authorization'
import {history} from '../../../history'
import {Path} from '../../routes/index'
import snackbar from '../../HOC/snackbar'

// components
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'

// styles
import ClassName from './login.css'

class Login extends BaseForm {

  static propTypes = {
    // from reducer authorization
    login: PropTypes.func,
    pending: PropTypes.bool,
    error: PropTypes.string,
    // from HOC snackbar
    showSnackbar: PropTypes.func,
    hideSnackbar: PropTypes.func,
    isSnackbarOpen: PropTypes.bool
  }

  state = {
    formFieldsConfig: {
      username: {
        name: 'username',
        value: '',
        label: 'Enter your name',
        id: 'user-name-id',
        touched: false
      },
      password: {
        name: 'password',
        value: '',
        label: 'Enter your password',
        id: 'user-password-id',
        touched: false
      }
    }
  }

  onSubmit = event => {
    event && event.preventDefault && event.preventDefault()

    if (this.disableSubmit()) return

    const {login, showSnackbar} = this.props

    this.collectDataToSubmit(this.state)
      .then(user => {
        login(user)
          .then(() => {
            history.replace(Path.home)
          })
          .catch(error => {
            showSnackbar()
            window.console.error(error.message)
          })
      })
  }

  render() {
    const {username, password} = this.state.formFieldsConfig
    const {error, isSnackbarOpen, hideSnackbar, pending} = this.props
    const isUserNameTouched = username.touched && !username.value
    const isUserPasswordTouched = password.touched && !password.value
    return (
      <section className={ClassName.wrapper}>
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
        <h1 className={ClassName.hidden}>Login page</h1>
        <form
          className={ClassName.form}
          noValidate
          onSubmit={this.onSubmit}
        >
          <legend className={ClassName.title}>Sign in</legend>
          <fieldset className={ClassName.fieldset}>
            <div className={ClassName['input-wrapper']}>
              <TextField
                {...username}
                className={ClassName.input}
                onChange={this.onChangeValueInput}
                onBlur={this.onBlurInput}
                error={isUserNameTouched}
                helperText={isUserNameTouched ? 'This field is required!' : ''}
              />
            </div>
            <div className={ClassName['input-wrapper']}>
              <TextField
                {...password}
                type='password'
                className={ClassName.input}
                onChange={this.onChangeValueInput}
                onBlur={this.onBlurInput}
                error={isUserPasswordTouched}
                helperText={isUserPasswordTouched ? 'This field is required!' : ''}
              />
            </div>
          </fieldset>
          <div className={ClassName['button-wrapper']}>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={ClassName.button}
              disabled={pending || this.disableSubmit()}
              onClick={this.onSubmit}
            >
              {pending ? 'Authentication...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </section>
    )
  }

}

const mapStateToProps = state => ({
  pending: state.authorization.pending,
  error: state.authorization.error
})
const mapDispatchToProps = {login}

export default connect(mapStateToProps, mapDispatchToProps)(
  snackbar(Login)
)