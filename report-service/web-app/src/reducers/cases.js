import {
  INIT_STORE,
  UPDATE_DATE_RANGE,
  UPDATE_CONFIG,
  UPDATA_CASES_LIST
} from './action.contants'

function initStore(state) {
  return {type: INIT_STORE, state}
}

function updateDateRenge(dataRange) {
  return {type: UPDATE_DATE_RANGE, dataRange}
}

function updateConfig(config) {
  return {type: UPDATE_CONFIG, config}
}

function updateCasesList(cases) {
  return {type: UPDATA_CASES_LIST, cases}
}

function caseStore(state = {}, action) {
  switch(action.type) {

    case INIT_STORE:
      return action.state

    case UPDATE_DATE_RANGE: {
      const {startDate, endDate} = action.dataRange
      const cases = state.cases.filter(function({date}) {
        return startDate <= date && date <= endDate
      })
      return {cases, count: cases.length, startDate, endDate}
    }

    case UPDATA_CASES_LIST: {
      return {...state, cases: action.cases}
    }

    case UPDATE_CONFIG: {
      return {...state, config: action.config}
    }

    default:
      return state
  }
}

export {
  caseStore,

  initStore,
  updateDateRenge,
  updateConfig,
  updateCasesList
}
