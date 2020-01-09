const {getTestCases, addTestCase, getProjects} = require('./test.cases')
const {setReporterConfig, getReporterConfig} = require('./configs')
const {getStaticHtml, getStaticScripts} = require('./static')
const {addRunsStatistics, getRunsStatistics} = require('./run.statistics')
const {dropCurrentStatistics, storeCurrentStatistics} = require('./common')
const {getTechnicalInfo} = require('./technical')

module.exports = {
  addTestCase,
  getTestCases,

  setReporterConfig,
  getReporterConfig,

  getStaticScripts,
  getStaticHtml,

  addRunsStatistics,
  getRunsStatistics,

  dropCurrentStatistics,
  storeCurrentStatistics,
  getTechnicalInfo,

  getProjects
}
