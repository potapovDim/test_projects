import React from "react"
import ReactDOM from "react-dom"
import {Provider} from 'react-redux'
import store from './reducers/rootReducer'
import {initStore} from './reducers/cases'

import App from "./App.js"

import {globalSyncWithBackend} from './server-client/actions'

function dispatchIitialState(result) {
  return store.dispatch(initStore(result))
}

globalSyncWithBackend(dispatchIitialState).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  )
})
