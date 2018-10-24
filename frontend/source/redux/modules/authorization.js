import {APP_NAME} from '../../config'

const MODULE_NAME = 'authorization'
const PREFIX = `${APP_NAME}/${MODULE_NAME}`
import {Api} from '../../utils/api'
import {ls} from '../../utils/localStorage'
import axios from 'axios'

// ACTION TYPES
const SEND_REQUEST = `${PREFIX}/SEND_REQUEST`
const LOGIN_COMPLETED_SUCCESSFULLY = `${PREFIX}/LOGIN_COMPLETED_SUCCESSFULLY`
const LOGIN_FAILED = `${PREFIX}/LOGIN_FAILED`
const LOGOUT = `${PREFIX}/LOGOUT`

// INITIAL STATE
const initialState = {
  isAuthorized: !!ls.get('token'),
  pending: false,
  error: '',
  user: null
}

// REDUCER
export default function (state = initialState, action = {}) {
  const {type, payload} = action

  switch (type) {
    case SEND_REQUEST:
      return {
        ...state,
        pending: true,
        error: ''
      }

    case LOGIN_COMPLETED_SUCCESSFULLY:
      return {
        ...state,
        isAuthorized: true,
        pending: false,
        user: payload.user
      }

    case LOGIN_FAILED:
      return {
        ...state,
        pending: false,
        error: payload.error
      }

    case LOGOUT:
      return {
        isAuthorized: false,
        pending: false,
        error: '',
        user: null
      }

    default:
      return state
  }
}

// ACTION CREATORS
function sendRequest() {
  return {type: SEND_REQUEST}
}

function loginCompletedSuccessfully(user) {
  return {
    type: LOGIN_COMPLETED_SUCCESSFULLY,
    payload: {user}
  }
}

function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    payload: {error}
  }
}

// HELPERS
export const toLocalStorage = (token, user) => {
  ls.set('token', token)
  ls.set('user', user)
  axios.defaults.headers.common['token'] = token
}

export const clearLocalStorage = () => {
  ls.remove('token')
  ls.remove('user')
  delete axios.defaults.headers.common['token']
}

// SIDE EFFECTS
export function login(user) {
  return function (dispatch) {
    return new Promise((ok, stop) => {
      dispatch(sendRequest())
      Api.loginUser(user)
        .then(response => {
          if (response.data.success) {
            dispatch(loginCompletedSuccessfully(response.data.user))
            toLocalStorage(response.data.user.token, response.data.user)
            ok()
          } else {
            dispatch(loginFailed(response.data.message))
            clearLocalStorage()
            throw Error(response.data.message)
          }
        })
        .catch(error => {
          dispatch(loginFailed(error.message))
          stop(error)
        })
    })
  }
}

export function logout() {
  return function (dispatch) {
    return new Promise((ok, stop) => {
      dispatch({type: LOGOUT})
      clearLocalStorage()
      ok()
    })
  }
}
