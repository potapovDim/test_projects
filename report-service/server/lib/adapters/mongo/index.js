const mongoose = require('mongoose')
const {addTestCaseItemModel, updateConfigModel} = require('./models')
const {getConfig} = require('./conf')
const {
  createGetStorageData,
  createSetToStorage,
  createGetStoragCount,
  createGetConfig,
  createSetConfig
} = require('./mongo')

// temp for debug
const connectedMongoose = mongoose.createConnection(
  `mongodb://127.0.0.1:27017`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const testCaseModel = addTestCaseItemModel(connectedMongoose)
const configModel = updateConfigModel(connectedMongoose)

module.exports = {
  getStorageData: createGetStorageData(testCaseModel),
  getStorageDataCount: createGetStoragCount(testCaseModel),
  setToStorage: createSetToStorage(testCaseModel),
  getConfig: createGetConfig(configModel),
  setConfig: createSetConfig(configModel)
}
