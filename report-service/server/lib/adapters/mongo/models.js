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
const createTestCaseItemModel = ({Schema, model}) => {
  const relativeShema = Schema({
    id: String,
    data: Schema.Types.Mixed,
    build: String,
    stack: Schema.Types.Mixed
  })
  return model('testcase', relativeShema)
}

module.exports = {
  createTestCaseItemModel
}
