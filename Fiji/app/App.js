import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'

import AppWithNavigationState from './navigators/AppNavigator'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(
      thunkMiddleware,
      logger
  )
)
console.log(store.getState())
const Main = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
)

export default Main
