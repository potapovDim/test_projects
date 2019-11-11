import './styles/test.cases.list.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TestCase} from '../components/test.case'
import {Button} from '../components/button'
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

    const modalCases = cases.filter((testCase) => testCase[historyBy] === currentTestCase[historyBy])

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
      <select onChange={({target: {value}}) => this.renderGroutedCases(value)}>
        <option>All</option>
        {Object.keys(testCase).map((item, index) => <option key={index}>{item}</option>)}
      </select>
    )
  }

  renderTestCaseListGrouped = (groupedTestCases) => {
    return Object.keys(groupedTestCases).map((groupKey) =>
      <div>
        <div className="group identifier">{groupKey}</div>
        {this.renderTestCaseList(groupedTestCases[groupKey])}
      </div>
    )
  }

  renderGroutedCases = (group) => {
    const {cases = []} = this.props
    if(group === 'All') {
      this.setState({
        groupedCases: null
      })
    } else {
      this.setState({
        groupedCases: getGroupedByCases(group, cases)
      })
    }
  }

  askToClose = () => {
    this.setState({modalCases: []})
  }

  render() {
    const {cases = []} = this.props
    const {modalCases, groupedCases} = this.state
    return (
      <div>
        {
          cases.length && (
            <div>
              <div>Grop test cases by</div>

              {this.renderGropTestCaseByList()}

              <Modal
                isOpen={!!modalCases.length}
                ariaHideApp={false}
              >
                <Button
                  clickAction={this.askToClose}
                  title={'Close'}
                />

                {this.renderTestCaseList(modalCases, false)}

              </Modal>

              {!groupedCases && this.renderTestCaseList(cases)}
              {groupedCases && this.renderTestCaseListGrouped(groupedCases)}
            </div>
          )
        }
      </div>
    )
  }
}

export default connect(({cases}) => ({...cases}))(FailedCasesList)