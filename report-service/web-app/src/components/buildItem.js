import React, {Component} from 'react'

class BuildItem extends Component {
  state = {
    isOpened: false
  }

  toggleBuilInfo = () => this.setState({isOpened: !this.state.isOpened})

  render() {
    const {buildNumber, cases = [], } = this.props
    const {isOpened} = this.state
    return (
      <div className="build_item">
        <div onClick={this.toggleBuilInfo}>Build number: {buildNumber} &220E </div>
        {isOpened && cases.map((testCaseId) => <div>{testCaseId}</div>)}
      </div>
    )
  }
}

export {
  BuildItem
}