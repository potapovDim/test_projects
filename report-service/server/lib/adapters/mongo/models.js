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
const testCaseModel = (connectionDb) => {
  const testCaseSchema = Schema({
    id: Schema.Types.String,
    date: Schema.Types.Number,
    run: Schema.Types.String,
    env: Schema.Types.String,
    stackTrace: Schema.Types.Mixed
  })
  return connectionDb.model('testcase', testCaseSchema)
}


const runModel = (connectionDb) => {
  const runSchema = Schema({
    run: Schema.Types.Mixed,
    count: Schema.Types.Number,
    runStatus: Schema.Types.Number
  })

  return connectionDb.model('run', runSchema)
}

const configModel = (connectionDb) => {
  const reportServiceConfigSchema = Schema({
    serverUrl: Schema.Types.String,
    failedReasons: Schema.Types.Array
  })
  return connectionDb.model('reportconfig', reportServiceConfigSchema)
}

module.exports = {
  testCaseModel,
  configModel,
  runModel
}
