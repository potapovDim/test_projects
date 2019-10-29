import React from "react"
import ReactDOM from "react-dom"
import {Provider} from 'react-redux'
import store from './reducers/rootReducer'
import {initStore} from './reducers/cases'
import lsStore from './utils/local.storage'

import App from "./App.js"

import {getBaseInfo} from './server-client/actions'

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
