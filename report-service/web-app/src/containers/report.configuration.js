import React, {Component} from 'react'
import {connect} from 'react-redux'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import {light_mitsuketa_tribute} from 'react-json-editor-ajrm/themes'
import lStorage from '../utils/local.storage'
import {updateReportConfig} from '../server-client/actions'
import {updateConfig} from '../reducers/cases'


// TODO
/**
 * shoulb be custom input compoennt
 */
class ReporterConfig extends Component {
  state = {
    testCaseStructure: {
      id: null,
      date: null,
      build: null,
      stack: null
    },
    failedReasons: [],
    serverHost: null
  }

  updateConfig = (confProp, data) => {
    this.setState({
      ...this.state, [confProp]: data.jsObject
    })
  }

  updateServerHost = ({target: {value}}) => {
    console.log(value, '!!!!!!!!!!!!!')
    this.setState({...this.state, serverHost: value})
    console.log(value, this.state.serverHost, '!!!!!!!!!!!!!')
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

    return (
      <div>
        <h3>Configuration </h3>
        {/* <input placeholder="Reporter failed reasons" onChange={this.updateConfig}></input> */}
        <button onClick={this.syncConfig}>Sync config</button>
        <h3>Backend service storage url</h3>
        <input placeholder="Storage url" onChange={this.updateServerHost}></input>
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
