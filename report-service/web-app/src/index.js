import React from "react"
import ReactDOM from "react-dom"
import {Provider} from 'react-redux'
import store from './reducers/rootReducer'
import {initStore} from './reducers/cases'

import {getBaseInfo} from './server-client/actions'
import App from "./App.js"

getBaseInfo().then((result) => {
  // init base storage state
  store.dispatch(initStore(result))
  // render application
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  )
})

