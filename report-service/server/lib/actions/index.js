const {createTestCase} = require('./create.test.case')
const {getTestCases} = require('./get.test.cases')
const {getTestCasesCount} = require('./get.test.cases.count')
const {setReporterConfig, getReporterConfig} = require('./configs')
const {getStaticHtml, getStaticScripts} = require('./get.static')

module.exports = {
  createTestCase,
  getTestCases,
  getTestCasesCount,

  setReporterConfig,
  getReporterConfig,

  getStaticScripts,
  getStaticHtml,
}
