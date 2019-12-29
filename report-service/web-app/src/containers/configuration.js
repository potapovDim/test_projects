import React, {Component} from 'react'
import {connect} from 'react-redux'
import lStorage from '../utils/local.storage'
import {updateReportConfig} from '../server-client/actions'
import {updateConfig} from '../reducers/action.creators'
import {Button} from '../components/button'
import ReactJSON from 'react-json-view'

const defaultConfig = {
  testCaseStructure: {},
  serverHost: null,
  failedReasons: []
}

class ReportConfig extends Component {

  state = {
    showExample: false
  }

  componentDidMount() {
    const existingConfig = lStorage.lsGet('config')
    if(existingConfig && Object.keys(existingConfig).length) {
      this.setState({...this.state, ...existingConfig})
    }
  }

  updateConfigNew = (data) => {
    const updatedConfig = data.updated_src
    const existingConfig = lStorage.lsGet('config')

    const newConfig = {...existingConfig, ...updatedConfig}
    this.setState({...this.state, ...newConfig})
    lStorage.lsSet('config', newConfig)
  }


  updateConfig = (data) => {
    const existingConfig = lStorage.lsGet('config')

    const newConfig = {...existingConfig, ...data.jsObject}

    this.setState({
      ...this.state,
      ...newConfig
    })

    lStorage.lsSet('config', newConfig)
  }

  updateServerHost = ({target: {value}}) => {
    this.setState({...this.state, serverHost: value})
  }

  syncConfig = () => {
    lStorage.lsSet('config', JSON.stringify(this.state))
    this.props.dispatch(updateConfig(this.state))
    return updateReportConfig({config: this.state})
  }

  showExample = () => {
    console.log('CLick')
    this.setState({...this.state, showExample: !this.state.showExample})
  }

  render() {
    const {showExample} = this.state
    let lStorageConfig = lStorage.lsGet('config')

    if(!lStorageConfig) {
      console.error('config was not found in local storage')
      lStorageConfig = defaultConfig
    }

    return (
      <div>
        {/* <h3>Configuration </h3> */}
        {/* <input placeholder="Reporter failed reasons" onChange={this.updateConfig}></input> */}
        <Button onClick={this.syncConfig} title={'Sync config'} />
        <Button onClick={this.showExample} title={'Show config example'} />
        {/* <h3>Backend service storage url</h3> */}
        {/* <h3>Configuration</h3> */}
        {
          showExample ?
            <div>Example</div> :
            <ReactJSON src={lStorageConfig} onEdit={this.updateConfigNew} onDelete={this.updateConfigNew} onAdd={this.updateConfigNew} />
        }


      </div>
    )
  }
}

export default connect(({config}) => ({config}))(ReportConfig)
