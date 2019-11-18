import {
  UPDATE_DATE_RANGE,
  UPDATE_CONFIG,
  UPDATA_CASES_LIST,
  UPDATE_RUN_STATISTICS
} from './action.contants'

function updateDateRenge(dataRange) {
  return {type: UPDATE_DATE_RANGE, dataRange}
}

function updateConfig(config) {
  return {type: UPDATE_CONFIG, config}
}

function updateCasesList(cases) {
  return {type: UPDATA_CASES_LIST, cases}
}

function updateRunStatistics(runStatistics) {
  return {type: UPDATE_RUN_STATISTICS, runStatistics}
}

export {
  updateCasesList,
  updateConfig,
  updateDateRenge,
  updateRunStatistics
}
