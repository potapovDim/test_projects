const {model} = require('mongoose')
const {TestCaseItemSchema} = require('./shemas')

const testCase = model('testCaseItem', TestCaseItemSchema)

module.exports = {
  testCase
}