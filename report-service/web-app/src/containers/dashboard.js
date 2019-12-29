import React, {Component} from 'react'
import {connect} from 'react-redux'

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
