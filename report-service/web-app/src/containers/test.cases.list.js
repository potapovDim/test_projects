import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TestCase} from '../components/test.case'
import Modal from 'react-modal'
import {getGroupedByCases} from '../utils/data.formaters'


class FailedCasesList extends Component {
  state = {
    modalCases: [],
    /**
     * @example
     * {
     *  build: [
     *    {
     *      id: 'testcaseid',
     *      stack: 'a',
     *      date: 'bb'
     *    }
     *  ]
     * }
     */
    groupedCases: null
  }

  getTestCaseHistory = (currentTestCase) => {
    const {cases, config: {historyBy = 'id'} = {}} = this.props
    console.log(currentTestCase)
    const modalCases = cases.filter((testCase) => testCase[historyBy] === currentTestCase[historyBy])
    console.log('!!!!!!!!!!!!!', modalCases.length)
    this.setState({modalCases})
  }

  renderTestCaseList = (testCaseList, fromModal = true) => testCaseList
    .map((testCase, index) =>
      <TestCase
        key={index} {...testCase}
        onClick={fromModal && this.getTestCaseHistory}
        title={"Test case history"}
      />
    )

  renderGropTestCaseByList = () => {
    const {cases: [testCase]} = this.props
    return (
      <select>
        <option>All</option>
        {Object.keys(testCase).map((item) => <option>{item}</option>)}
      </select>
    )
  }

  renderGroutedCases = (group) => {
    if(group === 'All') {
      this.setState({
        groupedCases: null
      })
    } else {
      this.setState({
        groupedCases: getGroupedByCases(group)
      })
    }
  }

  askToClose = () => {
    this.setState({modalCases: []})
  }

  render() {
    const {cases = []} = this.props
    const {modalCases} = this.state

    return (
      <div>
        {
          cases.length && (
            <div>
              <div>Grop test cases by</div>

              {this.renderGropTestCaseByList()}

              <Modal isOpen={!!modalCases.length}>
                <button onClick={this.askToClose}>close</button>
                {this.renderTestCaseList(modalCases, false)}
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