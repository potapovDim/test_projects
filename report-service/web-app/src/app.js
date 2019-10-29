import './styles/app.css'

import React, {Component} from "react";
import FailedCasesList from './containers/test.cases.list'
import ReportConfig from './containers/report.configuration'
import Header from './containers/header'
import Statistics from './containers/statistics'
import lStorage from './utils/local.storage'
import {Button} from './components/button'


class App extends Component {

  state = {
    dashboard: true,
    testCasesList: false,
    reporterConfig: false,
    statistics: false
  }

  UNSAFE_componentWillMount() {
    const currentView = lStorage.lsGet('view')
    currentView && this.toggleContent(currentView)
  }

  toggleContent = (name) => {
    const newState = Object.keys(this.state).reduce(function(state, key) {
      state[key] = key !== name ? false : true
      return state
    }, {})

    this.setState(newState)
    lStorage.lsSet('view', name)
  }

  render() {
    const {dashboard, testCasesList, reporterConfig, statistics} = this.state

    return (
      <div>
        <Header />
        <div className="report_main">
          <div className="navigation_menu">

            <div>
              <Button clickAction={() => this.toggleContent('reporterConfig')} title={'Configuration'} />
            </div>
            <div>
              <Button clickAction={() => this.toggleContent('dashboard')} title={'Dashboard'} />
            </div>
            <div>
              <Button clickAction={() => this.toggleContent('testCasesList')} title={'Test list'} />
            </div>
            <div>
              <Button clickAction={() => this.toggleContent('statistics')} title={'Statistics'} />
            </div>
          </div>

          <div className="content">
            {dashboard && <div>Dashboard</div>}
            {testCasesList && <FailedCasesList />}
            {reporterConfig && <ReportConfig />}
            {statistics && <Statistics />}
          </div>
        </div>
      </div>
    );
  }
}

export default App
