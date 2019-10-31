import {routerConstants} from './router.contants'
import {fetchy} from './fetchy'

function getTestCases(cb = (arg) => arg) {
  return fetchy.get(routerConstants.getCases).then(cb).catch(cb)
}

function getTestCaseCount(cb = (arg) => arg) {
  return fetchy.get(routerConstants.getTestCaseCount).then(cb).catch(cb)
}

function getBaseInfo(cb = (arg) => arg) {
  return fetchy.get(routerConstants.getTestCaseBaseInfo).then(cb).catch(cb)
}

function updateReportConfig(body, cb = (arg) => arg) {
  return fetchy.post(routerConstants.setReportConfig, body).then(cb).catch(cb)
}

function getReportConfig(cb = (arg) => arg) {
  return fetchy
    .get(routerConstants.getReportConfig)
    .then(cb)
    .catch(cb)
}

export {
  getTestCases,
  getTestCaseCount,
  getBaseInfo,
  updateReportConfig,
  getReportConfig
}
