import './styles/app.css'

import React, {Component} from 'react'
import pubsub from 'pubsub-js'
import {connect} from 'react-redux'
import {locationStorage, dataFormatter} from './utils'
import {ModalWrapper, } from './components'

import {
  FailedCasesList,
  ReportConfig,
  Header,
  StatisticsFlakyCases,
  StatisticsFailedReasons,
  RunStatistics,
  NavigationMenu,
  TechnicalSpecifications
} from './containers'

const contentMap = {
  RunStatistics,
  FailedCasesList,
  StatisticsFlakyCases,
  StatisticsFailedReasons,
  ReportConfig,
  TechnicalSpecifications
}

class App extends Component {

  state = {
    content: locationStorage.getLocationHash() || 'RunStatistics'
  }

  toggleContent = (name) => {
    this.setState({content: name})
    locationStorage.setLocationHash(name)
  }

  componentDidMount() {
    pubsub.subscribe('modal_view', (ms, modalData) => {
      console.info(ms)
      this.setState({...this.state, modalData: {...modalData, isOpen: true}})
    })
  }

  render() {
    const {config} = this.props

    const {content, modalData} = this.state
    const Content = contentMap[content]

    return (
      <div className="report-service-app">
        <ModalWrapper {...modalData} askToClose={() => this.setState({...this.state, modalData: null})} />
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
