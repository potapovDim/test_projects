import './styles/build.item.css'

import React, {Component} from 'react'
import {Dot} from './dot'
import {TestCase} from './test.case'
import classnames from 'classnames'

class BuildItem extends Component {
  state = {
    isOpened: false
  }

  toggleBuilInfo = () => this.setState({isOpened: !this.state.isOpened})

  renderDots = (cases) => {
    if(cases.length > 250) {
      return (<span>{[...cases].splice(0, 50).map((testCaseId, index) => <Dot key={index} className={"small"} />)} ...</span>)
    } else {
      return (<span>{cases.map((testCaseId, index) => <Dot key={testCaseId + index} className={"small"} />)}</span>)
    }
  }

  render() {
    const {runNumber, cases = [], buildExecutedCases, isSuccess} = this.props
    const {isOpened} = this.state

    const classNames = classnames('build_item', !buildExecutedCases ? 'warning' : '')
    return (
      <div className={classNames}>
        <div onClick={this.toggleBuilInfo}>Run number: {runNumber} Failes tests quantity is: {cases.length}  {this.renderDots(cases)}  </div>
        {isOpened &&
          <div>
            <div>Run status is: {isSuccess ? 'success' : 'fail'}</div>
            {!buildExecutedCases && (
              <h3>WARNING: this build does not have enough information, builds results will not take part in common statistics</h3>
            )}
            {!!buildExecutedCases && (<div>
              <div>Executed cases in build: {buildExecutedCases}</div>
              <div>Failed persentage is: {Math.floor(cases.length / (buildExecutedCases / 100))} %</div>
            </div>)}
            <div>Failed cases in build cases is: {cases.length}</div>
            {
              cases.map((testCase, index) => <TestCase key={index} {...testCase} className={'small_case'} />)
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