import {routerConstants} from './router.contants'
import {fetchy} from './fetchy'


function getTestCases(cb) {
  return fetchy.get(routerConstants.getCases).then(cb)
}


function getTestCaseCount(cb) {
  return fetchy.get(routerConstants.getTestCaseCount).then(cb)
}


function getBaseInfo(cb) {
  return fetchy.get(routerConstants.getTestCaseBaseInfo).then(cb)
}

function updateReportConfig(body, cb) {
  return fetchy.post(routerConstants.setReportConfig, body).then(cb)
}

function getReportConfig(cb) {
  return fetchy.get(routerConstants.getReportConfig).then(cb)
}

export {
  getTestCases,
  getTestCaseCount,
  getBaseInfo,
  updateReportConfig,
  getReportConfig
}
