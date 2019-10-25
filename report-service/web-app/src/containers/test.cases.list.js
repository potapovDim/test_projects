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
    const modalCases = cases.filter((testCase) => testCase.id === id)
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

  renderGropTestCaseBy = () => {
    const {cases: [testCase]} = this.props
    return (
      <select>
        <option>All</option>
        {Object.keys(testCase).map((item) => <option>{item}</option>)}
      </select>
    )
  }

  askToClose = () => {
    this.setState({modalCases: []})
  }

  render() {
    const {cases} = this.props
    const {modalCases} = this.state
    return (
      <div>
        {
          cases.length && (
            <div>
              <div>Grop test cases by</div>
              {this.renderGropTestCaseBy()}
              <Modal isOpen={!!modalCases.length}>
                <button onClick={this.askToClose}>close</button>
                {this.renderTestCaseList(modalCases)}
              </Modal>
              {this.renderTestCaseList(cases)}
            </div>
          )
        }
      </div>
    )
  }
}

export default connect(({cases}) => ({...cases}))(FailedCasesList)