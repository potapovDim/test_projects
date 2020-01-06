import './styles/run.statistics.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BuildItem} from '../components'
import {commonsUtils, dataFormatter} from '../utils'

class RunStatistics extends Component {

  getBuildResult = (runStat) => {
    const {config: {isSuccess = 0} = {}} = this.props
    return isSuccess === runStat
  }

  renderEmptyStatistics = () => {
    return (
      <div>
        <h4>Statistics can not be provided for required perion, tests cases count is 0</h4>
      </div>
    )
  }

  renderStatisticsByBuild = (testCases, runStatistics) => {

    testCases = testCases.filter(commonsUtils.filterFromUndefinedOrNull)
    runStatistics = runStatistics.filter(commonsUtils.filterFromUndefinedOrNull)

    // TODO implement new dataFormatter
    const {
      buildsCount,
      allBuildsFails,
      averageAmount,
      totalExecutedCases,
      ...buildsStatistics
    } = dataFormatter.getRangeFailedByBuildNew(testCases, runStatistics)

    const isStatisticsAvaliable = !!allBuildsFails && !!totalExecutedCases
    return (
      <div className="runs_statistics">
        <div className="count">Runs count: {buildsCount}</div>
        <div>
          {
            isStatisticsAvaliable &&
            <div>
              <div className="total">Total count of fails: {allBuildsFails}</div>
              <div className="total_executed_cases">Total executed cases: {totalExecutedCases} </div>
              <div className="fail_persentage">Average fail persentage is {(allBuildsFails / (totalExecutedCases / 100)).toFixed(2)} %</div>
              <div className="average_amount">Average amount of failed cases: {averageAmount}</div>
            </div>
          }
        </div>
        {
          Object.keys(buildsStatistics).map((runNumber, index) =>
            <BuildItem {...buildsStatistics[runNumber]} key={index} isSuccess={this.getBuildResult} />
          )
        }
      </div>
    )
  }

  render() {
    const {cases = [], runStatistics = []} = this.props
    return (
      <div>
        {!!cases.length ? this.renderStatisticsByBuild(cases, runStatistics) : this.renderEmptyStatistics()}
      </div>
    )
  }
}


export default connect(({cases}) => cases)(RunStatistics)
