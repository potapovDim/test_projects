import React, {Component} from 'react'
import {Dot} from './dot'

class BuildItem extends Component {
  state = {
    isOpened: false
  }

  toggleBuilInfo = () => this.setState({isOpened: !this.state.isOpened})

  renderDots = (cases) => {
    if(cases.length > 250) {
      return (<span>{[...cases].splice(0, 50).map((testCaseId) => <Dot key={testCaseId} className={"small"} />)} ...</span>)
    } else {
      return (<span>{cases.map((testCaseId) => <Dot key={testCaseId} className={"small"} />)}</span>)
    }
  }

  render() {
    const {buildNumber, cases = []} = this.props
    const {isOpened} = this.state
    return (
      <div className="build_item">
        <div onClick={this.toggleBuilInfo}>Build number: {buildNumber} Failes tests quantity is: {cases.length}  {this.renderDots(cases)}  </div>
        {isOpened && cases.map((testCaseId, index) => <div key={index}>{testCaseId}</div>)}
      </div>
    )
  }
}

export {
  BuildItem
}