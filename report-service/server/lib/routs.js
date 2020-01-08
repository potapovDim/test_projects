// new instance of the Router
const Router = require('koa-router')
const router = new Router()

const {
  getTestCases,
  addTestCase,

  getStaticHtml,
  getStaticScripts,

  setReporterConfig,
  getReporterConfig,

  addRunsStatistics,
  getRunsStatistics,

  dropCurrentStatistics,
  storeCurrentStatistics,

  getTechnicalInfo
} = require('./actions')

router.post('/add-run-statistics', addRunsStatistics)
router.get('/get-run-statistics', getRunsStatistics)

router.get('/bundle*', getStaticScripts)
router.get('/', getStaticHtml)

router.post('/set-report-config', setReporterConfig)
router.get('/get-report-config', getReporterConfig)

router.get('/get-test-cases', getTestCases)
router.post('/add-new-case', addTestCase)

router.get('/drop-current-statistics', dropCurrentStatistics)
router.get('/store-current-statistics', storeCurrentStatistics)

router.get('/report-service-get-technical-info', getTechnicalInfo)


module.exports = {
  router
}
