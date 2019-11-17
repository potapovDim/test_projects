import React, {Component} from 'react'
import Modal from 'react-modal'
import {Button} from './button'
import {TestCase} from './test.case'

class TestCasesModal extends Component {

  renderTestCaseList = () => {
    const {cases} = this.props
    return cases
      .map((testCase, index) =>
        <TestCase
          key={index} {...testCase}
          title={"Test case history"}
        />
      )
  }

  render() {
    const {askToClose, cases: {length}} = this.props
    return (
      <Modal isOpen={!!length} ariaHideApp={false}>
        <Button clickAction={askToClose} title={'Close'} />
        {this.renderTestCaseList()}
      </Modal>
    )
  }
}

export {
  TestCasesModal
}
