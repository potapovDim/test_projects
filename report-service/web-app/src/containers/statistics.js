import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Pie, Bar} from 'react-chartjs-2'
import Modal from 'react-modal'
import {TestCase} from '../components/test.case'

import {getFailReasons, mostFlakyCases} from '../utils/data.formaters'

// should be refactored
let upperScopeItem = null

function getRandomColor() {
  const colors = [
    '#CD5C5C', '#F08080', '#FA8072', '#E9967A', '#FFA07A', '#808000', '#008000',
    '#C0C0C0', '#808080', '#000000', '#FF0000', '#800000', '#808000', '#00FF00'
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}


class Statistics extends Component {
  state = {
    modalCases: []
  }

  getFailedReasonsPie = () => {
    const {config, cases} = this.props
    console.log(config, cases)
    const failedReasonsStructure = getFailReasons(config.failedReasons, cases)
    const labels = Object.keys(failedReasonsStructure)
    // should be refactored
    upperScopeItem = failedReasonsStructure

    return {
      labels,
      datasets: [
        {
          data: labels.map((item) => failedReasonsStructure[item].length),
          backgroundColor: labels.map(getRandomColor)
        }
      ]
    }
  }

  getFailedCases = () => {
    const {cases} = this.props
    const casesData = mostFlakyCases(cases)
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
          <Pie data={dataPie} getElementAtEvent={this.handleClick} />
          <Bar data={dataBar} />
        </div>
      </div>
    )
  }
}

export default connect(({cases}) => cases)(Statistics)
