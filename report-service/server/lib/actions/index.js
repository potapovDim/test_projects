const {createTestCase} = require('./create.test.case')
const {getTestCases} = require('./get.test.cases')
const {getTestCasesCount} = require('./get.test.cases.count')
const {getBaseInfo} = require('./get.base.info')

const {getStaticHtml, getStaticScripts} = require('./get.static')

module.exports = {
  createTestCase,
  getTestCases,
  getTestCasesCount,
  getBaseInfo,

  getStaticScripts,
  getStaticHtml,
}
