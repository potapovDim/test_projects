import React, {Component} from 'react'
import Modal from 'react-modal'
import {Button} from './button'
import {TestCase} from './test.case'
import {Pie} from 'react-chartjs-2'
import {dataFormatter, getFailReasons} from '../utils'
import {colorsUtils} from '../utils'

class TestCasesModal extends Component {

  renderTestCaseList = () => {
    const {cases} = this.props
    return cases
      .map((testCase, index) =>
        <TestCase
          key={index} {...testCase}
          title={"Test case history"}
        />
      )
  }

  getFailedReasonsPie = () => {
    const {config = {failedReasons: []}, cases = []} = this.props

    const failedReasonsStructure = dataFormatter.getFailReasons(config.failedReasons, cases)
    // failedReasonsStructureScope = failedReasonsStructure
    const labels = Object.keys(failedReasonsStructure)

    return {
      labels,
      datasets: [
        {
          data: labels.map((item) => failedReasonsStructure[item].length),
          backgroundColor: labels.map((_, index) => colorsUtils.colors[index])
        }
      ]
    }
  }

  render() {
    const {askToClose, cases: {length}, pie = true} = this.props
    const dataPie = this.getFailedReasonsPie()
    return (
      <Modal isOpen={!!length} ariaHideApp={false}>
        <Button onClick={askToClose} title={'Close'} />
        {this.renderTestCaseList()}
        {pie && <Pie
          width={50}
          height={20}
          data={dataPie}
        />
        }
      </Modal>
    )
  }
}

export {
  TestCasesModal
}
