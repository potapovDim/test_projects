import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Pie} from 'react-chartjs-2'
import {getFailReasons} from '../utils/data.formaters'
import randomColor from 'random-color'


function getRandomColor() {
  const colors = [
    '#CD5C5C',
    '#F08080',
    '#FA8072',
    '#E9967A',
    '#FFA07A',
    '#FFFFFF',
    '#C0C0C0',
    '#808080',
    '#000000',
    '#FF0000',
    '#800000',
    '#FFFF00',
    '#808000',
    '#00FF00',
    '#008000',
    '#00FFFF',
    '#008080',
    '#0000FF',
    '#000080',
    '#FF00FF',
    '#800080'
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}



class Statistics extends Component {
  getFailedReasonsPie = () => {
    const {config, cases} = this.props
    const failedReasons = getFailReasons(config.failedReasons, cases)
    const labels = Object.keys(failedReasons)

    const datasets = [{
      data: labels.map((item) => failedReasons[item]),
      backgroundColor: labels.map(getRandomColor)
    }]

    const data = {
      labels, datasets
    }

    return data

  }

  render() {
    const {config, cases} = this.props

    console.log(config, cases)
    getFailReasons(config.failedReasons, cases)

    return (
      <div>
        Statistics
        <Pie data={this.getFailedReasonsPie()} />
      </div>
    )
  }
}

export default connect(({cases}) => cases)(Statistics)
