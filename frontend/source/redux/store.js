import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import reducer from './reducer'

const enhancer = [thunk]

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(...enhancer)
  )
)

export default store