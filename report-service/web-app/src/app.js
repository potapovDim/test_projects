import './styles/app.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import {
  FailedCasesList,
  ReportConfig,
  Header,
  StatisticsFlakyCases,
  StatisticsFailedReasons,
  RunStatistics,
  NavigationMenu
} from './containers'

import {locationStorage} from './utils'

const contentMap = {
  RunStatistics,
  FailedCasesList,
  ReportConfig,
  StatisticsFlakyCases,
  StatisticsFailedReasons
}

class App extends Component {

  state = {
    content: locationStorage.getLocationHash() || 'RunStatistics'
  }

  toggleContent = (name) => {
    this.setState({content: name})
    locationStorage.setLocationHash(name)
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
