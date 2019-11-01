import React from "react"
import ReactDOM from "react-dom"
import {Provider} from 'react-redux'
import store from './reducers/rootReducer'
import {updateConfig, updateCasesList} from './reducers/action.creators'
import lsStore from './utils/local.storage'
import App from "./App.js"
import {getReportConfig, getTestCases} from './server-client/actions'

function renderMainApplication() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  )
}

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

const config = lsStore.lsGet('config')

if(!config) {
  console.error('localStorage does not have config will try to get config from origin server')
  getReportConfig().then(({config}) => {
    if(config) {
      lsStore.lsSet('config', config)
      store.dispatch(updateConfig(config))
      if(config.serverHost) {
        return getTestCases()
          .then((cases) => {
            return store.dispatch(updateCasesList(cases))
          })
          .then(renderMainApplication)
      }
    } else {
      renderMainApplication()
    }
  })
} else {
  store.dispatch(updateConfig(config))
  getTestCases()
    .then((cases) => {
      if(Array.isArray(cases)) {
        store.dispatch(updateCasesList(cases))
      }
      return
    })
    .then(renderMainApplication)
}
