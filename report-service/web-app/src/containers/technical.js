import './styles/technical.css'

import React, {Component} from 'react'
import {Button, Dot} from '../components'
// import {locationStorage} from '../utils'
import {getTechnicalInfo} from '../server-client/actions'
import ReactJSON from 'react-json-view'


class TechnicalSpecifications extends Component {
  state = {

  }

  componentDidMount() {
    getTechnicalInfo(this.initTechInfo)
  }

  initTechInfo = (data) => {
    this.setState({...this.state, ...data})
  }

  render() {
    const {
      ADDAPTER,
      currentConfig,
      testCasesStorageCount,
      runsStorageCount
    } = this.state

    return (
      <div className="technical_specifications">
        <h3>Technical information about Report-Service</h3>
        <div> <Dot className={"medium"} /> Reporter addapter is {ADDAPTER}</div>
        {ADDAPTER === 'memory' &&
          <div><Button title={"Eneble store to disk"}/></div>
        }
        <div> <Dot className={"medium"} /> Available tests count is {testCasesStorageCount} </div>
        <div> <Dot className={"medium"} /> Available runs count is {runsStorageCount} </div>
        <div> <Dot className={"medium"} /> Current config is <ReactJSON src={currentConfig} /></div>

      </div>
    )
  }
}

export default TechnicalSpecifications
