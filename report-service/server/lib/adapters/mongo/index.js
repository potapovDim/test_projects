const mongoose = require('mongoose')
const {createTestCaseItemModel} = require('./models')
const {createGetStorageData, createSetToStorage} = require('./mongo')
// temp for debug
const connectedMongoose = mongoose.connect('mongodb://127.0.0.1:27050')
const testCaseModel = createTestCaseItemModel(connectedMongoose)

module.exports = {
  getStorageData: createGetStorageData(testCaseModel),
  setToStorage: createSetToStorage(testCaseModel)
}
