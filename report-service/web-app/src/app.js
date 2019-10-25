import React, {Component} from "react";
import FailedCasesList from './containers/test.cases.list'
import ReportConfig from './containers/report.configuration'
import Header from './containers/header'
import Statistics from './containers/statistics'
import './styles/app.css'


// temp



class App extends Component {

  state = {
    dashboard: true,
    testCasesList: false,
    reporterConfig: false,
    statistics: false
  }

  UNSAFE_componentWillMount() {
    const currentView = localStorage.getItem('view')
    currentView && this.toggleContent(currentView)
  }

  toggleContent = (name) => {
    const newState = Object.keys(this.state).reduce(function(state, key) {
      state[key] = key !== name ? false : true
      return state
    }, {})
    this.setState(newState)

    localStorage.setItem('view', name)
  }

  render() {
    const {dashboard, testCasesList, reporterConfig, statistics} = this.state

    return (
      <div>
        <Header />
        <h1>Report Service</h1>
        <div className="navigation_menu">
          <button onClick={() => this.toggleContent('dashboard')}>Dashboard</button>
          <button onClick={() => this.toggleContent('testCasesList')}>Test list</button>
          <button onClick={() => this.toggleContent('reporterConfig')}>Configuration</button>
          <button onClick={() => this.toggleContent('statistics')}>Statistics</button>
        </div>
        {dashboard && <div>Dashboard</div>}
        {testCasesList && <FailedCasesList />}
        {reporterConfig && <ReportConfig />}
        {statistics && <Statistics />}
      </div>
    );
  }
}

export default App
