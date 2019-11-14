const {getTestCases, addTestCase} = require('./test.cases')
const {setReporterConfig, getReporterConfig} = require('./configs')
const {getStaticHtml, getStaticScripts} = require('./static')
const {addBuildStatistics, getBuildStatistics} = require('./build.statistics')

module.exports = {
  addTestCase,
  getTestCases,

  setReporterConfig,
  getReporterConfig,

  getStaticScripts,
  getStaticHtml,

  addBuildStatistics,
  getBuildStatistics
}
