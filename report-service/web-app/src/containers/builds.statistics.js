import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BuildItem} from '../components/buildItem'
import {getRangeFailesByBuild} from '../utils/data.formaters'

class BuildStatistics extends Component {

  renderStatisticsByBuild = () => {
    const {cases} = this.props
    const {buildsCount, allBuildsFails, averageAmount, ...buildsStatistics} = getRangeFailesByBuild(cases)

    return (
      <div>
        <div>Build count: {buildsCount}</div>
        <div>Total count of fails: {allBuildsFails}</div>
        <div>Avarage amount of failed cases: {averageAmount}</div>
        {
          Object
            .keys(buildsStatistics)
            .map((buildNumber, index) => <BuildItem buildNumber={buildNumber} cases={buildsStatistics[buildNumber].cases} key={index} />)
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderStatisticsByBuild()}
      </div>
    )
  }
}


export default connect(({cases}) => cases)(BuildStatistics)
