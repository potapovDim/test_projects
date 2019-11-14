import {
  UPDATE_DATE_RANGE,
  UPDATE_CONFIG,
  UPDATA_CASES_LIST,
  UPDATE_BUILD_STATISTICS
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

function updateBuildStatistics(buildStatistics) {
  return {type: UPDATE_BUILD_STATISTICS, buildStatistics}
}

export {
  updateCasesList,
  updateConfig,
  updateDateRenge,
  updateBuildStatistics
}
