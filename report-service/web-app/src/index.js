import React from "react"
import ReactDOM from "react-dom"
import {Provider} from 'react-redux'
import store from './reducers/rootReducer'
import {initStore} from './reducers/cases'
import lsStore from './utils/local.storage'

import App from "./App.js"

import {getBaseInfo} from './server-client/actions'

/**
 *
 * 1. Check storage: if config exists
 *
 * *************************************************************************
 * 1.1 If exists: try to resync config from backend
 * 1.1.1 If Backend config does not exists set config from local storage
 *
 * *************************************************************************
 * 1.2 If does not exists try to get config from backend
 * 1.2.1 If config exists on backend side:  Get config and set it to local storage
 * 1.2.2 If config does not exist on backend side: Show only configure page
 * *************************************************************************
 *
 * 2. Check backend api: if config exists
 * 3.
 */











function dispatchIitialState(result) {
  // try to find config in localStorage if config does not exists
  if(!result.config || !Object.keys(result.config).length) {
    const lsConfig = lsStore.lsGet('config')
    if(lsConfig) {
      result.config = lsConfig
    }
  }
  return store.dispatch(initStore(result))
}

getBaseInfo(dispatchIitialState).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  )
})

