import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TestCase} from '../components/test.case'
import Modal from 'react-modal'

class FailedCasesList extends Component {
  state = {
    modalCases: []
  }

  getTestCaseHistory = (id) => {
    const {cases} = this.props
    const modalCases = cases
      .filter((testCase) => testCase.id === id)
    // .sort((testCaseA, testCaseB) => testCaseA.)
    this.setState({modalCases})
  }

  renderTestCaseList = (testCaseList) => testCaseList
    .map((testCase, index) =>
      <TestCase
        key={index} {...testCase}
        onClick={this.getTestCaseHistory}
        title={"Test case history"}
      />
    )

  askToClose = () => {
    this.setState({modalCases: []})
  }


  render() {
    const {cases} = this.props
    const {modalCases} = this.state
    return (
      <div>
        <Modal isOpen={!!modalCases.length}>
          <button onClick={this.askToClose}>close</button>
          {this.renderTestCaseList(modalCases)}
        </Modal>
        {this.renderTestCaseList(cases)}
      </div>
    )
  }
}

export default connect(({cases}) => ({...cases}))(FailedCasesList)