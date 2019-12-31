const {Schema} = require('mongoose')
/**
 *
 * @param {object<{id: string, date: string, build: string, stack: string|object}>} item
 * @returns undefined
 * @example item
 * {
 *  id: 'Test case 1',
 *  date: 1569677669693,
 *  build: 'Some build description',
 *  stack: 'Some stack trace'
 * }
 */
const addTestCaseItemModel = (connectionDb) => {
  const testCaseSchema = Schema({
    id: Schema.Types.String,
    date: Schema.Types.Number,
    build: Schema.Types.String,
    stack: Schema.Types.Mixed
  })
  return connectionDb.model('testcase', testCaseSchema)
}

const updateConfigModel = (connectionDb) => {
  const reportServiceConfigSchema = Schema({
    serverUrl: Schema.Types.String,
    failedReasons: Schema.Types.Array
  })
  return connectionDb.model('reportconfig', reportServiceConfigSchema)
}

module.exports = {
  addTestCaseItemModel,
  updateConfigModel
}
