import {routerConstants} from './router.contants'
import {fetchy} from './fetchy'


function getTestCases(cb) {
  return fetchy.get(routerConstants.getCases).then(cb).catch(cb)
}

function getTestCaseCount(cb) {
  return fetchy.get(routerConstants.getTestCaseCount).then(cb).catch(cb)
}

function getBaseInfo(cb) {
  return fetchy.get(routerConstants.getTestCaseBaseInfo).then(cb).catch(cb)
}

function updateReportConfig(body, cb) {
  return fetchy.post(routerConstants.setReportConfig, body).then(cb).catch(cb)
}

function getReportConfig(cb) {
  return fetchy.get(routerConstants.getReportConfig).then(cb).catch(cb)
}

export {
  getTestCases,
  getTestCaseCount,
  getBaseInfo,
  updateReportConfig,
  getReportConfig
}
