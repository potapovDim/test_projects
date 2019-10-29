import React, {Component} from 'react'
import {connect} from 'react-redux'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import lStorage from '../utils/local.storage'
import {updateReportConfig} from '../server-client/actions'
import {updateConfig} from '../reducers/cases'


// TODO
/**
 * shoulb be custom input compoennt
 */
class ReporterConfig extends Component {
  state = {
    testCaseStructure: {},
    failedReasons: [],
    serverHost: null
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

  updateConfig = (confProp, data) => {
    this.setState({
      ...this.state, [confProp]: data.jsObject
    })
  }

  updateServerHost = ({target: {value}}) => {
    this.setState({...this.state, serverHost: value})
  }

  syncConfig = () => {
    const {serverHost, ...rest} = this.state

    this.props.dispatch(updateConfig(rest))
    lStorage.lsSet('config', JSON.stringify(rest))
    lStorage.lsSet('serverHost', serverHost)

    return updateReportConfig({config: rest})
  }

  render() {

    const {
      failedReasons = this.state.failedReasons,
      testCaseStructure = this.state.testCaseStructure
    } = this.props

    console.log(failedReasons, testCaseStructure)

    return (
      <div>
        <h3>Configuration </h3>
        {/* <input placeholder="Reporter failed reasons" onChange={this.updateConfig}></input> */}
        <button onClick={this.syncConfig}>Sync config</button>
        <h3>Backend service storage url</h3>
        <input placeholder="Storage url" onChange={this.updateServerHost} ref={this.refs.storageUrl}></input>
        <h3>Test-case format data</h3>

        <JSONInput
          id='a_unique_id'
          onChange={(item) => this.updateConfig('testCaseStructure', item)}
          placeholder={testCaseStructure}
          locale={locale}
          height='100px'
        />

        <h3>Failed reasons</h3>
        <JSONInput
          id='a_unique_id'
          onChange={(item) => this.updateConfig('failedReasons', item)}
          placeholder={failedReasons}
          locale={locale}
          height='100px'
        />
      </div>
    )
  }
}

export default connect(({config}) => ({config}))(ReporterConfig)
