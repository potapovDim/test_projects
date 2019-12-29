import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Pie, Bar} from 'react-chartjs-2'
import Modal from 'react-modal'
import {TestCase} from '../components/test.case'
import {Button} from '../components/button'
import {getFailReasons, mostFlakyCases} from '../utils/data.formaters'
import {colors} from '../utils/colors'

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}

let failedReasonsStructureScope = null

class StatisticsFailedReasons extends Component {
  state = {
    modalCases: []
  }

  getFailedReasonsPie = () => {
    const {config = {failedReasons: []}, cases = []} = this.props

    const failedReasonsStructure = getFailReasons(config.failedReasons, cases)
    failedReasonsStructureScope = failedReasonsStructure
    const labels = Object.keys(failedReasonsStructure)

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

  handleClickPie = (data) => {
    if(data.length) {
      const [{_model: {label}}] = data
      this.setState({modalCases: failedReasonsStructureScope[label]})
    }
  }

  askToClose = () => {
    this.setState({modalCases: []})
  }

  render() {
    const {modalCases} = this.state
    const dataPie = this.getFailedReasonsPie()

    return (
      <div>
        <Modal isOpen={!!modalCases.length} ariaHideApp={false}>
          <Button onClick={this.askToClose} title={'Close'} />
          {modalCases.map((testCase, index) => <TestCase key={index} {...testCase} />)}
        </Modal>
        <div>
          <span>Failed cases by reason</span>
          <Pie
            width={50}
            height={20}
            data={dataPie}
            getElementAtEvent={this.handleClickPie}
          />
        </div>
      </div>
    )
  }
}

export default connect(({cases}) => cases)(StatisticsFailedReasons)
