import axios from 'axios'
import {BASE_URL} from '../config'
import {ls} from './localStorage'

// axios config
axios.defaults.baseURL = BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['token'] = ls.get('token') ? ls.get('token') : ''

export const Api = Object.freeze({
  loginUser(user) {
    return axios.post('/login', user)
  },

  getTasks(userId) {
    return axios.get(`/${userId}/tasks`)
  },

  addNewTask(userId, task) {
    return axios.post(`/${userId}/tasks`, task)
  },

  getOneTask(userId, taskId) {
    return axios.get(`/${userId}/tasks/${taskId}`)
  },

  updateTask(userId, taskId, task) {
    return axios.put(`/${userId}/tasks/${taskId}`, task)
  },

  removeTask(userId, taskId) {
    return axios.delete(`/${userId}/tasks/${taskId}`)
  }
})