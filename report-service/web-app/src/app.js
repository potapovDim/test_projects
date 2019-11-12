import './styles/app.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import FailedCasesList from './containers/test.cases.list'
import ReportConfig from './containers/report.configuration'
import Header from './containers/header'
import Dashboard from './containers/dashboard'
import Statistics from './containers/statistics'
import BuildStatistics from './containers/builds.statistics'
import NavigationMenu from './containers/navigation.menu'
import lStorage from './utils/local.storage'

import Modal from 'react-modal'


const contentMap = {
  BuildStatistics,
  FailedCasesList,
  ReportConfig,
  Statistics,
  // Dashboard,
}

class App extends Component {

  state = {
    content: 'ReportConfig'
  }

  UNSAFE_componentWillMount() {
    const currentView = lStorage.lsGet('view')
    currentView && this.toggleContent(currentView)
  }

  toggleContent = (name) => {
    this.setState({content: name})
    lStorage.lsSet('view', name)
  }

  render() {
    const {config} = this.props

    const {content} = this.state
    const Content = contentMap[content]

    return (
      <div>

        <Modal isOpen={!config} ariaHideApp={false}>
          <ReportConfig />
        </Modal>
        <Header />
        <div className="report_main">

          <NavigationMenu
            toggleContent={this.toggleContent}
            navidationButtons={Object.keys(contentMap).map((key) => key)}
          />

          <div className="content">

            <Content />

          </div>
        </div>
      </div>
    )
  }
}

export default connect(({cases: {config}}) => ({config}))(App)
