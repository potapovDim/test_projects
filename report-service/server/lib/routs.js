// new instance of the Router
const Router = require('koa-router')
const router = new Router()

const {
  getTestCases,
  createTestCase,
  getTestCasesCount,

  getStaticHtml,
  getStaticScripts,

  setReporterConfig,
  getReporterConfig,
} = require('./actions')

router.get('/bundle.js', getStaticScripts)
router.get('/view', getStaticHtml)

router.post('/set-report-config', setReporterConfig)
router.get('/get-report-config', getReporterConfig)

router.get('/get-test-cases', getTestCases)
router.get('/get-test-cases-count', getTestCasesCount)

router.post('/add-new-case', createTestCase)

module.exports = {
  router
}
