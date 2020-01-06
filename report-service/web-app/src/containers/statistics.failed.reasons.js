import React, {Component} from 'react'
import pubsub from 'pubsub-js'
import {connect} from 'react-redux'
import {Pie} from 'react-chartjs-2'
import {dataFormatter} from '../utils'
import {colorsUtils} from '../utils'

let failedReasonsStructureScope = null

class StatisticsFailedReasons extends Component {
  state = {
    modalCases: []
  }

  getFailedReasonsPie = () => {
    const {config = {failedReasons: []}, cases = []} = this.props

    const failedReasonsStructure = dataFormatter.getFailReasons(config.failedReasons, cases)
    failedReasonsStructureScope = failedReasonsStructure
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

  handleClickPie = (data) => {
    if(data.length) {
      const [{_model: {label}}] = data
      pubsub.publish('modal_view', {cases: failedReasonsStructureScope[label]})
    }
  }

  askToClose = () => {
    this.setState({modalCases: []})
  }

  render() {
    const dataPie = this.getFailedReasonsPie()
    return (
      <div>
        <Pie
          width={50}
          height={20}
          data={dataPie}
          getElementAtEvent={this.handleClickPie}
        />
      </div>
    )
  }
}

export default connect(({cases}) => cases)(StatisticsFailedReasons)
