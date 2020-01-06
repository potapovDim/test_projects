import './styles/statistics.flaky.cases.css'

import React, {Component} from 'react'
import pubsub from 'pubsub-js'
import {connect} from 'react-redux'
import {HorizontalBar} from 'react-chartjs-2'
import {dataFormatter} from '../utils'
import {colorsUtils} from '../utils'


class StatisticsFlakyCases extends Component {

  getFailedReasonsPie = () => {
    const {config = {failedReasons: []}, cases = []} = this.props

    const failedReasonsStructure = dataFormatter.getFailReasons(config.failedReasons, cases)
    const labels = Object.keys(failedReasonsStructure)

    return {
      labels,
      datasets: [{
        data: labels.map((item) => failedReasonsStructure[item].length),
        backgroundColor: labels.map((_, index) => colorsUtils.colors[index])
      }]
    }
  }

  getFailedCases = () => {
    const {cases = [], testFlakyCount = 4} = this.props
    const casesData = dataFormatter.mostFlakyCases(cases)
    Object.keys(casesData).forEach((caseId) => {
      if(casesData[caseId] < +testFlakyCount) {
        delete casesData[caseId]
      }
    })

    const labels = Object.keys(casesData)

    return {
      labels,
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      },
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

  handleClickBar = (data) => {
    const {cases} = this.props
    if(data.length) {
      const [{_model: {label}}] = data
      pubsub.publish('modal_view', {cases: cases.filter(({id}) => id === label)})
    }
  }

  render() {
    const dataBar = this.getFailedCases()
    return (
      <div className="statistics-flaky-cases">
        <HorizontalBar
          height={dataBar.labels.length * 4}
          data={dataBar}
          getElementAtEvent={this.handleClickBar}
        />
      </div>
    )
  }
}

export default connect(({cases}) => cases)(StatisticsFlakyCases)
