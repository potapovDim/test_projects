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

  addBuildStatistics,
  getBuildStatistics
} = require('./actions')


router.post('/build_statistics', addBuildStatistics)
router.get('/build_statistics', getBuildStatistics)

router.get('/bundle.js', getStaticScripts)
router.get('/view', getStaticHtml)

router.post('/set-report-config', setReporterConfig)
router.get('/get-report-config', getReporterConfig)

router.get('/get-test-cases', getTestCases)

router.post('/add-new-case', addTestCase)

module.exports = {
  router
}
