import './styles/build.item.css'

import React, {Component} from 'react'
import pubsub from 'pubsub-js'
import {ArrowDown, ArrowUp} from '../icons'
import {Dot} from './dot'
import {TestCase} from './test.case'
import classnames from 'classnames'

class BuildItem extends Component {
  state = {
    isOpened: false,
    caseInfo: null
  }

  openCaseHistory = (data) => {
    if(data.historyCases.length) {
      pubsub.publish('modal_view', {cases: data.historyCases})
    }
  }

  toggleBuilInfo = () => this.setState({isOpened: !this.state.isOpened})

  openTestCaseInfo = (caseInfo) => this.setState({...this.state, caseInfo})

  renderDots = (cases) => {
    if(cases.length > 50) {
      return (<span>{[...cases].splice(0, 50).map((_, index) => <Dot key={index} className={"small"} />)} ...</span>)
    } else {
      return (<span>{cases.map((testCaseId, index) => <Dot key={testCaseId + index} className={"small"} />)}</span>)
    }
  }

  renderTestCaseInfo = () => {
    const {caseInfo} = this.state

    if(caseInfo) {
      return (<TestCase
        {...caseInfo}
        isOpened={true}
        onClick={caseInfo.historyCases.length ? this.openCaseHistory : undefined}
        title={'Test case history'}
      />)
    }
  }

  renderTestCasesList = () => {
    const {cases} = this.props

    return cases.map((testCase, index) => <TestCase
      {...testCase}
      onOpen={this.openTestCaseInfo}
      key={index}
      className={'small_case'}
    />)
  }

  renderDescriptor = () => {
    const {isOpened} = this.state
    return isOpened ? <ArrowUp size={25} /> : <ArrowDown size={25} />
  }

  render() {
    const {isOpened} = this.state
    const {run, count, cases, isSuccess, runStatus} = this.props
    const classNames = classnames('build_item', !count ? 'warning' : '')

    return (
      <div className={classNames}>
        <div onClick={this.toggleBuilInfo}>
          {this.renderDescriptor()} Run number: {run} Failed tests quantity is: {cases.length}  {this.renderDots(cases)}
        </div>

        {isOpened &&
          <div>
            <div>Run status is: {isSuccess(runStatus) ? 'success' : 'fail'}</div>
            {!count && <h3>WARNING: this build does not have enough information, builds results will not take part in common statistics</h3>}
            {!!count &&
              <div>
                <div>Executed cases in build: {count}</div>
                <div>Failed persentage is: {Math.floor(cases.length / (count / 100))} %</div>
              </div>
            }
            <div>Failed cases in build cases is: {cases.length}</div>
            <div className="build_content">
              <div className="cases_list">{this.renderTestCasesList()}</div>
              <div className="case_content">{this.renderTestCaseInfo()}</div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export {
  BuildItem
}