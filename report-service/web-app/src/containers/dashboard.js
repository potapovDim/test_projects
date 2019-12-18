import React, {Component} from 'react'
import {connect} from 'react-redux'
import lStorage from '../utils/local.storage'
import {updateReportConfig} from '../server-client/actions'
import {updateConfig} from '../reducers/action.creators'

class Dashboard extends Component {

  render() {
    return (
      <div className="dashboard">
        Dashboard
      </div>
    )
  }
}

export default connect(({cases}) => (cases))(Dashboard)
