import React, {Component} from 'react';

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

    return (
      <div>
        <h3 onClick={this.toggleTestCaseInfo}>{id}</h3>
        {
          isOpened && (
            <div className={'test-case-body'}>
              <div >{date}</div>
              <div >{build}</div>
              <div >{stack}</div>
              env && <div>${env}</div>
            </div>
          )
        }
      </div>
    )
  }
}

export {
  TestCase
}