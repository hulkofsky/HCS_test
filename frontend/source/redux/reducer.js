import {combineReducers} from 'redux'

// modules
import authorization from './modules/authorization'
import tasks from './modules/tasks'

export default combineReducers({
  authorization,
  tasks
})