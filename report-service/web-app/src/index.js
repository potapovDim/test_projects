import React from "react"
import ReactDOM from "react-dom"
import {Provider} from 'react-redux'
import {updateConfig, updateCasesList, updateRunStatistics, store} from './reducers'
import lsStore from './utils/local.storage'
import App from "./App.js"
import {getReportConfig, getTestCases, getRunsStatistics} from './server-client/actions'

function renderMainApplication() {
  console.log('RENDER APPLICATION')
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


function initCases(testCases) {
  if(Array.isArray(testCases)) {
    store.dispatch(updateCasesList(testCases))
  }
}

function initRuns(runs) {
  if(Array.isArray(runs)) {
    store.dispatch(updateRunStatistics(runs))
  }
}

const existingConfig = lsStore.lsGet('config')

getReportConfig()
  .then(({config}) => {
    if(config && Object.keys(config).length && existingConfig) {
      const newConfig = {...existingConfig, ...config}
      lsStore.lsSet('config', newConfig)
      store.dispatch(updateConfig(newConfig))
    } else if(config && Object.keys(config).length) {
      lsStore.lsSet('config', config)
      store.dispatch(updateConfig(config))
    } else {
      lsStore.lsSet('config', {})
      store.dispatch(updateConfig({}))
    }
  })
  .then(getTestCases)
  .then(initCases)
  .then(getRunsStatistics)
  .then(initRuns)
  .then(renderMainApplication)

