import {APP_NAME} from '../../config'

const MODULE_NAME = 'tasks'
const PREFIX = `${APP_NAME}/${MODULE_NAME}`
import {Api} from '../../utils/api'
import axios from 'axios'

// ACTION TYPES
const SEND_REQUEST = `${PREFIX}/SEND_REQUEST`
const REQUEST_COMPLETED_SUCCESSFULLY = `${PREFIX}/REQUEST_COMPLETED_SUCCESSFULLY`
const REQUEST_FAILED = `${PREFIX}/REQUEST_FAILED`
const UPDATE_TASK = `${PREFIX}/UPDATE_TASK`
const DELETE_TASK = `${PREFIX}/DELETE_TASK`

// INITIAL STATE
const initialState = {
  pending: false,
  error: '',
  tasks: []
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

    case REQUEST_COMPLETED_SUCCESSFULLY:
      return {
        ...state,
        pending: false,
        tasks: payload.tasks
      }

    case REQUEST_FAILED:
      return {
        ...state,
        pending: false,
        error: payload.error
      }

    case UPDATE_TASK:
      return {
        ...state,
        pending: false,
        tasks: state.tasks.map(task => {
          if (task._id === payload.id) {
            return payload.task
          }
          return task
        })
      }

    case DELETE_TASK:
      return {
        ...state,
        pending: false,
        tasks: state.tasks.filter(task => {
          return task._id !== payload.id
        })
      }

    default:
      return state
  }
}

// ACTION CREATORS
function sendRequest() {
  return {type: SEND_REQUEST}
}

function requestCompletedSuccessfully(tasks) {
  return {
    type: REQUEST_COMPLETED_SUCCESSFULLY,
    payload: {tasks}
  }
}

export function requestFailed(error) {
  return {
    type: REQUEST_FAILED,
    payload: {error}
  }
}

// SIDE EFFECTS
export function getAllTasks(userId) {
  return function (dispatch) {
    return new Promise((ok, stop) => {
      dispatch(sendRequest())
      Api.getTasks(userId)
        .then(response => {
          if (response.data.success) {
            dispatch(requestCompletedSuccessfully(response.data.tasks))
            ok()
          } else {
            dispatch(requestFailed(response.data.message))
            throw Error(response.data.message)
          }
        })
        .catch(error => {
          dispatch(requestFailed(error.message))
          stop(error)
        })
    })
  }
}

export function addNewTask(userId, task) {
  return function (dispatch) {
    return new Promise((ok, stop) => {
      dispatch(sendRequest())
      Api.addNewTask(userId, task)
        .then(response => {
          if (response.data.success) {
            dispatch(getAllTasks(userId))
            ok()
          } else {
            dispatch(requestFailed(response.data.message))
            throw Error(response.data.message)
          }
        })
        .catch(error => {
          dispatch(requestFailed(error.message))
          stop(error)
        })
    })
  }
}

export function updateOneTask(userId, taskId, task) {
  return function (dispatch) {
    return new Promise((ok, stop) => {
      dispatch(sendRequest())
      Api.updateTask(userId, taskId, task)
        .then(response => {
          if (response.data.success) {
            dispatch(getAllTasks(userId))
            ok()
          } else {
            dispatch(requestFailed(response.data.message))
            throw Error(response.data.message)
          }
        })
        .catch(error => {
          dispatch(requestFailed(error.message))
          stop(error)
        })
    })
  }
}

export function deleteOneTask(userId, taskId) {
  return function (dispatch) {
    return new Promise((ok, stop) => {
      dispatch(sendRequest())
      Api.removeTask(userId, taskId)
        .then(response => {
          if (response.data.success) {
            dispatch(getAllTasks(userId))
            ok()
          } else {
            dispatch(requestFailed(response.data.message))
            throw Error(response.data.message)
          }
        })
        .catch(error => {
          dispatch(requestFailed(error.message))
          stop(error)
        })
    })
  }
}