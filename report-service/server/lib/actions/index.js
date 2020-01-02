const {getTestCases, addTestCase} = require('./test.cases')
const {setReporterConfig, getReporterConfig} = require('./configs')
const {getStaticHtml, getStaticScripts} = require('./static')
const {addRunsStatistics, getRunsStatistics} = require('./run.statistics')
const {dropCurrentStatistics, storeCurrentStatistics} = require('./common')

async function getTechnicalInfo(ctx) {
  const {ADDAPTER = 'memory'} = process.env
  // TODO find way for useless reasignment
  const currentConfig = (await getReporterConfig(ctx)).body

  ctx.body = {
    ADDAPTER,
    currentConfig,
  }

  return ctx
}

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
  getTechnicalInfo
}
