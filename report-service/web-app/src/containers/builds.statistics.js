import './styles/builds.statistics.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BuildItem} from '../components/build.item'
import {getRangeFailesByBuild} from '../utils/data.formaters'

class BuildStatistics extends Component {


  renderEmptyStatistics = () => {
    return (<div>
      <h4>Statistics can not be provided for required perion, tests cases count is 0</h4>
    </div>)
  }

  renderStatisticsByBuild = (cases, buildStatistics) => {


    const {
      buildsCount,
      allBuildsFails,
      averageAmount,
      totalExecutedCases,
      ...buildsStatistics
    } = getRangeFailesByBuild(cases, buildStatistics)

    return (
      <div className="build_statistics">
        <div className="count">Build count: {buildsCount}</div>
        <div className="total">Total count of fails: {allBuildsFails}</div>
        <div className="total_executed_cases">Total executed cases: {totalExecutedCases} </div>
        <div className="fail_persentage">Average fail persentage is {Math.floor(allBuildsFails / (totalExecutedCases / 100))} %</div>
        <div className="average_amount">Average amount of failed cases: {averageAmount}</div>
        {
          Object.keys(buildsStatistics)
            .map((buildNumber, index) =>
              <BuildItem
                key={index}
                buildNumber={buildNumber}
                buildExecutedCases={buildsStatistics[buildNumber].buildExecutedCases}
                cases={buildsStatistics[buildNumber].cases}
              />
            )
        }
      </div>
    )
  }

  render() {
    const {cases = [], buildStatistics = []} = this.props
    return (
      <div>
        {!!cases.length ? this.renderStatisticsByBuild(cases, buildStatistics) : this.renderEmptyStatistics()}
      </div>
    )
  }
}


export default connect(({cases}) => cases)(BuildStatistics)
