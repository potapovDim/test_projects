import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Pie, HorizontalBar, Bar} from 'react-chartjs-2'
import Modal from 'react-modal'
import {TestCase} from '../components/test.case'

import {getFailReasons, mostFlakyCases} from '../utils/data.formaters'

// should be refactored
let upperScopeItem = null

const colors = [
  '#E0FFFF',
  '#00FFFF',
  '#00FFFF',
  '#7FFFD4',
  '#66CDAA',
  '#AFEEEE',
  '#40E0D0',
  '#48D1CC',
  '#00CED1',
  '#20B2AA',
  '#5F9EA0',
  '#008B8B',
  '#00808'
]

function getRandomColor() {


  return colors[Math.floor(Math.random() * colors.length)]
}


class Statistics extends Component {
  state = {
    modalCases: []
  }

  getFailedReasonsPie = () => {
    const {config = {failedReasons: []}, cases = []} = this.props

    const failedReasonsStructure = getFailReasons(config.failedReasons, cases)
    const labels = Object.keys(failedReasonsStructure)
    // should be refactored
    upperScopeItem = failedReasonsStructure

    return {
      labels,
      datasets: [
        {
          data: labels.map((item) => failedReasonsStructure[item].length),
          backgroundColor: labels.map((item /**useless */, index) => colors[index])
        }
      ]
    }
  }

  getFailedCases = () => {
    const {cases = []} = this.props
    const casesData = mostFlakyCases(cases)
    Object.keys(casesData).forEach((caseId) => {
      if(casesData[caseId] < 4) {
        delete casesData[caseId]
      }
    })
    const labels = Object.keys(casesData)

    return {
      labels,
      datasets: [
        {
          label: 'Flaky cases',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: labels.map((item) => casesData[item])
        }
      ]
    }
  }

  handleClick = (data) => {
    if(data.length) {
      const [{_model: {label}}] = data
      this.setState({modalCases: upperScopeItem[label]})
    }
  }

  askToClose = () => {
    this.setState({modalCases: []})
  }

  render() {
    const {modalCases} = this.state

    const dataPie = this.getFailedReasonsPie()
    const dataBar = this.getFailedCases()

    return (
      <div>
        <Modal isOpen={!!modalCases.length} ariaHideApp={false}>

          <button onClick={this.askToClose}>close</button>

          {modalCases.map((testCase, index) => <TestCase key={index} {...testCase} />)}

        </Modal>
        Statistics
        <div>
          Failed cases by reason
          <Pie
            width={50}
            height={20}
            data={dataPie}
            getElementAtEvent={this.handleClick}
          />
          <Bar
            data={dataBar}
          />
        </div>
      </div>
    )
  }
}

export default connect(({cases}) => cases)(Statistics)
