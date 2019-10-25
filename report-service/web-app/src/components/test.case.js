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
    const {id, date, build, stack, env} = this.props
    const {onClick, title = 'Action button'} = this.props
    return (
      <div>
        <h3 onClick={this.toggleTestCaseInfo}>Test case id: {id}</h3>
        {isOpened &&
          (
            <div className={'test-case-body'}>
              {onClick && <button onClick={() => onClick(id)}>{title}</button>}
              <div> <span>Execution date   </span> {fromNumberToMDY(date)} </div>
              <div> <span>Build number     </span> {build}                 </div>
              <div> <span>Stack trace      </span> {stack}                 </div>
              env && <div><span>Environment</span> {env}                   </div>
            </div>
          )}
      </div>
    )
  }
}

export {
  TestCase
}
