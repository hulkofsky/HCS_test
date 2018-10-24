import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import store from './redux/store'
import {history} from './history'

// polyfills for IE-11
import 'core-js/fn/object/assign'
import 'core-js/fn/promise'

// components
import App from './components/App/index'

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)