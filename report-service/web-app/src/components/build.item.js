import React, {Component} from 'react'
import {Dot} from './dot'

class BuildItem extends Component {
  state = {
    isOpened: false
  }

  toggleBuilInfo = () => this.setState({isOpened: !this.state.isOpened})

  renderDots = (cases) => {
    if(cases.length > 250) {
      return (<span>{[...cases].splice(0, 50).map((testCaseId, index) => <Dot key={index} className={"small"} />)} ...</span>)
    } else {
      return (<span>{cases.map((testCaseId, index) => <Dot key={index} className={"small"} />)}</span>)
    }
  }

  render() {
    const {buildNumber, cases = [], buildExecutedCases} = this.props
    const {isOpened} = this.state
    return (
      <div className="build_item">
        <div onClick={this.toggleBuilInfo}>Build number: {buildNumber} Failes tests quantity is: {cases.length}  {this.renderDots(cases)}  </div>
        {isOpened &&
          <div>
            <div>Executed cases in build: {buildExecutedCases}</div>
            <div>Failed cases in build cases is: {cases.length}</div>
            <div>Failed persentage is: {Math.floor(cases.length / (buildExecutedCases / 100))} %</div>
            {
              cases.map((testCaseId, index) => <div key={index}>{testCaseId}</div>)
            }
          </div>
        }
      </div>
    )
  }
}

export {
  BuildItem
}