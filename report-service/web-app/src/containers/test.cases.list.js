import './styles/test.cases.list.css'

import React, {Component} from 'react'
import pubsub from 'pubsub-js'
import {connect} from 'react-redux'
import {TestCase} from '../components/test.case'
import {commonsUtils} from '../utils'
import {dataFormatter} from '../utils'

class FailedCasesList extends Component {
  state = {
    modalCases: [],
    groupedCases: null
  }

  getTestCaseHistory = (currentTestCase) => {
    const {cases = [], config: {historyBy = 'id'} = {}} = this.props
    console.log('!')

    pubsub.publish('modal_view', {
      cases: cases.filter(commonsUtils.filterFromUndefinedOrNull)
        .filter((testCase) => testCase[historyBy] === currentTestCase[historyBy])
    })

  }

  renderTestCaseList = (cases) => {
    return cases
      .filter(commonsUtils.filterFromUndefinedOrNull)
      .sort((a, b) => b.date > a.date)
      .filter((testCase, _, arr) => {
        const sameCases = arr.filter((_testCase) => _testCase.id === testCase.id && testCase.date !== _testCase.date)
        if(sameCases.length === 0) {return true}
        return sameCases.every((_testCase) => testCase.date > _testCase.date)
      })
      .map((testCase, index) =>
        <TestCase
          {...testCase}
          key={index}
          title={"Test case history"}
          onClick={() => this.getTestCaseHistory(testCase)}
        />
      )
  }

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
        groupedCases: dataFormatter.getGroupedByCases(
          group, cases.filter(commonsUtils.filterFromUndefinedOrNull)
        )
      })
    }
  }

  askToClose = () => {
    this.setState({modalCases: []})
  }

  render() {
    const {cases = [], config} = this.props
    const {groupedCases} = this.state
    return (
      <div>
        {
          cases.length && (
            <div>
              <div>Grop test cases by</div>
              {this.renderGropTestCaseByList()}
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
