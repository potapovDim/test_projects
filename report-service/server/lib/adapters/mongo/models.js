const {TestCaseItemSchema} = require('./shemas')

function createTestCaseItemModel(mongoose) {
  return mongoose.model('testCaseItem', TestCaseItemSchema)
}

module.exports = {
  createTestCaseItemModel
}