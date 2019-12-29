import './styles/test.case.css'

import React, {Component} from 'react';
import {Button} from './button'
import {dateFormatter, fromNumberToMDY} from '../utils'
import classnames from 'classnames'

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
      run,
      stack,
      stackTrace,
      env,
      title = 'Action button',
      className = ''
    } = rest

    const classNames = classnames('test_case', className)

    return (
      <div className={classNames}>
        <div className="test_case_id" onClick={() => this.toggleTestCaseInfo()}>Test case id: {id}</div>
        {isOpened &&
          (
            <div className='test_case_body'>
              {onClick && <Button title={title} onClick={() => onClick(rest)} />}
              <div> <span>Execution date   </span> {dateFormatter.fromNumberToMDY(date)}          </div>
              <div> <span>Run number     </span> {run}                          </div>
              <div> <span>Stack trace      </span> {stackTrace ? stackTrace : stack}</div>
              {env && <div><span>Environment</span> {env}                           </div>}
            </div>
          )}
      </div>
    )
  }
}

export {
  TestCase
}
