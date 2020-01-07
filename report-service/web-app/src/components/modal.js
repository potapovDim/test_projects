import './styles/modal.scss'

import React, {Component} from 'react'
import Modal from 'react-modal'
import {Button} from './button'
import {TestCase} from './test.case'
import {Pie} from 'react-chartjs-2'
import {dataFormatter} from '../utils'
import {colorsUtils} from '../utils'

class ModalWrapper extends Component {

  renderTestCaseList = () => {
    const {cases} = this.props

    return cases.map((testCase, index) => <TestCase key={index} {...testCase} title={"Test case history"} />)
  }

  getFailedReasonsPie = () => {
    const {config = {failedReasons: []}, cases = []} = this.props

    const failedReasonsStructure = dataFormatter.getFailReasons(config.failedReasons, cases)

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
    const {askToClose, pie, cases, isOpen, Content} = this.props
    return (
      <Modal isOpen={isOpen} ariaHideApp={false}>

        <div className="modal_header">
          {!!askToClose && <Button onClick={askToClose} title={'Close'} />}
        </div>

        <div className="modal_main">

          <div className="modal_content">
            {!!Content && <Content />}
            {!!cases && this.renderTestCaseList()}
          </div>


          <div className="modal_info">
            {!!pie && <Pie {...pie} data={this.getFailedReasonsPie()} />}
          </div>
        </div>
      </Modal>
    )
  }
}



export {ModalWrapper}
