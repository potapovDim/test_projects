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
const TestCaseItemSchema = new Schema({
  id: String,
  data: Schema.Types.Mixed,
  build: String,
  stack: Schema.Types.Mixed
})

module.exports = {
  TestCaseItemSchema
}
