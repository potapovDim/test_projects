import './styles/build.item.css'

import React, {Component} from 'react'
import {Dot} from './dot'
import {TestCase} from './test.case'
import classnames from 'classnames'

class BuildItem extends Component {
  state = {
    isOpened: false,
    caseInfo: null
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

  render() {
    const {isOpened, caseInfo} = this.state
    const {run, count, cases, isSuccess, runStatus, ...rest} = this.props

    const classNames = classnames('build_item', !count ? 'warning' : '')

    console.log(caseInfo)
    return (
      <div className={classNames}>
        <div onClick={this.toggleBuilInfo}>Run number: {run} Failes tests quantity is: {cases.length}  {this.renderDots(cases)}  </div>
        {isOpened &&
          <div>
            <div>Run status is: {isSuccess(runStatus) ? 'success' : 'fail'}</div>
            {!count && (
              <h3>WARNING: this build does not have enough information, builds results will not take part in common statistics</h3>
            )}
            {!!count && (
              <div>
                <div>Executed cases in build: {count}</div>
                <div>Failed persentage is: {Math.floor(cases.length / (count / 100))} %</div>
              </div>
            )}

            <div>Failed cases in build cases is: {cases.length}</div>
            <div className="build_content">
              <div className="cases_list">
                {
                  cases.map((testCase, index) => <TestCase
                    {...testCase}
                    onOpen={this.openTestCaseInfo}
                    key={index}
                    className={'small_case'}
                  />)
                }
              </div>
              <div className="case_content">{!!caseInfo && <TestCase {...caseInfo} isOpened={true} />}</div>
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