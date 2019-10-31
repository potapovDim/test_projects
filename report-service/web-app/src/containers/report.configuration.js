import React, {Component} from 'react'
import {connect} from 'react-redux'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import lStorage from '../utils/local.storage'
import {updateReportConfig} from '../server-client/actions'
import {updateConfig} from '../reducers/action.creators'

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

  state = {}

  updateConfig = (data) => {
    const existingConfig = lStorage.lsGet('config')

    const newConfig = {...existingConfig, ...data.jsObject}

    this.setState({
      ...newConfig
    })
  }

  updateServerHost = ({target: {value}}) => {
    this.setState({...this.state, serverHost: value})
  }

  syncConfig = () => {
    lStorage.lsSet('config', JSON.stringify(this.state))
    this.props.dispatch(updateConfig(this.state))
    return updateReportConfig({config: this.state})
  }

  render() {
    let lStorageConfig = lStorage.lsGet('config')

    if(!lStorageConfig) {
      console.error('config was not found in local storage')
      lStorageConfig = defaultConfig
    }

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
