import './styles/app.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import FailedCasesList from './containers/test.cases.list'
import ReportConfig from './containers/configuration'
import Header from './containers/header'
import StatisticsFlakyCases from './containers/statistics.flaky.cases'
import StatisticsFailedReasons from './containers/statistics.failed.reasons'
import RunStatistics from './containers/run.statistics'
import NavigationMenu from './containers/navigation.menu'
import {locationStorage} from './utils'
import lStorage from './utils/local.storage'

import Modal from 'react-modal'


const contentMap = {
  RunStatistics,
  FailedCasesList,
  ReportConfig,
  StatisticsFlakyCases,
  StatisticsFailedReasons
}

class App extends Component {

  state = {
    content: 'ReportConfig'
  }

  UNSAFE_componentWillMount() {
    const currentViewHash = locationStorage.getLocationHash()
    const currentView = currentViewHash ? currentViewHash : 'RunStatistics'
    this.toggleContent(currentView)
  }

  toggleContent = (name) => {
    this.setState({content: name})
    locationStorage.setLocationHash(name)
    lStorage.lsSet('view', name)
  }

  render() {
    const {config} = this.props

    const {content} = this.state
    const Content = contentMap[content]

    return (
      <div className="report-service-app">

        <Modal isOpen={!config} ariaHideApp={false}>
          <ReportConfig />
        </Modal>

        <div className="report-service-header">
          <Header />
        </div>

        <div className="report-service-main-content">
          <div className="report-service-menu">
            <NavigationMenu
              toggleContent={this.toggleContent}
              navidationButtons={Object.keys(contentMap).map((key) => key)}
            />
          </div>

          <div className="report-service-content">
            <Content />
          </div>
        </div>

      </div >
    )
  }
}

export default connect(({cases: {config}}) => ({config}))(App)
