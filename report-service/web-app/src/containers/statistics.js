import React, {Component} from 'react'
import {connect} from 'react-redux'

class Statistics extends Component {

  render() {
    return (
      <div>
        Statistics
      </div>
    )
  }
}

export default connect(({cases}) => ({cases}))(Statistics)
