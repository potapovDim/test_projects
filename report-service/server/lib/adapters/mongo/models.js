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
const createTestCaseItemModel = mongoose => {
  const relativeShema = mongoose.Schema({
    id: String,
    data: Schema.Types.Mixed,
    build: String,
    stack: Schema.Types.Mixed
  })
  return mongoose.model('relative', relativeShema)
}

module.exports = {
  createTestCaseItemModel
}
