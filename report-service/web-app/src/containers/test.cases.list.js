import React, {Component} from 'react'
import {TestCase} from '../components/test.case'
import {fetchy} from '../utils/request'

class FailedCasesList extends Component {
  state = {
    cases: []
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.cases.length !== nextState.cases.length
  }

  componentWillMount() {
    fetchy('GET', '/get-test-cases').then((cases) => this.setState({cases}))
  }

  renderTestCaseList = (testCaseList) => testCaseList
    .map((testCase, index) => <TestCase key={index} {...testCase} />)

  render() {
    const {cases} = this.state
    return (
      <div>
        {this.renderTestCaseList(cases)}
      </div>
    )
  }
}

export {
  FailedCasesList
}
