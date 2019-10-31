import {
  UPDATE_DATE_RANGE,
  UPDATE_CONFIG,
  UPDATA_CASES_LIST
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

export {
  updateCasesList,
  updateConfig,
  updateDateRenge
}
