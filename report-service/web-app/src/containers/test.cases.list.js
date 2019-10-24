import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TestCase} from '../components/test.case'

class FailedCasesList extends Component {

  renderTestCaseList = (testCaseList) => testCaseList
    .map((testCase, index) => <TestCase key={index} {...testCase} />)


  render() {
    console.log(this.props)
    const {cases} = this.props
    return (
      <div>
        {this.renderTestCaseList(cases)}
      </div>
    )
  }
}

export default connect(({cases}) => ({...cases}))(FailedCasesList)