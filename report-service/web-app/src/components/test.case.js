import './styles/test.case.css'

import React, {Component} from 'react';
import {fromNumberToMDY} from '../utils/date'

/**
 *  @example {
 *  id: 'Test case 1',
 *  date: 1569677669693,
 *  build: 'Build number or description',
 *  stack: 'Some stack trace'
 * }
 */
/**
 * @returns {body: object<{isAutoApproveUploads: boolean}>}
 */
class TestCase extends Component {
  state = {
    isOpened: false
  }

  toggleTestCaseInfo = () => this.setState({isOpened: !this.state.isOpened})

  render() {
    const {isOpened} = this.state
    const {onClick, ...rest} = this.props
    const {
      id,
      date,
      build,
      stack,
      stackTrace,
      env,
      title = 'Action button'
    } = rest

    return (
      <div className='test_case'>
        <div className="test_case_id" onClick={() => this.toggleTestCaseInfo()}>Test case id: {id}</div>
        {isOpened &&
          (
            <div className='test_case_body'>
              {onClick && <button onClick={() => onClick(rest)}>{title}</button>}
              <div> <span>Execution date   </span> {fromNumberToMDY(date)}          </div>
              <div> <span>Build number     </span> {build}                          </div>
              <div> <span>Stack trace      </span> {stackTrace ? stackTrace : stack}</div>
              env && <div><span>Environment</span> {env}                            </div>
            </div>
          )}
      </div>
    )
  }
}

export {
  TestCase
}
