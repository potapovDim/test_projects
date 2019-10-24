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

export {
  getTestCases,
  getTestCaseCount,
  getBaseInfo
}
