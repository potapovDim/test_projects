import {
  UPDATE_DATE_RANGE,
  UPDATE_CONFIG,
  UPDATA_CASES_LIST,
  UPDATE_RUN_STATISTICS
} from './action.contants'

function caseStore(state = {}, action) {

  switch(action.type) {

    case UPDATE_DATE_RANGE: {
      const {startDate, endDate} = action.dataRange
      const cases = state.cases.filter(function({date}) {
        return startDate <= date && date <= endDate
      })
      return {...state, cases, count: cases.length, startDate, endDate}
    }

    case UPDATA_CASES_LIST: {
      const {startDate, endDate} = state
      const dateConfig = {startDate, endDate}
      if(!startDate && !endDate && action.cases.length) {
        dateConfig.startDate = action.cases[0].date
        dateConfig.endDate = action.cases[action.cases.length - 1].date
      }
      return {...state, cases: action.cases, ...dateConfig}
    }

    case UPDATE_RUN_STATISTICS: {
      return {...state, runStatistics: action.runStatistics}
    }

    case UPDATE_CONFIG: {
      return {...state, config: action.config}
    }

    default: {
      return state
    }
  }
}

export {
  caseStore
}
