import React, {Component} from "react";
import FailedCasesList from './containers/test.cases.list'
import Header from './containers/header'

import './styles/app.css'

class App extends Component {

  render() {

    return (
      <div>
        <Header />
        <h1>Report Service</h1>
        <FailedCasesList />
      </div>
    );
  }
}

export default App
