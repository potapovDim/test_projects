const {createTestCase} = require('./create.test.case')
const {getTestCases} = require('./get.test.cases')
const {setReporterConfig, getReporterConfig} = require('./configs')
const {getStaticHtml, getStaticScripts} = require('./get.static')

module.exports = {
  createTestCase,
  getTestCases,

  setReporterConfig,
  getReporterConfig,

  getStaticScripts,
  getStaticHtml,
}
