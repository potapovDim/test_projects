import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateReportConfig} from '../server-client/actions'
import {updateConfig} from '../reducers/cases'
// TODO
/**
 * shoulb be custom input compoennt
 */
class ReporterConfig extends Component {

  state = {
    failedReasons: []
  }

  updateFailedReason = ({target: {value}}) => {
    this.setState({
      failedReasons: value.split(',')
    })
  }

  updateConfig = () => {
    const configData = {failedReasons: this.state.failedReasons}
    this.props.dispatch(updateConfig(configData))
    updateReportConfig({config: configData})
  }

  render() {
    return (
      <div>
        <h3>Configuration </h3>
        <input placeholder="Reporter failed reasons" onChange={this.updateFailedReason}></input>
        <button onClick={this.updateConfig}>Create Config</button>
      </div>
    )
  }
}

export default connect(({config}) => ({config}))(ReporterConfig)
