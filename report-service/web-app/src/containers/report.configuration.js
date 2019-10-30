import React, {Component} from 'react'
import {connect} from 'react-redux'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import lStorage from '../utils/local.storage'
import {updateReportConfig} from '../server-client/actions'
import {updateConfig} from '../reducers/cases'

const defaultConfig = {
  testCaseStructure: {},
  serverHost: null,
  failedReasons: []
}

// TODO
/**
 * shoulb be custom input compoennt
 */
class ReporterConfig extends Component {

  state = {
    // testCaseStructure: {},
    // failedReasons: [],
    // serverHost: null
  }

  UNSAFE_componentWillMount() {
    const config = lStorage.lsGet('config')

    if(config) {
      this.state.failedReasons = config.failedReasons || []

      this.state.serverHost = config.serverHost || null

      this.state.testCaseStructure = config.testCaseStructure

      if(this.refs.storageUrl) {
        this.refs.storageUrl = this.state.serverHost
      }
    }
  }

  updateConfig = (data) => {
    const existingConfig = lStorage.lsGet('config')
    const newConfig = {...existingConfig, ...data.jsObject}

    console.log(newConfig, 'new config')

    lStorage.lsSet('config', newConfig)

    this.props.dispatch(updateConfig(newConfig))
  }

  updateServerHost = ({target: {value}}) => {
    this.setState({...this.state, serverHost: value})
  }

  syncConfig = () => {
    const {serverHost, ...rest} = this.state
    lStorage.lsSet('config', JSON.stringify(rest))
    return updateReportConfig({config: rest})
  }

  render() {
    const lStorageConfig = lStorage.lsGet('config')
    console.log(lStorageConfig)
    return (
      <div>
        <h3>Configuration </h3>
        {/* <input placeholder="Reporter failed reasons" onChange={this.updateConfig}></input> */}
        <button onClick={this.syncConfig}>Sync config</button>
        <h3>Backend service storage url</h3>
        <h3>Configuration</h3>

        <JSONInput
          id='a_unique_id'
          onChange={this.updateConfig}
          placeholder={lStorageConfig}
          locale={locale}
          height='400px'
        />

      </div>
    )
  }
}

export default connect(({config}) => ({config}))(ReporterConfig)
