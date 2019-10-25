// new instance of the Router
const Router = require('koa-router')
const router = new Router()

const {
  getTestCases,
  createTestCase,
  getTestCasesCount,
  getBaseInfo,

  getStaticHtml,
  getStaticScripts,

  getFailedReasons,
  setFailedReasons
} = require('./actions')

router.get('/bundle.js', getStaticScripts)
router.get('/view', getStaticHtml)

router.post('/set-fail-reasons', setFailedReasons)
router.get('/get-fail-reasons', getFailedReasons)

router.get('/get-test-cases-base-info', getBaseInfo)
router.get('/get-test-cases', getTestCases)
router.get('/get-test-cases-count', getTestCasesCount)

router.post('/add-new-case', createTestCase)

module.exports = {
  router
}
