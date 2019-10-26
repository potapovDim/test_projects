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
    const {cases} = this.props
    const {modalCases, groupedCases} = this.state

    return (
      <div>
        {
          cases.length && (
            <div>
              <div>Grop test cases by</div>

              {this.renderGropTestCaseByList()}

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