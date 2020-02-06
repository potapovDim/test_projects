import {routerConstants} from './router.contants'
import {fetchy} from './fetchy'

function getTestCases(cb = (arg) => arg) {
  return fetchy.get(routerConstants.getCases).then(cb).catch(cb)
}

function getTestCaseCount(cb = (arg) => arg) {
  return fetchy.get(routerConstants.getTestCaseCount).then(cb).catch(cb)
}

function updateReportConfig(body, cb = (arg) => arg) {
  return fetchy.post(routerConstants.setReportConfig, body).then(cb).catch(cb)
}

function getReportConfig(cb = (arg) => arg) {
  return fetchy.get(routerConstants.getReportConfig).then(cb).catch(cb)
}

function getRunsStatistics(cb = (arg) => arg) {
  return fetchy.get(routerConstants.getRunsStatistics).then(cb).catch(cb)
}

function getTechnicalInfo(cb = (arg) => arg) {
  return fetchy.get(routerConstants.getTechnicalInfo).then(cb).catch(cb)
}

function getProjects(cb = (arg) => arg) {
  return fetchy.get(routerConstants.getProjects).then(cb).catch(cb)
}

export {
  getTestCases,
  getTestCaseCount,
  getReportConfig,
  getRunsStatistics,
  updateReportConfig,
  getTechnicalInfo,
  getProjects
}
